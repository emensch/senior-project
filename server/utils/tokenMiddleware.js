import jwt      from 'jsonwebtoken';
import Promise  from 'bluebird';

const asyncVerify = Promise.promisify(jwt.verify, jwt);

export default function(req, res, next) {
    const token = req.headers['x-access-token'];
    console.log(token);
    if(token) {
        asyncVerify(token, process.env.JWT_SECRET)
            .then(decoded => {
                console.log('decoded: ', decoded);
                req.token = decoded;
                next();
            })
            .catch(err => {
                res.sendStatus(401)
            });
    } else {
        res.sendStatus(401);
    }

}