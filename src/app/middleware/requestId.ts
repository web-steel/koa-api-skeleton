import { v4 } from 'uuid';
import { BaseContext } from 'koa';

interface IRequest {
    header: string;
    propertyName: string;
    generator: any;
}

/**
 * Return middleware that gets an unique request id from a header or
 * generates a new id.
 *
 * @param {Object} [options={}] - Optional configuration.
 * @param {string} [options.header=X-Request-Id] - Request and response header name.
 * @param {string} [options.propertyName=reqId] - Context property name.
 * @param {function} [options.generator] - Id generator function.
 * @return {function} Koa middleware.
 */
export default function requestId(options: IRequest= { header: 'X-Request-Id', propertyName: 'reqId', generator: v4}) {
    const {
        header,
        propertyName,
        generator,
    } = options;

    return (ctx: BaseContext, next: () => Promise<any>) => {
        const reqId = ctx.request.get(header) || generator();
        ctx[propertyName] = reqId;
        ctx.set(header, reqId);
        return next();
    };
}