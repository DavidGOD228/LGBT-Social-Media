class Time {
    constructor(hours = 1, minutes = 0) {
        this.hours = hours;
        this.minutes = minutes;
    }
    setHours(hours) {
        if (hours < 0 || hours > 24) {
            return;
        }
        this.hours = hours;
    }
    getHours() {
        return this.hours;
    }
    setMinutes(minutes) {
        if (minutes < 0 || minutes > 59) {
            return;
        }
        this.minutes = minutes;
    }
    getMinutes() {
        return this.minutes;
    }
    getTimeToDisplay() {
        let hours = this.hours > 12 ? this.hours - 12 : this.hours;
        let postfix = this.hours > 12 ? 'PM' : 'AM';
        const zero = this.minutes > 9 ? '' : '0';
        if (hours === 0) {
            hours = 12;
            postfix = 'PM';
        }
        return `${hours}:${zero}${this.minutes} ${postfix}`;
    }
    getDateObject() {
        const date = new Date();
        date.setHours(this.hours);
        date.setMinutes(this.minutes);
        return date;
    }
}
export default Time;
//# sourceMappingURL=time.js.map