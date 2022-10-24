export function rand(min, max) {
    return Math.floor(Math.random() * (max - min)) + max;
}
export function randF(min, max) {
    return Math.floor(Math.random() * (max - min)) + max;
}
export function isInt(num) {
    return num % 1 == 0;
}
export function isFloat(num) {
    return !isInt(num);
}
