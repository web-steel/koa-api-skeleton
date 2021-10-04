import { DefaultContext } from 'koa';

export default class HealthController {

    /**
     * @swagger
     * /health:
     *  get:
     *      tags:
     *          - Health
     *      summary: The health string is returned.
     *      responses:
     *          200:
     *              description: health message
     *              content:
     *                  application/plain:
     *                      schema:
     *                          type: string
     *                      example:
     *                          ok
     */
    public static async ok(ctx: DefaultContext) {
        ctx.body = 'ok';
    }
}
