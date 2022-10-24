export abstract class CostumeElements extends HTMLElement {
    protected constructor(name: string, self: typeof CostumeElements) {
        super();

        // @ts-ignore
        customElements.define(name, self);
    }

    /**
     * browser calls this method when the element is added to the document
     * (can be called many times if an element is repeatedly added/removed)
     */
    public abstract connectedCallback();

    /**
     * browser calls this method when the element is removed from the document
     * (can be called many times if an element is repeatedly added/removed)
     */
    public abstract disconnectedCallback();

    /**
     * called when one of attributes listed above is modified
     * @param name
     * @param oldValue
     * @param newValue
     */
    public abstract attributeChangedCallback(name: string, oldValue: string, newValue: string);

    /**
     * called when the element is moved to a new document
     * (happens in document.adoptNode, very rarely used)
     */
    public abstract adoptedCallback();
}



