/**
 * 是否有效的手机号码
 */
export const isMobileNumber = function (str) {
  return /^1[3-9][0-9]{9}$/.test(str);
};

export default {
  isMobileNumber
}