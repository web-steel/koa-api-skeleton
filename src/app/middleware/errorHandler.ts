import { BaseError, NotFound } from '../../constant/errors';
import { DefaultContext } from 'koa';
import { constants } from 'http2';

export default () => async (ctx: DefaultContext, next: () => Promise<any>) => {
    try {
        await next();

        if (!ctx.body
            && (!ctx.status
                || ctx.status === constants.HTTP_STATUS_NOT_FOUND
                || ctx.status === constants.HTTP_STATUS_METHOD_NOT_ALLOWED)) {
            throw new NotFound();
        }
    } catch (err) {
        if (err instanceof BaseError) {
            ctx.error({
                statusCode: err.statusCode,
                code: err.code,
                message: err.message,
            });
        } else {
            ctx.error({
                status: constants.HTTP_STATUS_INTERNAL_SERVER_ERROR,
                code: 'UNKNOWN_ERROR',
                message: 'The server encountered an unknown error.',
            });
        }
        ctx.app.emit('error', err, ctx);
    }
};