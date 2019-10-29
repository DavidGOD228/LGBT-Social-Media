const strategyList = {
  __base: (derivedCtor, baseCtor, name) => derivedCtor[name] = baseCtor[name],
  events: (derivedCtor, baseCtor, name) => {
    if (derivedCtor[name] instanceof Array) {
      derivedCtor[name] = derivedCtor[name].concat(baseCtor[name])
    }
  },
  constructor: () => () => null
}

const copyStrategy = (name) => strategyList[name] || strategyList.__base

export const mixin = (baseCtors: any[]) => (derivedCtor: any) => {
  baseCtors.forEach(
    baseCtor => Object.getOwnPropertyNames(baseCtor.prototype)
                      .forEach(name => copyStrategy(name)(derivedCtor.prototype, baseCtor.prototype, name))
  )
}
