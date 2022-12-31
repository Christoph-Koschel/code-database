export abstract class Disposable {
    private isDisposed: boolean;

    protected constructor() {
        this.isDisposed = false;
    }

    public disposed(): boolean {
        return this.isDisposed;
    }

    protected dispose(): void {
        this.isDisposed = true;
    }
}