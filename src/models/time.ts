class Time {

  hours: number

  minutes: number

  constructor(hours = 1, minutes = 0) {
    this.hours = hours
    this.minutes = minutes
  }

  setHours(hours: number) {
    if (hours < 0 || hours > 24) {
      return
    }

    this.hours = hours
  }

  getHours(): number {
    return this.hours
  }

  setMinutes(minutes: number) {
    if (minutes < 0 || minutes > 59) {
      return
    }

    this.minutes = minutes
  }

  getMinutes(): number {
    return this.minutes
  }

  getTimeToDisplay(): string {
    let hours = this.hours > 12 ? this.hours - 12 : this.hours
    let postfix = this.hours > 12 ? 'PM' : 'AM'
    const zero = this.minutes > 9 ? '' : '0'
    if (hours === 0) {
      hours = 12
      postfix = 'PM'
    }
    return `${hours}:${zero}${this.minutes} ${postfix}`
  }

  getDateObject(): Date {
    const date = new Date()
    date.setHours(this.hours)
    date.setMinutes(this.minutes)
    return date
  }
}

export default Time
