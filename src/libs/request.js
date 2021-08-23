import { requestType } from "../utils/constant";

// 基本请求方式
function baseRequest(url) {
  if (typeof navigator !== "undefined" && navigator && navigator.sendBeacon) {
    // 成功把数据加入传输队列时，sendBeacon() 方法将会返回 true，否则返回 false , 异步传输到Web服务器
    navigator.sendBeacon(url);
  } else {
    throw new Error("navigator.sendBeacon 不支持");
  }
}

// ajax请求
function ajaxRequest(url) {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", url, false);
  xhr.send();
}

// 使用图片的方式请求
function imgRequest(url) {
  // 容易出现页面跳转数据未发送，埋点遗漏上报
  const img = new Image();
  img.src = url;
}

// 数据请求上报
export default function request(url, type = requestType.base) {
  try {
    if (type === requestType.base) {
      baseRequest(url);
    } else if (type === requestType.ajax) {
      ajaxRequest(url);
    }
  } catch (error) {
    imgRequest(url);
  }
}
