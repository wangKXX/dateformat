/** 
 * @param date
 * date对象 
 */
function timeFormat(date) {
  let second = parseInt(date)// 秒
  let minute = 0// 分
  if (second > 60) {
    minute = parseInt(second / 60)
    second = parseInt(second % 60)
  }
  return `${minute.toString().padStart(2, 0)}:${second.toString().padStart(2, 0)}`
}
/** 
 * @param arr
 * 对象数组
 * @returns object
 */
function mergeObject(arr) {
  return Object.assign({}, ...arr)
}
export default {
  timeFormat,
  mergeObject
}