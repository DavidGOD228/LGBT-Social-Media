import convert from 'convert-units';
export default class UnitConverter {
    static heightImperialToMetric({ ft, inches }) {
        return convert(Number(ft) * 12 + Number(inches))
            .from('in')
            .to('m');
    }
    static heightMetricToImperial(m) {
        const inches = convert(m)
            .from('m')
            .to('in');
        return {
            ft: Math.floor(inches / 12),
            inches: Math.round(inches % 12)
        };
    }
    static heightMToCm(m) {
        return Math.round(convert(m)
            .from('m')
            .to('cm'));
    }
    static heightCmToM(cm) {
        return convert(cm)
            .from('cm')
            .to('m');
    }
    static weightImperialToMetric(lb) {
        return convert(lb)
            .from('lb')
            .to('kg');
    }
    static weightMetricToImperial(kg) {
        return Math.round(convert(kg)
            .from('kg')
            .to('lb'));
    }
}
//# sourceMappingURL=unit-converter.js.map