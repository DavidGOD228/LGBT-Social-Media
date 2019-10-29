import { lazyInject, lazyInjectNamed, lazyInjectTagged, lazyMultiInject } from '../utils/inversify.conf';
export const lazy = (name) => (target, key) => {
    lazyInject(name || Reflect.getMetadata('design:type', target, key).name)(target, key);
};
export const lazyNamed = (name) => (target, key) => {
    lazyInjectNamed(Reflect.getMetadata('design:type', target, key).name, name)(target, key);
};
export const lazyTagged = (tag, value) => (target, key) => {
    lazyInjectTagged(Reflect.getMetadata('design:type', target, key).name, tag, value)(target, key);
};
export const lazyMulti = () => (target, key) => {
    lazyMultiInject(Reflect.getMetadata('design:type', target, key).name)(target, key);
};
//# sourceMappingURL=inversify.js.map