import config       from '../env.config';
import express      from 'express';
import thinky       from './utils/thinky';
import controller   from './controller';
import path         from 'path';
import * as logger  from 'winston';
import { RethinkDB } from 'winston-rethinkdb';
import * as appState from './utils/appState';

const app = express();

const dev = (process.env.NODE_ENV !== 'production');

logger.add(RethinkDB, {
    db: process.env.RETHINK_DBNAME,
    options: () => thinky.r
});

if(dev) {
    const webpackConfig = require('../webpack.config.dev');
    const compiler = require('webpack')(webpackConfig);
    app.use(require('webpack-dev-middleware')(compiler, { noInfo: true }));
    app.use(require('webpack-hot-middleware')(compiler));
}

app.use(express.static('dist'));

app.use('/api', controller);

app.get('/', (req, res) => {
    res.send(`
<!doctype html>
<html>
    <head>
        <title> Genetic Pages </title>
        ${dev ? '' : '<link rel=\'stylesheet\' href=\'/styles.css\'>'}
    </head>
    <body>
        <div id='root'></div>
        <script src='/bundle.js'></script>
    </body>
</html>
    `);

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    logger.info('Server listening on port ' + PORT);
})

process.on('exit', () => {
    appState.close();
})