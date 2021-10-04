import app from '../../app/app';
import serverConfig from '../../config/server';
import startServer from '../../bootstrap/start-server'

const mockListen = jest.fn();
app.listen = mockListen;

afterEach( async () => {
    mockListen.mockReset();
});

it('Server works', async () => {
    await startServer(app)
    expect(mockListen.mock.calls.length).toBe(1);
    expect(mockListen.mock.calls[0][0]).toBe(serverConfig.port);
});
