import Koa from 'koa';
import { DataSource } from 'typeorm';
import ormConfig from '../config/orm';

export default async (app: Koa) => {
  try {
    app.context.orm = new DataSource(ormConfig)
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
}
