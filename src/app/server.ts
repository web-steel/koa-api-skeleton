import app from './app';
import config from '../config';
import { Database } from '../component/db';

const database = new Database();

// create connection with database
// note that its not active database connection
// TypeORM creates you connection pull to uses connections from pull on your requests
database
    .connect()
    .then(startServer)
    .catch(console.log);

function startServer() {
    app.listen(3000, () => {
        console.log('APP listening at port %d', config.server.port);
    });
}

