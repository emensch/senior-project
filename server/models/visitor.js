import Token    from './token';
import thinky   from '../utils/thinky';
import Promise  from 'bluebird';
const type = thinky.type;
const r = thinky.r;

const Visitor = thinky.createModel('Visitor', {
    id: type.string(),
    email: type.string().email(),
    votes: type.number().default(0),
    createdOn: type.date().default(r.now()) 
});

Visitor.ensureIndex('email');

Visitor.defineStatic('createIfNeeded', function(email) {
    if(email !== '') {
        return this.filter({email: email}).count().execute()
            .then(num => {
                if(!num) {
                    const Visitor = new this({email});
                    return Visitor.save();
                } else {
                    return Promise.resolve();
                }
            })
            .then(() => {
                return Token.removeByEmail(email);
            })
    } else {
        return Promise.resolve();
    }
});

Visitor.defineStatic('processVote', function(email) {
   if(email !== '') {
        return r.table('Visitor').filter({email: email}).limit(1).update({
            votes: r.row('votes').add(1)
        }).run()
   } else {
        return Promise.resolve();
   }
});

export default Visitor;