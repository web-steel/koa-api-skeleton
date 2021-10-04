import Koa from 'koa';
import serverConfig from '../config/server';

export default async (app: Koa) => {
    app.listen(serverConfig.port, serverConfig.host, () => {
        console.log(`Server started on ${serverConfig.host}:${serverConfig.port}`)
    })
}
