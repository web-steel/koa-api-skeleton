import { BadRequest, UnprocessableEntity } from '../../constant/errors';
import { Context } from 'koa';

function validation() {
    return async (ctx: Context, next: () => Promise<any>) => {
        const valid = ctx.validate;

        ctx.validate = async function (inputs: any, rules: any, message: string) {
            const props: any = {};
            for (const prop in rules) {
                if (rules.hasOwnProperty(prop)) {
                    if (Array.isArray(rules[prop])) {
                        props[prop] = rules[prop].join('|');
                    } else
                        props[prop] = rules[prop];
                }
            }
            const v = await valid(inputs, props, message);
            const isValid = await v.check();

            if (!isValid) {

                const error = getError(v.errors);

                throw (isRequired(v.errors) ?
                    new BadRequest(error) :
                    new UnprocessableEntity(error));
            }

            return true;
        };

        return await next();
    };
}

/**
 *
 * @param {array} errors
 * @returns {*}
 */
function isRequired(errors: any): boolean|any {
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
    const error: boolean|any = isRequired(errors);

    if (!error) {
        for (const prop in errors) {
            if (errors.hasOwnProperty(prop))
                return errors[prop]['message'];
        }
    }

    return error;
}

export default validation;