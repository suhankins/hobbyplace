/**
 * Returns a validator, that checks if array is the correct length
 * @param min minimum
 * @param max maximum. If not provided, array must equal minimum
 */
export function validateArrayLength(min: number, max?: number) {
    return {
        validator: (value: []) =>
            value.length >= min &&
            (max !== undefined ? value.length <= max : true),
        message:
            max === undefined
                ? `Path {PATH} must be the length of ${min}`
                : `Path {PATH} must be longer than ${min} and shorter than ${max}`,
    };
}
