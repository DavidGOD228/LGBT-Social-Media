import validateJS from 'validate.js'

export const validation = (object: object, constraints: object): any => validateJS(object, constraints)
