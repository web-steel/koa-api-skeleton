import base from './base';
import * as Router from 'koa-router';

const router = new Router();

router.use('/', base.routes(), base.allowedMethods());

export {
    router,
};