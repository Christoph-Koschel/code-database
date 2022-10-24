export class CostumeElements extends HTMLElement {
    constructor(name, self) {
        super();
        customElements.define(name, self);
    }
}
