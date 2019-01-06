import 'reflect-metadata';
import { createConnection, Connection, ConnectionOptions } from 'typeorm';
import { join } from 'path';
import config from '../../config';
const parentDir = join(__dirname, '..');

const connectionOpts: ConnectionOptions = {
    type: 'postgres',
    host: config.db.host,
    port: config.db.port as number,
    username: config.db.user,
    password: config.db.pass,
    database: config.db.name,
    entities: [
        `${parentDir}/**/*.entity.ts`,
    ],
    synchronize: true,
};

const connection: Promise<Connection> = createConnection(connectionOpts);

export default connection;