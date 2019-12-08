import {
    InternalError,
    NotFound,
    BadRequest,
    UnprocessableEntity,
} from '../../constant/errors';
import { constants } from 'http2';

describe('Errors', () => {
    it('should internal error', (done) => {
        const error = new InternalError();
        expect(error.statusCode).toEqual(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR);
        expect(error.code).toEqual('INTERNAL_ERROR');
        expect(error.message).toEqual('The server encountered an internal error.');
        done();
    });
    it('should not found error', (done) => {
        const error = new NotFound();
        expect(error.statusCode).toEqual(constants.HTTP_STATUS_NOT_FOUND);
        expect(error.code).toEqual('UNKNOWN_ENDPOINT');
        expect(error.message).toEqual('The requested endpoint does not exist.');
        done();
    });
    it('should bad request error', (done) => {
        const stringError = 'The request was invalid or cannot be otherwise served.';

        const error = new BadRequest(stringError);
        expect(error.statusCode).toEqual(constants.HTTP_STATUS_BAD_REQUEST);
        expect(error.code).toEqual('BAD_REQUEST');
        expect(error.message).toEqual(stringError);
        done();
    });
    it('should unprocessable entity error', (done) => {
        const stringError = 'number is required.';

        const error = new UnprocessableEntity(stringError);
        expect(error.statusCode).toEqual(constants.HTTP_STATUS_UNPROCESSABLE_ENTITY);
        expect(error.code).toEqual('UNPROCESSABLE_ENTITY');
        expect(error.message).toEqual(stringError);
        done();
    });
});