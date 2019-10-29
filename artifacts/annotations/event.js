import eventEmitter from '../utils/event-emitter';
import serviceRegistry from '../services/base/-registry';
export const preEmit = (event) => (target, propertyKey, descriptor) => {
    console.log(target, propertyKey, `pre emitter for ${event}`);
    return Object.assign({}, descriptor, { value(...args) {
            eventEmitter.emit(event, ...args);
            return descriptor.value.apply(this, args);
        } });
};
export const postEmit = (event) => (target, propertyKey, descriptor) => {
    console.log(target, propertyKey, `post emitter for ${event}`);
    return Object.assign({}, descriptor, { value(...args) {
            const result = descriptor.value.apply(this, args);
            eventEmitter.emit(event, result);
            return result;
        } });
};
export const promiseEmit = (event) => (target, propertyKey, descriptor) => {
    console.log(target, propertyKey, `promise emitter for ${event}`);
    return Object.assign({}, descriptor, { value(...args) {
            return descriptor.value.apply(this, args)
                .then(res => {
                eventEmitter.emit(event, res);
                return res;
            });
        } });
};
export const onEvent = (event) => (target, method, descriptor) => {
    if (!target.events) {
        target.events = [];
    }
    target.events = [...target.events, {
            event,
            method
        }];
    console.log(target, method, descriptor, `register for ${event}`);
};
export const listener = (serviceName) => (target) => {
    if (!target.prototype.events) {
        return;
    }
    serviceRegistry.onReady((it) => {
        const service = it.get(serviceName);
        target.prototype.events.forEach(({ event, method }) => {
            eventEmitter.on(event, (...args) => service[method](...args));
        });
    });
};
//# sourceMappingURL=event.js.map