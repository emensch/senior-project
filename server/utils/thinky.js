import thinky from 'thinky';

const config = {
    db: process.env.RETHINK_DBNAME,
    authKey: process.env.RETHINK_AUTHKEY
}

export default thinky(config);