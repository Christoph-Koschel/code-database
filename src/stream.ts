import {char, int} from "./symbols";
import {EventManager} from "./event";
import {Disposable} from "./memory";


export class Stream extends Disposable {
    protected data: char[];
    protected closed: boolean;
    private lengthCount: int;

    public get length(): int {
        return this.lengthCount;
    }

    public constructor() {
        super();
        this.data = [];
        this.lengthCount = 0;
        this.closed = false;
    }

    protected resizeLength(): void {
        let length: int = 0;
        this.data.forEach(value => {
            length += value.length;
        });

        this.lengthCount = length;
    }

    protected close() {
        this.closed = true;
        this.dispose();
    }

    protected dispose(): void {
        super.dispose();

        this.data = [];
        this.resizeLength();
    }
}

export class WriteStream extends Stream {
    private events: EventManager<"close">;
    private pipes: WriteStream[];

    public constructor() {
        super();

        this.events = new EventManager<"close">();
        this.pipes = [];
    }

    public write(data: char): void {
        if (this.disposed()) {
            throw "Cannot write on closed stream";
        }
        this.data.push(data);
        this.resizeLength();
        this.pipes.forEach(pipe => {
            pipe.write(data);
        });
    }

    public close(): void {
        super.close();
        this.pipes = [];
        this.events.emit("close", []);
    }

    public pipe(stream: WriteStream): void {
        this.pipes.push(stream);
    }

    public on(ev: "close", cb: Function) {
        this.events.on(ev, cb);
    }

    public canWrite(): boolean {
        return this.closed;
    }
}

export class ReadStream extends Stream {
    private events: EventManager<"data" | "close">;
    private pipes: ReadStream[]
    private pointer: int;

    public constructor(data: char[]) {
        super();

        this.events = new EventManager<"data" | "close">();
        this.pipes = [];
        this.data = data;
        this.pointer = 0;
        this.resizeLength();
    }

    public read(): void {
        if (this.disposed()) {
            throw "Cannot write on closed stream";
        }
        let c: char = this.pointer >= this.length ? null : this.data[this.pointer];
        this.pointer++;
        this.events.emit("data", [c]);
        this.pipes.forEach(pipe => {
            pipe.read();
        });
    }

    public close(): void {
        super.close();
        this.pipes = [];
        this.events.emit("close", []);
    }

    public pipe(stream: ReadStream): void {
        this.pipes.push(stream);
    }

    public on(ev: "data" | "close", cb: Function) {
        this.events.on(ev, cb);
    }

    public canRead(): boolean {
        return this.closed || this.pointer >= this.length;
    }
}