/**
 * 整数千分位格式化
 * @param {Number} value 需要转换的值
 **/
export const formatInt = value => {
  if (!value) return '0';
  var t = parseInt(value),
    i,
    r;
  for (t = t.toString().replace(/^(\d*)$/, "$1."),
         t = (t + "00").replace(/(\d*\.\d\d)\d*/, "$1"),
         t = t.replace(".", ","), i = /(\d)(\d{3},)/; i.test(t);) {
    t = t.replace(i, "$1,$2");
  }
  return t = t.replace(/,(\d\d)$/, ".$1"), r = t.split("."), r[1] == "00" && (t = r[0]), t
};

/**
 * 金额千分位格式化 同时保留小数
 * @param {Number} num 需要转换的值
 **/
export const formatAmount = num => {
  if (!num)
    num = "0";
  num = num.toString().replace(/\$|\,/g, '');
  var sign = (num == (num = Math.abs(num)));
  num = Math.floor(num * 100 + 0.50000000001);
  var cents = num % 100;
  num = Math.floor(num / 100).toString();
  if (cents < 10)
    cents = "0" + cents;
  for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
    num = num.substring(0, num.length - (4 * i + 3)) + ',' +
      num.substring(num.length - (4 * i + 3));
  return (((sign) ? '' : '-') + num + '.' + cents);
};

export default {
  formatAmount: formatAmount,
  formatInt: formatInt
}
