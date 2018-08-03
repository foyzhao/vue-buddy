export const isValidMobileNumber = function (val) {
  return /^1[3-9][0-9]{9}$/.test(val)
};