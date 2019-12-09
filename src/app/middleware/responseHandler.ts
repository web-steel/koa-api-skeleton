import { DefaultContext } from 'koa';
import { constants } from 'http2';

export default () => async (ctx: DefaultContext, next: () => Promise<any>) => {
    ctx.success = ({statusCode, data = undefined}: any) => {
        const status = 'success';

        if (!!statusCode && (statusCode < constants.HTTP_STATUS_BAD_REQUEST))
            ctx.status = statusCode;
        else if (!(ctx.status < constants.HTTP_STATUS_BAD_REQUEST))
            ctx.status = constants.HTTP_STATUS_OK;

        ctx.body = {status, data};
    };

    ctx.error = ({statusCode, code, message = undefined}: any) => {
        const status = 'error';

        if (!!statusCode && (statusCode >= constants.HTTP_STATUS_BAD_REQUEST && statusCode < 600))
            ctx.status = statusCode;
        else if (!(ctx.status >= constants.HTTP_STATUS_INTERNAL_SERVER_ERROR && ctx.status < 600))
            ctx.status = constants.HTTP_STATUS_INTERNAL_SERVER_ERROR;

        ctx.body = {status, code, message};
    };

    ctx.ok = (params: any = {}) => {
        ctx.success({
            ...params,
            statusCode: constants.HTTP_STATUS_OK,
        });
    };

    ctx.created = (params: any = {}) => {
        ctx.success({
            ...params,
            statusCode: constants.HTTP_STATUS_CREATED,
        });
    };

    ctx.accepted = (params: any = {}) => {
        ctx.success({
            ...params,
            statusCode: constants.HTTP_STATUS_ACCEPTED,
        });
    };

    ctx.noContent = () => {
        ctx.success({
            statusCode: constants.HTTP_STATUS_NO_CONTENT,
        });
    };

    await next();
};