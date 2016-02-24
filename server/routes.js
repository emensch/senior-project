import express  from 'express';

const router = express.Router();

router.get('/a', (req, res) => {
    res.send('a');
});

export default router;