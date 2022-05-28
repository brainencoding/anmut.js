class EventEmitter
{
    events = {};

    on(eventName, ...callbacks)
    {
        if (!callbacks) {
            this.events[eventName] = [];
            return;
        }
        this.events[eventName] = [...callbacks];
    }

    emit(eventName, ...args)
    {
        return (this.events &&
            this.events[eventName].length &&
            this.events[eventName].forEach((fn) =>
            {
                args.length
                    ? args.forEach((arg) =>
                    {
                        fn(arg);
                    })
                    : fn(undefined);
            }));
    }
}

export default new EventEmitter;