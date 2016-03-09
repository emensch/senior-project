import Token    from '../models/token';

export default function(req, res, next) {
    const token = req.headers['x-access-token'];
    if(token) {
        return Token.verify(token)
            .then(decoded => {
                return Token.get(decoded.id)
                    .then((retrieved) => {
                        req.token = retrieved;
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