import express          from 'express';
import bodyParser       from 'body-parser';
import * as token       from './models/token';
import HtmlString       from './models/htmlstring';
import Visitor          from './models/Visitor';
import tokenMiddleware  from './utils/tokenMiddleware';

const router = express.Router();

router.use(bodyParser.json());

router.get('/html', tokenMiddleware, (req, res) => {
    const decodedToken = req.token;

    token.incrementAndCheck(decodedToken, 3)
        .then(response => {
            return HtmlString.getNext()
                .then(data => {
                    let html = data.html;
                    res.json({ ...response, html });
                })
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

router.post('/vote', tokenMiddleware, (req, res) => {
    res.sendStatus(200);
});

router.post('/session', (req, res) => {
    const email = req.body.email;

    Visitor.createIfNeeded(email)
        .then(() => {
            const newToken = token.generate(email);
            res.json({token: newToken});
        })
        .catch((err) => {
            res.status(500).send(err);
        }
    )

});


export default router;