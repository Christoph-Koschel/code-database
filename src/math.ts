import {float, int} from "./symbols";

export function rand(min: int, max: int): int {
    return Math.floor(Math.random() * (max - min)) + max as int;
}

export function randF(min: float, max: float): float {
    return Math.floor(Math.random() * (max - min)) + max;
}

export function isInt(num: number): boolean {
    return num % 1 == 0;
}

export function isFloat(num: number): boolean {
    return !isInt(num);
}

