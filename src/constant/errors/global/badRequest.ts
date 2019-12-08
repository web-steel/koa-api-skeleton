import { BaseError } from './baseError';
import { constants } from 'http2';

export class BadRequest extends BaseError {
    constructor(error: string) {
        super();
        this.statusCode = constants.HTTP_STATUS_BAD_REQUEST;
        this.code = 'BAD_REQUEST';
        this.message = error;
    }
}