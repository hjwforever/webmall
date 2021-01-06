// 构建随机时间
function buildRandomDate(year) {
  if (!year) {
    year = Math.floor(Math.random() * 10) + 2010
  }
  const month = Math.floor(Math.random() * 12)
  const day = Math.floor(Math.random() * 30)
  const hour = Math.floor(Math.random() * 24)
  const minute = Math.floor(Math.random() * 60)
  const second = Math.floor(Math.random() * 60)
  return new Date(year, month, day, hour, minute, second)
}

function diffTime(dateStart) {
  // const dateBegin = new Date(dateStart.replace(/-/g, '/'))
  let diff = ''
  let postfix = ''
  if (typeof dateStart !== 'object') {
    dateStart = new Date(dateStart)
  }
  const dateEnd = new Date()// 获取当前时间
  const dateDiff = dateEnd.getTime() - dateStart.getTime()// 时间差的毫秒数
  const dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000))// 计算出相差天数

  // 相差的月份
  const monthDiff = Math.floor(dayDiff / 30)
  // 相差的年份
  const yearDiff = Math.floor(monthDiff / 12)
  // 计算出相差小时数
  const leave1 = dateDiff % (24 * 3600 * 1000) // 计算天数后剩余的毫秒数
  const hours = Math.floor(leave1 / (3600 * 1000))// 计算出小时数
  // 计算相差分钟数
  const leave2 = leave1 % (3600 * 1000) // 计算小时数后剩余的毫秒数
  const minutes = Math.floor(leave2 / (60 * 1000))// 计算相差分钟数
  // 计算相差秒数
  // const leave3 = leave2 % (60 * 1000) // 计算分钟数后剩余的毫秒数
  // const seconds = Math.round(leave3 / 1000) // 计算相差秒数
  // console.log(` 相差 ${yearDiff >= 1 ? yearDiff + '年' : monthDiff >= 1 ? monthDiff + '月' : dayDiff + '天'}  ${hours}小时 ${minutes}分钟 ${seconds}秒 `)
  if (yearDiff >= 1) {
    diff = yearDiff + ' year'
  } else if (monthDiff >= 1) {
    diff = monthDiff + ' month'
  } else if (dayDiff >= 1) {
    diff = dayDiff + ' day'
  } else if (hours >= 1) {
    diff = hours + ' hour'
  } else if (minutes >= 1) {
    diff = minutes + ' minute'
  } else return 'now'

  if ([yearDiff, monthDiff, dayDiff, hours, minutes].indexOf(1) === -1) {
    postfix = 's ago'
  } else postfix = ' ago'

  return diff + postfix
}

// 获取当前月份的天数
function getDays() {
  const date = new Date()
  const year = date.getFullYear()// 获取年份
  const mouth = date.getMonth() + 1// 获取当前月份
  let days // 定义当月的天数；
  if (mouth === 2) { // 当月份为二月时，根据闰年还是非闰年判断天数
    days = year % 4 === 0 ? 29 : 28
  } else if ([1, 3, 5, 7, 8, 10, 12].includes(mouth)) { // 月份为：1,3,5,7,8,10,12 时，为大月.则天数为31；
    days = 31
  } else { // 其他月份，天数为：30.
    days = 30
  }
  return days
}

export default {
  buildRandomDate,
  diffTime: diffTime,
  getDays
}
