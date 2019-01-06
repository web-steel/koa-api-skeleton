import {
    InternalError,
    NotFound,
    BadRequest,
    UnprocessableEntity,
} from '../../app/constant/error';
import HTTP_CODE from '../../app/constant/statusCodes';

describe('Errors', () => {
    it('should internal error', (done) => {
        const error = new InternalError();
        expect(error.statusCode).toEqual(HTTP_CODE.INTERNAL_SERVER_ERROR);
        expect(error.code).toEqual('INTERNAL_ERROR');
        expect(error.message).toEqual('The server encountered an internal error.');
        done();
    });
    it('should not found error', (done) => {
        const error = new NotFound();
        expect(error.statusCode).toEqual(HTTP_CODE.NOT_FOUND);
        expect(error.code).toEqual('UNKNOWN_ENDPOINT');
        expect(error.message).toEqual('The requested endpoint does not exist.');
        done();
    });
    it('should bad request error', (done) => {
        const stringError = 'The request was invalid or cannot be otherwise served.';

        const error = new BadRequest(stringError);
        expect(error.statusCode).toEqual(HTTP_CODE.BAD_REQUEST);
        expect(error.code).toEqual('BAD_REQUEST');
        expect(error.message).toEqual(stringError);
        done();
    });
    it('should unprocessable entity error', (done) => {
        const stringError = 'tracking_number is required.';

        const error = new UnprocessableEntity(stringError);
        expect(error.statusCode).toEqual(HTTP_CODE.UNPROCESSABLE_ENTITY);
        expect(error.code).toEqual('UNPROCESSABLE_ENTITY');
        expect(error.message).toEqual(stringError);
        done();
    });
});