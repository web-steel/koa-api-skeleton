import 'reflect-metadata';
import envConfig from '../config/env';
import { join } from 'path';
import { ConnectionOptions } from 'typeorm';
import { normalizePort } from '../lib/normalize';

const parentDir = join(__dirname, '../app');

const ormConfig: ConnectionOptions = {
    type: 'mysql',
    host: process.env.DATABASE_HOST || '127.0.0.1',
    port: normalizePort(process.env.DATABASE_PORT) || 3306,
    username: process.env.DATABASE_USER || 'root',
    password: process.env.DATABASE_PASS || 'root',
    database: process.env.DATABASE_NAME || 'default',
    entities: [`${parentDir}/model/entity/**/*{.ts,.js}`],
    migrations: [`${parentDir}/model/migration/**/*{.ts,.js}`],
    subscribers: [`${parentDir}/model/subscriber/**/*{.ts,.js}`],
    cli: {
        entitiesDir: `${parentDir}/model/entity`,
        migrationsDir: `${parentDir}/model/migration`,
        subscribersDir: `${parentDir}/model/subscriber`
    },
    synchronize: false,
    logging: !envConfig.isProduction,
};

export default ormConfig;
