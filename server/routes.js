import express      from 'express';
import bodyParser   from 'body-parser';

const router = express.Router();

router.use(bodyParser.json());

router.get('/stylesheet', (req, res) => {
    res.sendStatus(200);
});

router.post('/vote', (req, res) => {
    res.sendStatus(200);
});

router.post('/session', (req, res) => {
    res.sendStatus(200);
});


export default router;