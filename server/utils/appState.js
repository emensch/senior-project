import Promise      from 'bluebird';
import redis        from 'redis';
import * as logger  from 'winston';

Promise.promisifyAll(redis.RedisClient.prototype);
Promise.promisifyAll(redis.Multi.prototype);

const client = redis.createClient();

client.on('error', err => {
    logger.error('Redis error: ' + err);
});

client.on('ready', () => {
    logger.info('Redis ready');
});

export function setState(key, val) {
    return client.setAsync(key, val);
}

export function getState(key) {
    return client.getAsync(key);
}

export function close() {
    client.quit();
}