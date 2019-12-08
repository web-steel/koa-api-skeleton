import { BaseError } from './baseError';
import { constants } from 'http2';

export class UnprocessableEntity extends BaseError {
    constructor(message: string) {
        super();
        this.statusCode = constants.HTTP_STATUS_UNPROCESSABLE_ENTITY;
        this.code = 'UNPROCESSABLE_ENTITY';
        this.message = message;
    }
}