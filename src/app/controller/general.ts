import { BaseContext } from 'koa';

export default class GeneralController {

    /**
     * @swagger
     * /:
     *  get:
     *      tags:
     *          - Home
     *      summary: The welcome string is returned.
     *      responses:
     *          200:
     *              description: welcome message
     *              content:
     *                  application/plain:
     *                      schema:
     *                          type: string
     *                      example:
     *                          Welcome a API Core
     */
    public static async index(ctx: BaseContext) {
        ctx.body = 'Welcome a API Core';
    }
}