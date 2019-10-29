import {
  lazyInject,
  lazyInjectNamed,
  lazyInjectTagged,
  lazyMultiInject
} from '../utils/inversify.conf'

export const lazy = (name: string) => (target: any, key: string) => {
  lazyInject(name || Reflect.getMetadata('design:type', target, key).name)(target, key)
}
export const lazyNamed = (name) => (target: any, key: string) => {
  lazyInjectNamed(Reflect.getMetadata('design:type', target, key).name, name)(target, key)
}
export const lazyTagged = (tag, value) => (target: any, key: string) => {
  lazyInjectTagged(Reflect.getMetadata('design:type', target, key).name, tag, value)(target, key)
}
export const lazyMulti = () => (target: any, key: string) => {
  lazyMultiInject(Reflect.getMetadata('design:type', target, key).name)(target, key)
}
