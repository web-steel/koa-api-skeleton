import { constants } from 'http2';

const levels = {
    ERROR: 'error',
    WARN: 'warn',
    WARNING: 'warning',
    INFO: 'info'
};

/**
 * @param {levels} status
 * @param {string} type
 * @returns string
 */
export function getLogLevelForStatus(status: number, type: string = 'sentry'): string {
    if (status >= constants.HTTP_STATUS_INTERNAL_SERVER_ERROR) { return levels.ERROR; }
    else if (status >= constants.HTTP_STATUS_BAD_REQUEST) { return type === 'sentry' ? levels.WARNING : levels.WARN; }
    else if (status >= constants.HTTP_STATUS_CONTINUE) { return levels.INFO; }
}