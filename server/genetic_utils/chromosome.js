import Gene from './gene';

export default class Chromosome {
    constructor(vals = {}) {
        this.genes = {
            contentbgcolor: new Gene(['transparent', '#A83939', '#3983A8', '#CCCCCC', '#8C8C8C'], vals.contentbgcolor),
            navfontsize: new Gene(['14px', '18px', '22px', '26px'], vals.navfontsize),
            contentfontsize: new Gene(['12px', '18px', '24px', '36px'], vals.contentfontsize),
            contentfontweight: new Gene(['normal', 'bold'], vals.contentfontweight),
            gridgutters: new Gene(['1/4', '1/2', '1'], vals.gridgutters),
            elementwidth: new Gene([2, 4, 6, 12], vals.elementwidth),
            font: new Gene(['Open Sans', 'Raleway', 'Slabo 27px', 'Lora'], vals.font)
        };
    }

    /*
     VARS:
     $contentbgcolor
     $contentfontsize
     $contentfontweight
     $gridgutters
     */

    getObjectRepresentation() {
        let obj = {};
        Object.keys(this.genes).forEach(name => {
            return obj[name] = this.genes[name].getValue();
        });
        return obj;
    }

    static uniformCrossover(cr1, cr2, p = 0.5) {
        let newProps = {};

        Object.keys(cr1.genes).forEach(name => {
            newProps[name] = (Math.random() < p ? cr1.genes[name] : cr2.genes[name]).getValue();
        });

        return new Chromosome(newProps);
    }

    mutate(p = 0.02) {

        let newChromosome = new Chromosome(this.getObjectRepresentation());


        Object.keys(newChromosome.genes).forEach(name => {
            newChromosome.genes[name].mutate(p);
        });

        return newChromosome;
    }
}