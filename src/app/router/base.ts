import { general } from '../controller';
import * as Router from 'koa-router';

const router = new Router();

export default router
    .get('/', general.index)
;