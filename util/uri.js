//获取url参数
function getParams(key) {
  const params = {};
  if (location.search) {
    let match, reg = /([^&=]+)=?([^&]*)/g;
    while (match = reg.exec(location.search.substr(1))) {
      params[match[1]] = decodeURIComponent(match[2].replace(/\+/g, ' '));
    }
  }
  return key ? params[key] : params;
}

export {
  getParams
}