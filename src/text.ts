import {int} from "./symbols";

export function isNumber(char: string) {
    if (typeof char !== 'string') {
        return false;
    }

    if (char.trim() === '') {
        return false;
    }

    return !isNaN(Number(char));
}

export function format(tmp: string, ...items: string[]): string {
    let chars = tmp.split("");
    let res = "";

    let itemIndex: int = 0;

    for (let i = 0; i < chars.length; i++) {
        let char = chars[i];
        if (char == "\\") {
            if (chars[i + 1] == "%") {
                res += char;
                res += chars[i + 1];
                i++;
                continue;
            }
        }
        if (char == "%") {
            if (chars[i + 1] == "n") {
                res += "\n";
                i++;
                continue;
            }

            let operator: string;
            let space: int = 0;
            let doSpace: boolean = false;

            if (chars[i + 1] == "+" || chars[i + 1] == "-") {
                operator = chars[i + 1];
                if (!isNumber(chars[i + 2])) {
                    res += char;
                    res += chars[i + 1];
                    res += chars[i + 2];
                    i += 2;
                    continue;
                }

                let numStr = "";
                i += 2;

                while (i < chars.length && isNumber(chars[i])) {
                    numStr += chars[i];
                    i++;
                }

                doSpace = true;
                space = parseInt(numStr);
            } else {
                i++;
            }

            if (chars[i] != "s") {
                res += operator;
                res += space.toString();
                res += "s";
                i++;
                continue;
            }

            let item = items[itemIndex];
            itemIndex++;

            if (doSpace && item.length < space) {
                let size = space - item.length;
                item = operator == "-" ? " ".repeat(size) + item : item + " ".repeat(size);
            }

            res += item;
            continue
        }

        res += char;
    }

    return res;
}

export function formatNamed(tmp: string, values: { [name: string]: string }) {
    let chars = tmp.split("");
    let res = "";

    for (let i = 0; i < chars.length; i++) {
        let char = chars[i];
        if (char == "\\") {
            if (chars[i + 1] == "{") {
                res += chars[i + 1];
                i++;
                continue;
            }
        }
        if (char == "{") {
            if (chars[i + 1] == "{") {
                let name: string = "";
                let j: int = 2;
                while (chars[i + j] != "}") {
                    name += chars[i + j];
                    j++;
                }

                if (chars[i + j + 1] != "}") {
                    res += char;
                    continue;
                }

                if (Object.keys(values).includes(name)) {
                    res += values[name];
                    i += j + 1;
                    continue;
                } else {
                    res += char;
                    continue;
                }
            }
        }

        res += char;
    }

    return res;
}