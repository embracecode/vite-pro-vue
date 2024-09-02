export const getTime = () => {
  let msg = ''
  let hours = new Date().getHours()
  if (hours <= 9) {
    msg = '早上'
  } else if (hours <= 12) {
    msg = '上午'
  } else if (hours <= 18) {
    msg = '下午'
  } else {
    msg = '晚上'
  }
  return msg
}
// 对时间函数入参 参数归一化 
const _formtterNormalize = (formtter: any) => {
    if (typeof formtter === 'function') {
        return  formtter
    }
    if (typeof formtter !== 'string') {
        return new TypeError('formtter must be a function or string')
    }
    if (formtter === 'date') {
        formtter = 'yyyy-MM-dd'
    } else if (formtter === 'datetime') {
        formtter = 'yyyy-MM-dd HH:mm:ss'
    }
    return (dateInfo: any) => {
        const { yyyy, MM, dd, HH, mm, ss } = dateInfo
        return formtter.replace(/yyyy|MM|dd|HH|mm|ss/g, (match: string) => {
            if (match === 'yyyy') {
                return yyyy
            } else if (match === 'MM') {
                return MM
            } else if (match === 'dd') {
                return dd
            } else if (match === 'HH') {
                return HH
            } else if (match === 'mm') {
                return mm
            } else if (match === 'ss') {
                return ss
            }
        })
    }
}

type dateInfo = {
    year: string | number
    month: string | number
    day: string | number
    hour: string | number
    minute: string | number
    second: string | number
    yyyy?: string | number
    MM?: string | number
    dd?: string | number
    HH?: string | number
    mm?: string | number
    ss?: string | number
}
/**
 * 时间格式化
 * @param date 时间
 * @param formtter 格式化字符串
 * @param ispad 是否补0
 */
export const timeFormtter = (date: Date, formtter: any, ispad: boolean) => {
    formtter = _formtterNormalize(formtter)

    const dateInfo: dateInfo = {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate(),
        hour: date.getHours(),
        minute: date.getMinutes(),
        second: date.getSeconds()
    }
    dateInfo.yyyy = ispad ? dateInfo.year.toString().padStart(4, '0') : dateInfo.year
    dateInfo.MM = ispad ? dateInfo.month.toString().padStart(2, '0') : dateInfo.month
    dateInfo.dd = ispad ? dateInfo.day.toString().padStart(2, '0') : dateInfo.day
    dateInfo.HH = ispad ? dateInfo.hour.toString().padStart(2, '0') : dateInfo.hour
    dateInfo.mm = ispad ? dateInfo.minute.toString().padStart(2, '0') : dateInfo.minute
    dateInfo.ss = ispad ? dateInfo.second.toString().padStart(2, '0') : dateInfo.second
    return formtter(dateInfo)
}