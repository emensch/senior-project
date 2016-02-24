import HtmlString   from '../models/htmlstring';
import thinky       from './thinky';
const r = thinky.r;

let num = 10;
while (num--) {
    new HtmlString({
        generation: 1,
        html: ('Iteration ' + num),
    }).save();
}

console.log('Database seeded.');