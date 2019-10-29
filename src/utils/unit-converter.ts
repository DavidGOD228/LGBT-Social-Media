import convert from 'convert-units'

export interface UnitHeightImperial {
  ft: number
  inches: number
}

export default class UnitConverter {
  static heightImperialToMetric({ft, inches}: UnitHeightImperial) {
    return convert(Number(ft) * 12 + Number(inches))
      .from('in')
      .to('m')
  }

  static heightMetricToImperial(m): UnitHeightImperial {
    const inches = convert(m)
      .from('m')
      .to('in')
    return {
      ft: Math.floor(inches / 12),
      inches: Math.round(inches % 12)
    }
  }

  static heightMToCm(m) {
    return Math.round(convert(m)
      .from('m')
      .to('cm'))
  }

  static heightCmToM(cm) {
    return convert(cm)
      .from('cm')
      .to('m')
  }

  static weightImperialToMetric(lb) {
    return convert(lb)
      .from('lb')
      .to('kg')
  }

  static weightMetricToImperial(kg) {
    return Math.round(convert(kg)
      .from('kg')
      .to('lb'))
  }
}
