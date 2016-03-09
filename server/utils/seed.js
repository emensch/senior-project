import generateHtml from './generateHtml';
import Style        from '../models/style';
import thinky       from './thinky';
const r = thinky.r;

//let num = 2;
//while (num--) {
//    new HtmlString({
//        generation: 1,
//        styles: {},
//    }).save();
//}

new Style({
    generation: 1,
    styles: {contentbgcolor: '#666666'},
}).save();

new Style({
    generation: 1,
    styles: {contentbgcolor: '#16AA60'},
}).save();

new Style({
    generation: 1,
    styles: {contentbgcolor: 'transparent'},
}).save();

console.log('Database seeded.');