/*
 * Linq is for performing fast selection of objects and array
 * With recalling functions the filter process should be simple and easy extensible
 */

import {int} from "./symbols";

interface ExecuteCallback<ItemType> {
    (x: ItemType, i: int): boolean;
}

interface ExpectCallback<ItemType> {
    (x: ItemType, i: int): boolean;
}

interface ReceiverCallback<ItemType, ReturnType> {
    (x: ItemType[]): ReturnType;
}

/*
 * Main method to init a new linq query
 */

export function select<ItemType>(items: ItemType[]) {
    items = items.slice();
    return constructTypeSection(items);
}


/*
 * Query type section
 * Select all, select first etc.?
 */

function constructTypeSection<ItemType>(items: ItemType[]) {
    return {
        first: () => first(items),
        all: () => all(items),
        last: () => last(items)
    };
}

function first<ItemType>(items: ItemType[]) {
    const receiver: ReceiverCallback<ItemType, ItemType> = (x) => x.shift();

    return {
        ...constructPrefixCondition<ItemType, ItemType>(items, receiver),
        ...constructConditionSection<ItemType, ItemType>(items, () => true, receiver),
        ...constructReturnSection<ItemType>(items.shift())
    }
}

function all<ItemType>(items: ItemType[]) {
    const receiver: ReceiverCallback<ItemType, ItemType[]> = (x) => x;

    return {
        ...constructPrefixCondition<ItemType, ItemType[]>(items, receiver),
        ...constructConditionSection<ItemType, ItemType[]>(items, () => true, receiver),
        ...constructReturnSection<ItemType[]>(items)
    }
}

function last<ItemType>(items: ItemType[]) {
    const receiver: ReceiverCallback<ItemType, ItemType> = (x) => x.pop();

    return {
        ...constructPrefixCondition<ItemType, ItemType>(items, receiver),
        ...constructConditionSection<ItemType, ItemType>(items, () => true, receiver),
        ...constructReturnSection<ItemType>(items.pop())
    }
}


/*
 * Query prefix condition
 * Must be the where true or false
 */

function constructPrefixCondition<ItemType, ReturnType>(items: ItemType[], receiver: ReceiverCallback<ItemType, ReturnType>) {
    return {
        not: () => not<ItemType, ReturnType>(items, receiver)
    }
}

function not<ItemType, ReturnType>(items: ItemType[], receiver: ReceiverCallback<ItemType, ReturnType>) {
    return constructConditionSection<ItemType, ReturnType>(items, () => false, receiver);
}


/*
 * Query condition section
 * When to select?
 */

function constructConditionSection<ItemType, ReturnType>(items: ItemType[], expect: ExpectCallback<ItemType>, receiver: ReceiverCallback<ItemType, ReturnType>) {
    return {
        where: (cb: ExecuteCallback<ItemType>) => where<ItemType, ReturnType>(items, cb, expect, receiver),
        until: (cb: ExecuteCallback<ItemType>) => until<ItemType, ReturnType>(items, cb, expect, receiver)
    }
}

function where<ItemType, ReturnType>(items: ItemType[],
                                     cb: ExecuteCallback<ItemType>,
                                     expect: ExpectCallback<ItemType>,
                                     receiver: ReceiverCallback<ItemType, ReturnType>) {
    let result: ItemType[] = [];

    for (let i = 0; i < items.length; i++) {
        let item = items[i];
        if (cb(item, i) == expect(item, i)) {
            result.push(item);
        }
    }

    return {
        ...constructReturnSection<ReturnType>(receiver(result))
    }
}

function until<ItemType, ReturnType>(items: ItemType[],
                                     cb: ExecuteCallback<ItemType>,
                                     expect: ExpectCallback<ItemType>,
                                     receiver: ReceiverCallback<ItemType, ReturnType>) {
    let result: ItemType[] = [];

    for (let i = 0; i < items.length; i++) {
        let item = items[i];
        if (cb(item, i) == expect(item, i)) {
            break;
        }

        result.push(item);
    }

    return constructReturnSection<ReturnType>(receiver(result));
}


/*
 * Query return result section
 * When to select?
 */

function constructReturnSection<ReturnType>(result: ReturnType) {
    return {
        toList: () => toList<ReturnType>(result),
        get: () => get<ReturnType>(result)
    };
}

function toList<ReturnType>(items: ReturnType): ReturnType[] {
    return [items];
}

function get<ReturnType>(items: ReturnType): ReturnType {
    return items;
}