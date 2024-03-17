import { DateTime } from "luxon";

class Helper {
  static isValidEmail(email: string) {
    const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return regexp.test(email);
  }

  static dateToString(date: string, format?: string) {
    if (!date) return ""
    const result = DateTime.fromISO(date).toFormat(format ? format : 'dd-MM-yyyy')
    return result
  }
  static dateToDate(date: Date, format?: string) {
    if (!date) return ""
    const result = DateTime.fromJSDate(date).toFormat(format ? format : 'dd-MM-yyyy')
    return result
  }

  static dateToMillis(date: Date) {
    if (!date) return 0
    const result = DateTime.fromJSDate(date).toMillis()
    return result
  }

  static dateStringToString(date: string, format?: string) {
    if (!date) return ""
    const result = DateTime.fromSQL(date).toFormat(format ? format : 'dd-MM-yyyy')
    return result
  }
}

export default Helper