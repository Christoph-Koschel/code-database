import {StorageType} from "./symbols";

class Storage {
    private store: { [Key in StorageType]: globalThis.Storage };

    public constructor(store: { [Key in StorageType]: globalThis.Storage }) {
        this.store = store;
    }

    public setItem(key: string, value: string, type: StorageType): void {
        this.store[type].setItem(key, value);
    }

    public getItem(key: string, type: StorageType): string | null {
        return this.store[type].getItem(key);
    }

    public hasItem(key: string, type: StorageType): boolean {
        return this.getItem(key, type) != null;
    }

    public clear(type: StorageType): void {
        this.store[type].clear();
    }
}

export const storage: Storage = new Storage({
    local: localStorage,
    session: sessionStorage
});