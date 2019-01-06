import app from './app';
import databaseConnection from './component/db';
import config from '../config';

// create connection with database
// note that its not active database connection
// TypeORM creates you connection pull to uses connections from pull on your requests
databaseConnection
    .then(() => app.listen(
        config.server.port, () => console.log('APP listening at port %d', config.server.port)))
    .catch(console.error);