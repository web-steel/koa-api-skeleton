import request from 'supertest';
import app from '../../app/app';
import routes from '../../app/routes';

beforeEach(async () => {
    await routes(app)
})

describe('health route tests', () => {
    test('get index route GET /health', async () => {
        const response = await request(app.callback()).get('/health');
        expect(response.status).toBe(200);
        expect(response.text).toBe('ok');
    });
    test('test errorHandler', async () => {
        const response = await request(app.callback()).post('/health');
        expect(response.status).toBe(404);
        expect(response.type).toEqual('application/json');
        expect(response.body).toHaveProperty('status');
        expect(response.body).toHaveProperty('code');
        expect(response.body).toHaveProperty('message');
    });
});
