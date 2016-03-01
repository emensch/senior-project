import thinky   from '../utils/thinky';
import Promise  from 'bluebird';
const type = thinky.type;
const r = thinky.r;

const Visitor = thinky.createModel('Visitor', {
    id: type.string(),
    email: type.string().email(),
    logins: type.number().default(1),
    votes: type.number().default(0),
    createdOn: type.date().default(r.now()) 
});

Visitor.ensureIndex('email');

Visitor.defineStatic('createIfNeeded', function(email) {
    console.log(email);
    if(email !== '') {
        return this.filter({email: email}).limit(1).run()
            .then(result => {
                return result[0].merge({
                    logins: r.row('logins').add(1)
                }).save();
            })
            .catch(() => {
                const Visitor = new this({email});
                return Visitor.save();
            });
    } else {
        return Promise.resolve();
    }
});

export default Visitor;