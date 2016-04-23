import Gene from './gene';

export default class Chromosome {
    constructor(vals = {}) {
        this.genes = {
            gridgutters: new Gene(['1/4', '1/2', '1'], vals.gridgutters),
            elementwidth: new Gene([3, 4, 6], vals.elementwidth),
            navbgcolor: new Gene(['#607D8B', '#C1362C', '#FFFFFF', '#E0E0E0', '#424242', '#99E0FF', '#E37222'], vals.navbgcolor),
            navelementborders: new Gene(['1px', '0px'], vals.navelementborders),
            navfont: new Gene(['Open Sans', 'Raleway', 'Slabo 27px', 'Lora'], vals.navfont),
            navfontsize: new Gene(['14px', '18px', '22px'], vals.navfontsize),
            navfontweight: new Gene(['normal', 'bold'], vals.navfontweight),
            navshadow: new Gene(['true', 'false'], vals.navshadow),
            contentbgcolor: new Gene(['#607D8B', '#C1362C', '#FFFFFF', '#E0E0E0', '#424242', '#99E0FF', '#E37222'], vals.contentbgcolor),
            contentstyle: new Gene(['overlap', 'normal'], vals.contentstyle),
            contentfont: new Gene(['Open Sans', 'Raleway', 'Slabo 27px', 'Lora'], vals.contentfont),
            contentfontsize: new Gene(['14px', '18px', '22px'], vals.contentfontsize),
            contentfontweight: new Gene(['normal', 'bold'], vals.contentfontweight),
            contentshadow: new Gene(['true', 'false'], vals.contentshadow)
        };
    }

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