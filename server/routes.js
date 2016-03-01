import express          from 'express';
import bodyParser       from 'body-parser';
import Token            from './models/token';
import HtmlString       from './models/htmlstring';
import Visitor          from './models/Visitor';
import tokenMiddleware  from './utils/tokenMiddleware';

const router = express.Router();

router.use(bodyParser.json());

router.get('/html', tokenMiddleware, (req, res) => {
    Token.checkAndIncrement(req.token.id, 3)
        .then(response => {
            res.json(response);
        })
        .catch(err => {
            res.status(500).send(err);
        })
});

router.post('/vote', tokenMiddleware, (req, res) => {
    if(req.token.voteEnabled) {
        const htmlID = req.token.htmlIDs[req.body.index];
        HtmlString.processVote(htmlID)
            .then(() => {
                Visitor.processVote(req.token.email);
                res.sendStatus(200);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).send(err);
            })
    } else {
        res.sendStatus(401);
    }
});

router.post('/session', (req, res) => {
    const email = req.body.email;

    Visitor.createIfNeeded(email)
        .then(() => {
            return Token.generate(email);
        })
        .then((token) => {
            res.json({token});
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send(err);
        }
    )
});


export default router;