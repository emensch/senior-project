import express          from 'express';
import bodyParser       from 'body-parser';
import Token            from './models/token';
import Style       from './models/style';
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
            console.log(err.stack);
            res.status(500).send(err);
        })
});

router.post('/vote', tokenMiddleware, (req, res) => {
    if(req.token.voteEnabled) {
        const htmlID = req.token.htmlIDs[req.body.index];
        Style.processVote(htmlID)
            .then(() => {
                Visitor.processVote(req.token.email);
            })
            .then(() => {
                Style.markVoted(req.token.htmlIDs);
            })
            .then(() => {
                Style.countVotesAndGenerate();
                res.sendStatus(200);
            })
            .catch((err) => {
                console.log(err.stack);
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
            console.log(err.stack);
            res.status(500).send(err);
        }
    )
});


export default router;