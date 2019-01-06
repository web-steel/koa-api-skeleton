import { BaseError, NotFound } from '../constant/error';
import { BaseContext } from 'koa';
import HTTP_CODE from '../constant/statusCodes';

/**
 * Error handling
 * @returns {Function} Koa middleware.
 */
function errorHandler() {
    return async (ctx: BaseContext, next: () => Promise<any>) => {
        try {
            await next();

            if (!ctx.body
                && (!ctx.status
                    || ctx.status === HTTP_CODE.NOT_FOUND
                    || ctx.status === HTTP_CODE.METHOD_NOT_ALLOWED))
                throw new NotFound();
        } catch (err) {
            if (err instanceof BaseError) {
                ctx.error({
                    statusCode: err.statusCode,
                    code: err.code,
                    message: err.message,
                });
            } else {
                ctx.error({
                    status: 500,
                    code: 'UNKNOWN_ERROR',
                    message: 'The server encountered an unknown error.',
                });
            }
            ctx.app.emit('error', err, ctx);
        }
    };
}

export default errorHandler;