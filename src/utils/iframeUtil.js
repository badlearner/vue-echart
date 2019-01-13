/**
 * 添加监听事件
 * @param {Object} element 事件的元素
 * @param {String} type 事件的类型
 * @param {Function} handler 事件触发的回调函数
 **/
export const addHandler = (element, type, handler) => {
  if (element.addEventListener) {
    element.addEventListener(type, handler, false)
  } else if (element.attachEvent) {
    element.attachEvent('on' + type, handler)
  } else {
    element['on' + type] = handler
  }
}

/**
 * 移除监听事件
 * @param {Object} element 事件的元素
 * @param {String} type 事件的类型
 * @param {Function} handler 事件触发的回调函数
 **/
export const removeHandler = (element, type, handler) => {
  if (element.removeEventListener) {
    element.removeEventListener(type, handler, false)
  } else if (element.detachEvent) {
    element.detachEvent('on' + type, handler)
  } else {
    element['on' + type] = null
  }
}

/**
 * iFrame dom 加载完成
 * @param {Object} element 事件的元素
 * @param {Object} message 发送的消息
 **/
export const sendMessage = (element, message) => {
  if (!element) {
    return
  }
  element.contentWindow.postMessage(message, document.location.origin)
  // element.contentWindow.postMessage(message, 'http://localhost:3000');

}

export const iFrame = window;

export const info = {
  XZQID: null,
  XZQMC: null,
  enterpriseName: null,
  enterpriseId: null,
  year: null,
  organizationCode: null
};

iFrame.echartLocateToMap = () => {
  return info;
};

iFrame.iFrameFunction = (args) => {
  if (args.click === 'mapPosition')
    document.getElementById("gisLocationMap").contentWindow.method.setEnterpriseLocate(args.info);
  else if (args.click === 'streetChart' || args.click === 'mapChart') {
    document.getElementById("gisLocationMap").contentWindow.method.setXZQ(args.info);
  }
};
