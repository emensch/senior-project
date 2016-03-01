import jwt      from 'jsonwebtoken';
import thinky   from '../utils/thinky';
import Promise  from 'bluebird';
const type = thinky.type;
const r = thinky.r;

const asyncVerify = Promise.promisify(jwt.verify, jwt);

const Token = thinky.createModel('Token', {
    id: type.string(),
    email: type.string().email(),
    numReqs: type.number().default(0)
});

Token.defineStatic('generate', function(email = '', numReqs = 0) {
    const newToken = new this({email, numReqs});
    return newToken.save()
        .then((token) => {
            return jwt.sign({
                id: token.id,
                email: token.email,
                numReqs: token.numReqs
            }, process.env.JWT_SECRET, {
                expiresIn: '1h'
            });
        });
});

Token.defineStatic('checkAndIncrement', function(id, limit) {
    return this.get(id)
        .then(token => {
            return token.delete();
        })
        .then(token => {
            if(token.numReqs < limit) {
                const newReqs = token.numReqs + 1;
                const voteEnabled = (newReqs === limit);
                return this.generate(token.email, newReqs)
                    .then(token => {
                        return {voteEnabled, token};
                    })
            } else {
                throw new Error('limit exceeded');
            }
        })
});

Token.defineStatic('verify', function(token) {
    return asyncVerify(token, process.env.JWT_SECRET);
});

export default Token;