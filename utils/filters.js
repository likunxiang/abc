var filters = {
  toFix: function (value,n) {
    return Math.round(value * Math.pow(10, n)) / Math.pow(10, n) 
  },
  // 保留1位小数
  toFix1:function (value) {
  
  	  return  Number(value).toFixed(1)
  },
  toStr: function (value) {
    return value.toString()
  },
  toNum: function (value) {
    return value.toNumber()
  },
  // 四舍五入取整
  mathRound:function(value){
    return Math.round(value)
  },
  // 取整
  parseInt:function(value){
    return parseInt(value);
  },
  // 字符串截取
  substring:function(value,end){
	  value = String(value)
	  if(value && value.length>end) {
		  return value.substring(0,end) + '...';
	  } else {
		   return value.substring(0,end);
	  }
    
  },
  slice:function(value,end){
    return value.slice(0,end);
  },
  // 价格样式
  priceStr: function (value) {
	  var result = ('' + value).split('.')
	  return result
  }
}

module.exports = {
  toFix: filters.toFix,
  toFix1: filters.toFix1,
  toStr: filters.toStr,
  toNum: filters.toNum,
  mathRound: filters.mathRound,
  parseInt: filters.parseInt,
  substring: filters.substring,
  slice: filters.slice,
  priceStr: filters.priceStr
}