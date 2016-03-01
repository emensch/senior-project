import jwt          from 'jsonwebtoken';
import thinky       from '../utils/thinky';
import Promise      from 'bluebird';
import HtmlString   from './htmlstring'
const type = thinky.type;
const r = thinky.r;

const asyncVerify = Promise.promisify(jwt.verify, jwt);

const Token = thinky.createModel('Token', {
    id: type.string(),
    email: type.string().validator(validateEmail),
    numReqs: type.number().default(0),
    htmlIDs: [type.string()]
});

Token.ensureIndex('email');

function validateEmail(email) {
    if(email !== '') {
        return this.email
    } else {
        return true;
    }
}

Token.defineStatic('generate', function(email = '', numReqs = 0, htmlIDs = []) {
    const newToken = new this({email, numReqs, htmlIDs});
    console.log(newToken);
    return newToken.save()
        .then((token) => {
            return jwt.sign({
                id: token.id,
                email: token.email,
                numReqs: token.numReqs,
                htmlIDs: token.htmlIDs
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
                return HtmlString.getNext()
                    .then((html) => {
                        const newReqs = token.numReqs + 1;
                        const newHtmlIDs = [ ...token.htmlIDs, html.id];
                        const voteEnabled = (newReqs === limit);
                        return this.generate(token.email, newReqs, newHtmlIDs)
                            .then(token => {
                                return {voteEnabled, token, html: html.html};
                            })
                })
            } else {
                throw new Error('limit exceeded');
            }
        })
});

Token.defineStatic('removeByEmail', function(email) {
    return this.getAll(email, {index: 'email'}).delete();
});

Token.defineStatic('verify', function(token) {
    return asyncVerify(token, process.env.JWT_SECRET);
});

export default Token;