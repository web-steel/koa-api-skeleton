/**
 * Normalize port
 * @param val {string} value port
 */
export function normalizePort (val: string|number): number {
    const  port: number = parseInt(val as string, 10);

    if (isNaN(port)) {
        return port;
    }

    if (port >= 0) {
        return port;
    }

    return null;
}
