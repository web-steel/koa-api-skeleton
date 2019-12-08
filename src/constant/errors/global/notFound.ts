import { BaseError } from './baseError';
import { constants } from 'http2';

export class NotFound extends BaseError {
    constructor() {
        super();
        this.statusCode = constants.HTTP_STATUS_NOT_FOUND;
        this.code = 'UNKNOWN_ENDPOINT';
        this.message = 'The requested endpoint does not exist.';
    }
}