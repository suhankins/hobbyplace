export function validateArrayLength(min: number, max: number) {
    return {
        validator: (value: []) => value.length >= min && value.length <= max,
        message:
            min == max
                ? `Path {PATH} must be the length of ${min}`
                : `Path {PATH} must be longer than ${min} and shorter than ${max}`,
    };
}
