import { BadRequest, UnprocessableEntity } from '../../constant/errors'
import { Context } from 'koa';

export default () => async (ctx: Context, next: () => Promise<any>) => {
    const valid = ctx.validate.bind(ctx);

    ctx.validate = async function(
        inputs: { [key: string]: string | number | boolean },
        rules: { [key: string]: string[] },
        message: { [key: string]: string }
    ) {
        const props: { [key: string]: string | string[] } = {};
        for (const prop in rules) {
            if (rules.hasOwnProperty(prop)) {
                if (Array.isArray(rules[prop])) {
                    props[prop] = rules[prop].join('|');
                } else
                    props[prop] = rules[prop];
            }
        }

        try {
            await valid(inputs, props, message);
        } catch ({ body }) {
            const error = getError(body.errors);

            throw (isRequired(body.errors) ?
                // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                new BadRequest(error) :
                // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                new UnprocessableEntity(error));
        }

        return true;
    };

    return await next();
};

/**
 *
 * @param {array} errors
 * @returns {*}
 */
function isRequired(errors: any): boolean | any {
    for (const prop in errors) {
        if (errors.hasOwnProperty(prop))
            if (errors[prop]['rule'] === 'required')
                return errors[prop]['message'];
    }

    return false;
}

/**
 * Get error
 * @param {array} errors
 * @returns {*}
 */
function getError(errors: any) {
    const error: boolean | any = isRequired(errors);

    if (!error) {
        for (const prop in errors) {
            if (errors.hasOwnProperty(prop))
                return errors[prop]['message'];
        }
    }

    return error;
}
