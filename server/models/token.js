import jwt          from 'jsonwebtoken';
import thinky       from '../utils/thinky';
import Promise      from 'bluebird';
import Style   from './style'
import generateHtml from '../utils/generateHtml';
const type = thinky.type;
const r = thinky.r;

const asyncVerify = Promise.promisify(jwt.verify, jwt);

const Token = thinky.createModel('Token', {
    id: type.string(),
    email: type.string().validator(validateEmail),
    numReqs: type.number().default(0),
    htmlIDs: [type.string()],
    createdOn: type.date().default(r.now())
});

Token.ensureIndex('email');

function validateEmail(email) {
    if(email !== '') {
        return this.email
    } else {
        return true;
    }
}

Token.defineStatic('generate', function(email = '', numReqs = 0, voteEnabled = false, htmlIDs = []) {
    const newToken = new this({email, numReqs, voteEnabled, htmlIDs});
    return newToken.save()
        .then((token) => {
            return jwt.sign({
                id: token.id,
                email: token.email,
                numReqs: token.numReqs,
                voteEnabled: token.voteEnabled,
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
                return Style.getNext(token.htmlIDs)
                    .then(style => {
                        const newReqs = token.numReqs + 1;
                        const newHtmlIDs = [ ...token.htmlIDs, style.id];
                        const voteEnabled = (newReqs === limit);
                        return this.generate(token.email, newReqs, voteEnabled, newHtmlIDs)
                            .then(token => {
                                return generateHtml(style.styles)
                                    .then(html => {
                                        return {voteEnabled, token, html: html};
                                    })
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