import { normalizePort } from '../../config';

describe('function normalize port', () => {
    it('should be false value', (done) => {
        const port = '-9000';
        expect(normalizePort(port)).toBe(false);
        done();
    });
    it('should be NaN value', (done) => {
        const port = 's1000';
        expect(normalizePort(port)).toBe(NaN);
        done();
    });
});