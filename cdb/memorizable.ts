class MemorizableCache {
    public readonly func: Function;
    public readonly cases: Map<any[], any>;

    public constructor(func: Function) {
        this.func = func;
        this.cases = new Map<any[], any>();
    }
}

export class Memorizable {
    private static boxes: MemorizableCache[] = [];
    
    public static check<T>(cb: Function, ...parameters: any[]): T {
        const box = this.boxes.first((box) => box.func == cb);
        if (box.cases.has(parameters)) {
            return box.cases.get(parameters);
        }

        let value: T = cb(...parameters);
        box.cases.set(parameters, value);
        return value;
    }  
}