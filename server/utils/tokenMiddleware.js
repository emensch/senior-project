import Token    from '../models/token';

export default function(req, res, next) {
    const token = req.headers['x-access-token'];
    console.log(token);
    if(token) {
        return Token.verify(token)
            .then(decoded => {
                console.log('decoded: ', decoded);
                return Token.get(decoded.id)
                    .then(() => {
                        req.token = decoded;
                        next();
                    });
            })
            .catch(err => {
                res.sendStatus(401);
            });
    } else {
        res.sendStatus(401);
    }

}