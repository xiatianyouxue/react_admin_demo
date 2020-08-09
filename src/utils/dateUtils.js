/*
包含n个日期时间处理的工具函数模块
*/

/*
  格式化日期formateDate
*/
export function formateDate(time) {
  const date = new Date(time)
  let Y = date.getFullYear() + '-';
  let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  let D = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  let h = date.getHours() + ':';
  let m = date.getMinutes() + ':';
  let s = date.getSeconds();
  return (Y + M + D + '  ' + h + m + s);
}

