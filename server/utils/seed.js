import Chromosome   from '../genetic_utils/chromosome';
import generateHtml from './generateHtml';
import Style        from '../models/style';
import thinky       from './thinky';
const r = thinky.r;

r.table('Style').delete().run();

let num = 10;
while (num--) {
    new Style({
        generation: 1,
        styles: new Chromosome().getObjectRepresentation(),
    }).save();
}

console.log('Database seeded.');