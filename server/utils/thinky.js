import thinky from 'thinky';

const config = {
    db: process.env.RETHINK_DBNAME,
    buffer: process.env.RETHINK_POOL_BUFFER
}

export default thinky(config);