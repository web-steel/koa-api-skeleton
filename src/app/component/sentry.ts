import * as raven from 'raven';
import config from '../../config';

export default raven.config(config.logger.sentry.dns).install();