import {Memoize} from 'typescript-memoize'

export const memo = Memoize

function _debounce(func, wait: number, immediate?: boolean) {
  let timeout
  return function(...args) {
    const later = () => {
      timeout = null
      if (!immediate) {
        func.apply(this, args)
      }
    }
    const callNow = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow) {
      func.apply(this, args)
    }
  }
}

export const debounce = (delay: number) => (target: any, method: string, descriptor: PropertyDescriptor) => {
  console.log(target, method, `debounce for ${delay}`)
  return {
    ...descriptor,
    value: _debounce(descriptor.value, delay)
  }
}
