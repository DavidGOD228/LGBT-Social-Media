import { Memoize } from 'typescript-memoize';
export const memo = Memoize;
function _debounce(func, wait, immediate) {
    let timeout;
    return function (...args) {
        const later = () => {
            timeout = null;
            if (!immediate) {
                func.apply(this, args);
            }
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) {
            func.apply(this, args);
        }
    };
}
export const debounce = (delay) => (target, method, descriptor) => {
    console.log(target, method, `debounce for ${delay}`);
    return Object.assign({}, descriptor, { value: _debounce(descriptor.value, delay) });
};
//# sourceMappingURL=eval.js.map