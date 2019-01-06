const responseTime = require('koa-response-time');
const validator = require('node-input-validator');

import overrideValidator from './middleware/validation';
import responseHandler from './middleware/responseHandler';
import errorHandler from './middleware/errorHandler';
import requestId from './middleware/requestId';
import logging from './middleware/logging';
import sentry from './component/sentry';

import config from '../config';
import * as bodyParser from 'koa-bodyparser';
import * as helmet from 'koa-helmet';
import * as cors from '@koa/cors';

import * as Koa from 'koa';

import { router } from './router';

const app: Koa = new Koa();

// centralized error handling
app.on('error', (err: Error, ctx: Koa.BaseContext): void => {
    let logLevel: string;
    if (ctx.status >= 500) { logLevel = 'error'; }
    else if (ctx.status >= 400) { logLevel = 'warning'; }
    else if (ctx.status >= 100) { logLevel = 'info'; }
    sentry.captureException(err, { req: ctx.request, extra: ctx, level: logLevel });
});

// Validation middleware -> adds ctx.validate
app.use(validator.koa());
app.use(overrideValidator());

app.use(responseHandler());

// Provides important security headers to make your app more secure
app.use(helmet());

// Enable cors with default options
app.use(cors(config.cors));

// Enable bodyParser with default options
app.use(bodyParser(config.bodyParser));

// Adds an X-Request-Id response header with a unique request ID value
app.use(requestId());

// Adds an X-Response-Time header with a query execution time value
app.use(responseTime());

// Console debug logging
app.use(logging());

// Error handler
app.use(errorHandler());

// routers
app.use(router.routes()).use(router.allowedMethods());

export default app;
