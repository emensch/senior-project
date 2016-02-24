import thinky   from '../utils/thinky';
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

export default HtmlString;