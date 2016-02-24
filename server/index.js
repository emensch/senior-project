import config   from '../env.config';
import express  from 'express';
import routes   from './routes';
import path     from 'path';

const app = express();

if(process.env.NODE_ENV !== 'production') {
    const webpackConfig = require('../webpack.config.dev');
    const compiler = require('webpack')(webpackConfig);
    app.use(require('webpack-dev-middleware')(compiler, { noInfo: true }));
    app.use(require('webpack-hot-middleware')(compiler));
}

app.use(express.static('dist'));

app.use(routes);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'template.html'));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('Server listening on: ' + PORT);
})