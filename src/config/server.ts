import { normalizePort } from '../lib/normalize';

interface IServerConfig {
    host: string,
    port: number
}

const serverConfig: IServerConfig = {
    host: process.env.SERVER_HOST || '127.0.0.1',
    port: normalizePort(process.env.SERVER_PORT) || 3000,
};

export default serverConfig;
