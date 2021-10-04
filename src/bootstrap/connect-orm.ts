import Koa from 'koa';
import { createConnection } from 'typeorm';
import ormConfig from '../config/orm';

export default async (app: Koa) => {
    try {
        app.context.orm = await createConnection(ormConfig)
    } catch (err) {
        console.log(err)
        process.exit(1)
    }
}
