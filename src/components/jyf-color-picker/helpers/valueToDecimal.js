export function valueToDecimal (value) {
    if (value > 1) {
        return value / 100;
    }

    return value;
}
