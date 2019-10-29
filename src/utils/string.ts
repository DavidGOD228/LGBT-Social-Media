const STRING_DASHERIZE_REGEXP = (/[ _]/g)
const STRING_DECAMELIZE_REGEXP = (/([a-z\d])([A-Z])/g)

export const dasherize = (str: string): string => decamelize(str)
  .replace(STRING_DASHERIZE_REGEXP, '-')

export const decamelize = (str: string, separator: string = '_'): string =>
  str.replace(STRING_DECAMELIZE_REGEXP, '$1' + separator + '$2')
     .toLowerCase()

export const capitalize = (str: string): string => str.charAt(0)
                                                      .toUpperCase() + str.slice(1)

export const generateUUID = (): string => Math.random()
                                              .toString(36)
                                              .substring(2)
  + (new Date()).getTime()
                .toString(36)
