/**
 * JSON parser
 * @param string string that should be parsed
 * @returns object or error message
 */
export function parseJson(string: string): any | string {
    try {
        return JSON.parse(string);
    } catch (e) {
        let message = 'Unknown error';
        if (typeof e === 'string') {
            message = e;
        } else if (e instanceof Error) {
            message = e.message;
        }
        console.error(message);
        return message;
    }
}
