import thinky   from '../utils/thinky';
import Promise  from 'bluebird';
const type = thinky.type;
const r = thinky.r;

const HtmlString = thinky.createModel('HtmlString', {
    id: type.string(),
    generation: type.number(),
    html: type.string(),
    fitness: type.number().default(0),
    parents: [type.string()],
    visited: type.number().default(0),
    createdOn: type.date().default(r.now()) 
});

HtmlString.ensureIndex('visited');

HtmlString.defineStatic('getNext', function() {
    return this.orderBy('visited').limit(1).run()
        .then(htmlString => {
            return htmlString[0].merge({
                visited: r.row('visited').add(1)
            }).save();
        })
        .then(htmlString => {
            return htmlString.getOldValue();
        });
});

export default HtmlString;