import {Disposable} from "./memory";

export class EventManager<Events extends string> extends Disposable {
    private eventHandler: Map<Events, Function[]>;

    public constructor() {
        super();
        this.eventHandler = new Map();
    }

    public on(ev: Events, cb: Function): void {
        if (this.disposed()) {
            throw "Cannot set event on a disposed object";
        }
        if (this.eventHandler.has(ev)) {
            this.eventHandler.get(ev).push(cb);
        } else {
            this.eventHandler.set(ev, [cb]);
        }
    }

    public emit(ev: Events, args: any[]): void {
        if (this.disposed()) {
            throw "Cannot emit events on a disposed object";
        }
        if (this.eventHandler.has(ev)) {
            this.eventHandler.get(ev).forEach((cb) => {
                cb(...args);
            });
        }
    }

    protected dispose() {
        super.dispose();

        this.eventHandler.clear();
    }
}