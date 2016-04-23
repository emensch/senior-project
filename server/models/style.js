import thinky       from '../utils/thinky';
import Promise      from 'bluebird';
import Chromosome   from '../genetic_utils/chromosome';
import * as logger  from 'winston';
import * as state   from '../utils/appState';

const type = thinky.type;
const r = thinky.r;

const Style = thinky.createModel('Style', {
    id: type.string(),
    generation: type.number(),
    styles: type.object(),
    fitness: type.number().default(1),
    parents: [type.string()],
    visited: type.number().default(0),
    createdOn: type.date().default(r.now()) 
});

Style.ensureIndex('generation');
Style.ensureIndex('visited');

Style.defineStatic('getNext', function(ids) {
    return r.table('Style')
        .min({index: 'visited'})('visited').do( function(minVisited) {
            return {
                currentGen: r.table('Style').max({index: 'generation'})('generation'),
                minVisited: minVisited
            };
        })
        .then(vals => {
            return this.getAll(r.args(r.table('Style')('id').coerceTo('array').difference(ids)))
                .filter({generation: vals.currentGen})
                .filter({visited: vals.minVisited})
                .sample(1)
                .run()
        })
        .then(style => {
            if(style.length) {
                return Promise.resolve(style);
            } else {
                logger.error('Failed random selection - fallback to normal');
                return this.orderBy(r.desc('generation')).orderBy('visited').limit(1).run()
            }
        })
        .then(style => {
            return style[0].merge({
                visited: r.row('visited').add(1)
            }).save()
        })
        .then(style => {
            return style.getOldValue();
        })
});

Style.defineStatic('processVote', function(id) {
    return this.get(id).update({
        fitness: r.row('fitness').add(1)
    })
});

Style.defineStatic('countVotesAndGenerate', function() {
    return state.getState('generating')
        .then(generating => {
            if(generating != 'true') {
                return r.table('Style')
                    .max({index: 'generation'})('generation').do( function(currentGen) {
                        return r.table('Style').filter({generation: currentGen}).sum('fitness');
                    })
                    .then(num => {
                        if(num > (parseInt(process.env.FITNESS_THRESHOLD) + parseInt(process.env.POP_SIZE))) {
                            return state.setState('generating', 'true')
                                .then(() => {
                                    return this.createNewGeneration();
                                })
                                .finally(() => {
                                    return state.setState('generating', 'false');
                                })
                        } else {
                            return Promise.resolve();
                        }
                    });
            } else {
                logger.info('Not counting fitness - generation in-progress')
                return Promise.resolve();
            }
        })
});

Style.defineStatic('createNewGeneration', function() {
    return r.table('Style')
        .max('generation')
        .then(res => {
            let currentGen = res.generation;
            logger.info('Creating generation ' + (currentGen + 1));
            return this.filter({generation: currentGen}).execute()
                .then(pop => {
                    let newPop = [];

                    while(newPop.length < process.env.POP_SIZE) {
                        const indices = rouletteSelection(pop, 2);
                        const cr1ID = pop[indices[0]].id;
                        const cr1 = new Chromosome(pop[indices[0]].styles);
                        const cr2ID = pop[indices[1]].id;
                        const cr2 = new Chromosome(pop[indices[1]].styles);

                        const newCr = Chromosome.uniformCrossover(cr1, cr2, process.env.CROSSOVER_PERCENTAGE);
                        newCr.mutate(process.env.MUTATION_RATE);

                        newPop.push({
                            generation: currentGen + 1,
                            styles: newCr.getObjectRepresentation(),
                            parents: [cr1ID, cr2ID]
                        });
                    }

                    this.save(newPop);
                });
        });
});

function rouletteSelection(pop, num) {

    const fitnesses = pop.map(obj => obj.fitness);
    const totalFitness = fitnesses.reduce((total, current) => {
        return total + current;
    });

    let indices = [];

    while(num--) {
        let randVal = Math.floor(Math.random() * totalFitness)
        for(let idx = 0; idx < fitnesses.length; idx++) {
            randVal -= fitnesses[idx];
            if(randVal <= 0) {
                indices.push(idx);
                break;
            }
        }
    }

    return indices;
}

export default Style;