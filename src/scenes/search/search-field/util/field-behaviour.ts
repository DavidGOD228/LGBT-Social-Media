import i18n from '../../../../locales/i18n'
import UnitConverter, {UnitHeightImperial} from '../../../../utils/unit-converter'

const UPDATE_STRATEGY = {
  CHECK_BOX: (context, searchField, restrictionMap) => (value) => {
    restrictionMap[searchField.path] = {
      field: searchField.path,
      values: value,
      operator: 'In'
    }
    context.forceUpdate()
  },
  CHECK_BOX_CUSTOM: (context, searchField, restrictionMap) => (value) => {
    restrictionMap[searchField.path] = {
      field: searchField.path,
      values: value,
      operator: 'In'
    }
    context.forceUpdate()
  },
  RADIO_BUTTON: (context, searchField, restrictionMap) => (value) => {
    restrictionMap[searchField.path] = {
      field: searchField.path,
      values: value,
      operator: 'In'
    }
    context.forceUpdate()
  },
  RADIO_BUTTON_CUSTOM: (context, searchField, restrictionMap) => (value) => {
    restrictionMap[searchField.path] = {
      field: searchField.path,
      values: value,
      operator: 'In'
    }
    context.forceUpdate()
  },
  TEXT: (context, searchField, restrictionMap) => (value) => {
    restrictionMap[searchField.path] = {
      field: searchField.path,
      values: [value],
      operator: 'Like'
    }
    context.forceUpdate()
  },
  BOOLEAN: (context, searchField, restrictionMap) => (value) => {
    restrictionMap[searchField.path] = {
      field: searchField.path,
      values: [value],
      operator: 'In'
    }
    context.forceUpdate()
  },
  DATE: (__, searchField, restrictionMap) => (value) => {
    const dateStart = new Date()
    const dateEnd = new Date()
    dateEnd.setFullYear(dateEnd.getFullYear() - value[0])
    dateStart.setFullYear(dateStart.getFullYear() - value[1])
    restrictionMap[searchField.path] = {
      field: searchField.path,
      values: [+dateStart, +dateEnd],
      operator: 'Between'
    }

  },
  NUMBER: (__, searchField, restrictionMap, userMetrics) => (value) => {
    if (searchField.name === 'HeightRange') {
      if (userMetrics === 'Imperial') {
        const from = UnitConverter.heightImperialToMetric({ft: value[0], inches: 0} as UnitHeightImperial)
        const to = UnitConverter.heightImperialToMetric({ft: value[1], inches: 0} as UnitHeightImperial)
        value = [from, to]
      }

      if (userMetrics === 'Metric') {
        const from = value[0] / 100
        const to = value[1] / 100
        value = [from, to]
      }
    }

    if (searchField.name === 'WeightRange' && userMetrics === 'Imperial') {
      const from = UnitConverter.weightImperialToMetric(value[0])
      const to = UnitConverter.weightImperialToMetric(value[1])
      value = [from, to]
    }

    restrictionMap[searchField.path] = {
      field: searchField.path,
      values: value,
      operator: 'Between'
    }
  }
}

const VALUES_STRATEGY = {
  CHECK_BOX: (searchField, restrictionMap) => {
    return (restrictionMap[searchField.path] && restrictionMap[searchField.path].values) || []
  },
  CHECK_BOX_CUSTOM: (searchField, restrictionMap) => {
    return (restrictionMap[searchField.path] && restrictionMap[searchField.path].values) || []
  },
  RADIO_BUTTON: (searchField, restrictionMap) => {
    return (restrictionMap[searchField.path] && restrictionMap[searchField.path].values) || []
  },
  RADIO_BUTTON_CUSTOM: (searchField, restrictionMap) => {
    return (restrictionMap[searchField.path] && restrictionMap[searchField.path].values) || []
  },
  TEXT: (searchField, restrictionMap) => {
    const restriction = restrictionMap[searchField.path]
    return (restriction && restriction.values.toString())
  },
  BOOLEAN: (searchField, restrictionMap) => {
    const restriction = restrictionMap[searchField.path]
    return restriction && restriction.values.toString() === 'true'
  },
  DATE: (searchField, restrictionMap) => {
    const restriction = restrictionMap[searchField.path]

    if (!restriction) {
      return [25, 55]
    }
    const now = new Date()
    return [
      now.getFullYear() - new Date(restriction.values[1]).getFullYear(),
      now.getFullYear() - new Date(restriction.values[0]).getFullYear()
    ]
  },
  NUMBER: (searchField, restrictionMap, userMetric) => {
    const restriction = restrictionMap[searchField.path]
    if (!restriction) {
      return DEFAULTVALUES[searchField.name][userMetric]
    }
    return restriction.values
  }
}

const OPTIONS = {
  CHECK_BOX: (searchField) => ({options: searchField.field.fieldValues}),
  CHECK_BOX_CUSTOM: (searchField) => ({
    options: searchField.field.fieldValues,
    field: searchField.field
  }),
  RADIO_BUTTON: (searchField) => ({options: searchField.field.fieldValues}),
  RADIO_BUTTON_CUSTOM: (searchField) => ({
    options: searchField.field.fieldValues,
    field: searchField.field
  }),
  TEXT: (searchField) => ({placeholder: i18n.t('search.' + searchField.path)}),
  BOOLEAN: (searchField) => ({fieldName: i18n.t('search.' + searchField.path)}),
  DATE: () => ({
    min: 18,
    max: 80
  }),
  NUMBER: (searchField, userMetric) => {
    return OPTIONVALUES[searchField.name][userMetric]
  }
}

const OPTIONVALUES = {
  WeightRange: {
    Imperial: {
      min: 50,
      max: 400
    },
    Metric: {
      min: 23,
      max: 181
    }
  },
  HeightRange: {
    Imperial: {
      min: 3,
      max: 8
    },
    Metric: {
      min: 91,
      max: 244
    }
  }
}

const DEFAULTVALUES = {
  WeightRange: {
    Imperial: [80, 120],
    Metric: [36, 54]
  },
  HeightRange: {
    Imperial: [4, 6],
    Metric: [122, 183]
  }
}

export default {
  UPDATE_STRATEGY,
  VALUES_STRATEGY,
  OPTIONS
}
