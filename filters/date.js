const week = ['日', '一', '二', '三', '四', '五', '六'];

const formatDate = function (date, pattern) {
  const o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours() % 12 === 0 ? 12 : date.getHours() % 12,
    'H+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'S': date.getMilliseconds()
  };
  if (/(y+)/.test(pattern)) {
    pattern = pattern.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  if (/(E+)/.test(pattern)) {
    pattern = pattern.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? '星期' : '周') : '') + week[date.getDay()])
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(pattern)) {
      pattern = pattern.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (`00${o[k]}`).substr((`${o[k]}`.length)))
    }
  }
  return pattern
};

export const dateFormatter = function (value, pattern = 'yyyy-MM-dd') {
  if (!value) {
    return value
  }
  if (typeof value === 'string') {
    value = new Date(value)
  }
  return formatDate(value, pattern)
};

export const timeFormatter = function (value, pattern = 'HH:mm') {
  return dateFormatter(value, pattern)
};

export const dateTimeFormatter = function (value, pattern = 'yyyy-MM-dd HH:mm') {
  return dateFormatter(value, pattern)
};