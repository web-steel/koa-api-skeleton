import envConfig from '../../config/env';
import * as winston from 'winston';
import { getLogLevelForStatus } from '../../lib/logger';
import { DefaultContext } from 'koa';

export default () => async (ctx: DefaultContext, next: () => Promise<any>) => {

    const start = new Date().getMilliseconds();

    await next();

    const ms = new Date().getMilliseconds() - start;
    const msg: string = `${ctx.method} ${ctx.originalUrl} ${ctx.status} ${ms}ms`;

    winston.configure({
        level: 'debug',
        transports: [
            //
            // - Write to all logs with specified level to console.
            new winston.transports.Console({
                format: winston.format.combine(
                    winston.format.colorize(),
                    winston.format.simple()
                )
            })
        ]
    });

    if (envConfig.nodeEnv !== 'production')
        winston.log(getLogLevelForStatus(ctx.status, 'winston'), msg);
};
