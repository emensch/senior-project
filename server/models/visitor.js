import thinky   from '../utils/thinky';
const type = thinky.type;
const r = thinky.r;

const Visitor = thinky.createModel('Visitor', {
    id: type.string(),
    email: type.string().email(),
    votes: type.number().default(0),
    createdOn: type.date().default(r.now()) 
});

export default Visitor;