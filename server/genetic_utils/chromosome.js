import Gene from './gene';

export default class Chromosome {
    constructor() {
        this.genes = {
            contentbgcolor: new Gene(['transparent', '#A83939', '#3983A8', '#CCCCCC', '#8C8C8C']),
            navfontsize: new Gene(['14px', '18px', '22px', '26px']),
            contentfontsize: new Gene(['12px', '18px', '24px', '36px']),
            contentfontweight: new Gene(['normal', 'bold']),
            gridgutters: new Gene(['1/4', '1/2', '1']),
            elementwidth: new Gene([2, 4, 6, 12]),
            font: new Gene([1, 2, 3, 4])
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
        var obj = {};
        Object.keys(this.genes).forEach(name => {
            return obj[name] = this.genes[name].getValue();
        });
        return obj;
    }
}