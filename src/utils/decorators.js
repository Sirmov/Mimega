// Curring functions used to make handlers

export function createSubmitHandler(ctx, handler, allowedData) {
    return function (event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const formEntries = [...formData.entries()];
        let data;

        if (allowedData !== undefined) {
            data = formEntries.reduce((a, [k, v]) => (allowedData.includes(k) ? Object.assign(a, { [k]: v }) : a), {});
        } else {
            data = Object.fromEntries(formData);
        }

        handler(ctx, data, event);
    };
}

export function createEventHandler(ctx, handler) {
    return function (event) {
        event.preventDefault();
        handler(ctx, event);
    };
}
