import HTTP_CODE from '../constant/statusCodes';
import { BaseContext } from 'koa';

function responseHandler() {
    return async (ctx: BaseContext, next: () => Promise<any>) => {
        ctx.statusCodes = HTTP_CODE;

        ctx.success = ({ statusCode, data = undefined }: any) => {
            const status = 'success';

            if (!!statusCode && (statusCode < 400))
                ctx.status = statusCode;
            else if (!(ctx.status < 400))
                ctx.status = HTTP_CODE.OK;

            ctx.body = { status, data };
        };

        ctx.error = ({ statusCode, code, message = undefined }: any) => {
            const status = 'error';

            if (!!statusCode && (statusCode >= 400 && statusCode < 600))
                ctx.status = statusCode;
            else if (!(ctx.status >= 500 && ctx.status < 600))
                ctx.status = HTTP_CODE.INTERNAL_SERVER_ERROR;

            ctx.body = { status, code, message };
        };

        ctx.ok = (params = {}) => {
            ctx.success({
                ...params,
                statusCode: HTTP_CODE.OK,
            });
        };

        ctx.created = (params = {}) => {
            ctx.success({
                ...params,
                statusCode: HTTP_CODE.CREATED,
            });
        };

        ctx.accepted = (params = {}) => {
            ctx.success({
                ...params,
                statusCode: HTTP_CODE.ACCEPTED,
            });
        };

        ctx.noContent = () => {
            ctx.success({
                statusCode: HTTP_CODE.NO_CONTENT,
            });
        };

        await next();
    };
}

export default responseHandler;