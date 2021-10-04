const responseTime = require('koa-response-time');
const validator = require('node-input-validator');
const swaggerUi = require('swagger-ui-koa');

import overrideValidator from './middleware/validation';
import responseHandler from './middleware/responseHandler';
import errorHandler from './middleware/errorHandler';
import requestId from './middleware/requestId';
import logging from './middleware/logging';
import options from './middleware/options';

import compress from 'koa-compress';
import bodyParser from 'koa-bodyparser';
import helmet from 'koa-helmet';
import cors from '@koa/cors';

import Koa from 'koa';

const app: Koa = new Koa();

// Validation middleware -> adds ctx.validate
app.use(validator.koa());
app.use(overrideValidator());

// Provides important security headers to make your app more secure
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: [`'self'`],
            styleSrc: [`'self'`, `'unsafe-inline'`],
            imgSrc: [`'self'`, 'data:', 'validator.swagger.io'],
            scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
        },
    },
}));

// Enable cors with default options
app.use(cors({
    origin: '*',
    allowMethods: ['GET', 'HEAD', 'PUT', 'POST', 'DELETE', 'PATCH'],
    exposeHeaders: ['X-Request-Id'],
}));

// Enable bodyParser with default options
app.use(bodyParser({
    enableTypes: ['json', 'form'],
    formLimit: '10mb',
    jsonLimit: '10mb',
}));

// Adds an X-Request-Id response header with a unique request ID value
app.use(requestId());

// Adds an X-Response-Time header with a query execution time value
app.use(responseTime());

// Console debug logging
app.use(logging());

// handler
app.use(responseHandler());
app.use(errorHandler());

app.use(swaggerUi.serve);

app.use(compress());
app.use(options());

export default app;
