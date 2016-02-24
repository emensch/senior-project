import jwt      from 'jsonwebtoken';
import Promise  from 'bluebird';

const asyncVerify = Promise.promisify(jwt.verify, jwt);

export function generate(email = '', numReqs = 0) {
    const token = jwt.sign({
        email,
        numReqs
    }, process.env.JWT_SECRET, {
        expiresIn: '1h'
    });

    return token;
}

export function verify(token) {
    return asyncVerify(token, process.env.JWT_SECRET);
}

export function incrementAndCheck(token, limit) {
    return new Promise( (resolve, reject) => {
        if (token.numReqs <= limit) {
            resolve(generate(token.email, ++token.numReqs));
        } else {
            reject(new Error('limit exceeded'));
        }
    });
}