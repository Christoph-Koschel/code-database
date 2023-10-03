declare global {
    interface Object {
        clone();
    }    
}

Object.prototype.clone = function<R>(): R {
    let obj = {};

    Object.keys(this).forEach((key) => {
        if (typeof this[key] == "object") {
            obj[key] = this[key].clone();
        } else {
            obj[key] = this[key];
        }
    });

    return obj as R;
}



export {};