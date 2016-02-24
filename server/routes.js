import express          from 'express';
import bodyParser       from 'body-parser';
import * as token       from './models/token';
import tokenMiddleware  from './utils/tokenMiddleware';

const router = express.Router();

router.use(bodyParser.json());

router.get('/stylesheet', tokenMiddleware, (req, res) => {
    const decodedToken = req.token;

    token.incrementAndCheck(decodedToken, 3)
        .then(response => {
            res.json(response);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

router.post('/vote', tokenMiddleware, (req, res) => {
    res.sendStatus(200);
});

router.post('/session', (req, res) => {
    const newToken = token.generate(req.body.email);
    res.json({token: newToken});
});


export default router;