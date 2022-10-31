export function select(items) {
    items = items.slice();
    return constructTypeSection(items);
}
function constructTypeSection(items) {
    return {
        first: () => first(items),
        all: () => all(items),
        last: () => last(items)
    };
}
function first(items) {
    const receiver = (x) => x.shift();
    return {
        ...constructPrefixCondition(items, receiver),
        ...constructConditionSection(items, () => true, receiver),
        ...constructReturnSection(items.shift())
    };
}
function all(items) {
    const receiver = (x) => x;
    return {
        ...constructPrefixCondition(items, receiver),
        ...constructConditionSection(items, () => true, receiver),
        ...constructReturnSection(items)
    };
}
function last(items) {
    const receiver = (x) => x.pop();
    return {
        ...constructPrefixCondition(items, receiver),
        ...constructConditionSection(items, () => true, receiver),
        ...constructReturnSection(items.pop())
    };
}
function constructPrefixCondition(items, receiver) {
    return {
        not: () => not(items, receiver)
    };
}
function not(items, receiver) {
    return constructConditionSection(items, () => false, receiver);
}
function constructConditionSection(items, expect, receiver) {
    return {
        where: (cb) => where(items, cb, expect, receiver),
        until: (cb) => until(items, cb, expect, receiver)
    };
}
function where(items, cb, expect, receiver) {
    let result = [];
    for (let i = 0; i < items.length; i++) {
        let item = items[i];
        if (cb(item, i) == expect(item, i)) {
            result.push(item);
        }
    }
    return {
        ...constructReturnSection(receiver(result))
    };
}
function until(items, cb, expect, receiver) {
    let result = [];
    for (let i = 0; i < items.length; i++) {
        let item = items[i];
        if (cb(item, i) == expect(item, i)) {
            break;
        }
        result.push(item);
    }
    return constructReturnSection(receiver(result));
}
function constructReturnSection(result) {
    return {
        toList: () => toList(result),
        get: () => get(result)
    };
}
function toList(items) {
    return [items];
}
function get(items) {
    return items;
}
