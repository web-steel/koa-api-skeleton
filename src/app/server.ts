import app from './app';
import config from '../config';
import { Database } from '../component/db';

const database = new Database();

// create connection with database
// note that its not active database connection
// TypeORM creates you connection pull to uses connections from pull on your requests
(async () => {

    try {

        await database.connect();
        app.listen(
            config.server.port, () => console.log('APP listening at port %d', config.server.port)
        );

        process.on('SIGINT', async () => {
            try {
                await database.disconnect();
                process.exit(0);
            } catch (e) {
                process.exit(1);
            }
        });
    } catch (e) { console.log(e); }
})();

