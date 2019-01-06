import { BaseContext } from 'koa';

export default class GeneralController {

    /**
     * Index controller
     * @param { BaseContext } ctx the request context
     */
    public static async index(ctx: BaseContext) {
        ctx.body = 'Welcome a API Core';
    }
}