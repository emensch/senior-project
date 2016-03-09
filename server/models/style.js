import thinky   from '../utils/thinky';
import Promise  from 'bluebird';
const type = thinky.type;
const r = thinky.r;

const Style = thinky.createModel('Style', {
    id: type.string(),
    generation: type.number(),
    styles: type.object(),
    fitness: type.number().default(0),
    parents: [type.string()],
    visited: type.number().default(0),
    createdOn: type.date().default(r.now()) 
});

Style.ensureIndex('visited');

Style.defineStatic('getNext', function() {
    return this.orderBy('visited').limit(1).run()
        .then(style => {
            return style[0].merge({
                visited: r.row('visited').add(1)
            }).save();
        })
        .then(style => {
            return style.getOldValue();
        });
});

Style.defineStatic('processVote', function(id) {
    return this.get(id)
        .then(style => {
            return style.merge({
                fitness: r.row('fitness').add(1)
            }).save();
        })
});

export default Style;