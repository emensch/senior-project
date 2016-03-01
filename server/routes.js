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
            return HtmlString.getNext()
                .then(data => {
                    let html = data.html;
                    res.json({ ...response, html });
                });
        })
        .catch(err => {
            res.status(500).send(err);
        })
});

router.post('/vote', tokenMiddleware, (req, res) => {
    res.sendStatus(200);
});

router.post('/session', (req, res) => {
    const email = req.body.email;

    Visitor.createIfNeeded(email)
        .then(() => {
            return Token.generate(email);
        })
        .then((token) => {
            console.log('saved token', token);
            res.json({token});
        })
        .catch((err) => {
            res.status(500).send(err);
        }
    )
});


export default router;