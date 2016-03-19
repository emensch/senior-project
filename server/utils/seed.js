import config       from '../../env.config';
import Chromosome   from '../genetic_utils/chromosome';
import generateHtml from './generateHtml';
import Style        from '../models/style';
import thinky       from './thinky';
const r = thinky.r;

r.table('Style').delete().run();

let num = process.env.POP_SIZE;
while (num--) {
    new Style({
        generation: 1,
        styles: new Chromosome().getObjectRepresentation(),
    }).save();
}

console.log('Database seeded.');