const WEEKS = ['日', '一', '二', '三', '四', '五', '六'];
const MONTHS = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'];
const PATTERNS = {
  date: 'yyyy-MM-dd',
  time: 'HH:mm',
  datetime: 'yyyy-MM-dd HH:mm'
};

export const formatDate = function (date, pattern = 'date') {
  if (date === null || date === undefined) {
    return date
  }
  if (!(date instanceof Date)) {
    let timestamp = Date.parse(date);
    if (isNaN(timestamp)) {
      timestamp = Date.parse(date.replace(/-/g, '/'))
    }
    if (isNaN(timestamp)) {
      return 'Invalid Date'
    }
    date = new Date(timestamp)
  }
  pattern = PATTERNS[pattern] || pattern;
  const units = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours() % 12 === 0 ? 12 : date.getHours() % 12,
    'H+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'S': date.getMilliseconds()
  };
  if (/(y+)/.test(pattern)) {
    pattern = pattern.replace(RegExp.$1, date.getFullYear().toString().substr(4 - RegExp.$1.length))
  }
  if (/(E+)/.test(pattern)) {
    pattern = pattern.replace(RegExp.$1, (RegExp.$1.length > 1 ? (RegExp.$1.length > 2 ? '星期' : '周') : '') + WEEKS[date.getDay()])
  }
  if (/(MMM+)/.test(pattern)) {
    pattern = pattern.replace(RegExp.$1, MONTHS[date.getMonth()] + (RegExp.$1.length > 3 ? '月' : ''))
  }
  for (let key in units) {
    if (new RegExp(`(${key})`).test(pattern)) {
      pattern = pattern.replace(RegExp.$1, RegExp.$1.length === 1 ? units[key] : `00${units[key]}`.substr(`${units[key]}`.length))
    }
  }
  return pattern
};