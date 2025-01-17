export function clamp (value, min = 0, max = 1) {
    return Math.max(min, Math.min(max, value));
}
