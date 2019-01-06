import HTTP_CODE from './statusCodes';

class BaseError extends Error {
    statusCode: number;
    code: string;
    message: string;
}

class InternalError extends BaseError {
    constructor() {
        super();
        this.statusCode = HTTP_CODE.INTERNAL_SERVER_ERROR;
        this.code = 'INTERNAL_ERROR';
        this.message = 'The server encountered an internal error.';
    }
}

class NotFound extends BaseError {
    constructor() {
        super();
        this.statusCode = HTTP_CODE.NOT_FOUND;
        this.code = 'UNKNOWN_ENDPOINT';
        this.message = 'The requested endpoint does not exist.';
    }
}

class BadRequest extends BaseError {
    constructor(error: string) {
        super();
        this.statusCode = HTTP_CODE.BAD_REQUEST;
        this.code = 'BAD_REQUEST';
        this.message = error;
    }
}

class UnprocessableEntity extends BaseError {
    constructor(error: string) {
        super();
        this.statusCode = HTTP_CODE.UNPROCESSABLE_ENTITY;
        this.code = 'UNPROCESSABLE_ENTITY';
        this.message = error;
    }
}

export { BaseError, InternalError, NotFound, BadRequest, UnprocessableEntity };