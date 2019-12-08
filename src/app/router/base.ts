import { general } from '../controller';
import Router from 'koa-router';

const swaggerUi = require('swagger-ui-koa');
import swaggerSpec from '../../component/swagger';

const router = new Router();

export default router
    .get('/', general.index)
    .get('swagger', swaggerUi.setup(swaggerSpec))
;