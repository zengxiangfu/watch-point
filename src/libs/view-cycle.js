export default class WatchPoistCycle {
  constructor() {
    // 最后一次展示的url
    this.lastAppearUrl = null;
    this.envDetection();
  }

  // 环境检测
  envDetection() {
    try {
      if (
        typeof window !== "undefined" &&
        typeof window.addEventListener !== "undefined"
      ) {
        this.onPageShow();
        this.onPageHide();
      }
      if (
        typeof document !== "undefined" &&
        typeof document.addEventListener !== "undefined"
      ) {
        this.onVisibilityChangePageShow();
      }
    } catch (error) {
      console.log("error:", error);
    }
  }

  // document事件监听页面的显隐
  onVisibilityChangePageShow() {
    let hidden = "hidden";
    let visibilitychange = "visibilitychange";
    if (typeof document.hidden !== "undefined") {
      // Opera 12.10 and Firefox 18 and later support
      hidden = "hidden";
      visibilitychange = "visibilitychange";
    } else if (typeof document.msHidden !== "undefined") {
      hidden = "msHidden";
      visibilitychange = "msvisibilitychange";
    } else if (typeof document.mozHidden !== "undefined") {
      hidden = "mozHidden";
      visibilitychange = "mozvisibilitychange";
    } else if (typeof document.webkitHidden !== "undefined") {
      hidden = "webkitHidden";
      visibilitychange = "webkitvisibilitychange";
    }
    // 文档显隐事件
    const eventhandle = (event) => {
      if (document[hidden]) {
        this.onPageShowLogic(event);
      } else {
        this.onPageHideLogic(event);
      }
    };
    // 防止多次触发
    document.removeEventListener(visibilitychange, eventhandle);
    document.addEventListener(visibilitychange, eventhandle);
  }

  // window事件监听页面变化  onload 事件触发后初始化页面时触发 核心是页面的前进后退记录
  onPageShow() {
    const eventhandle = (event) => {
      this.onPageShowLogic(event);
    }
    window.removeEventListener("pageshow", eventhandle)
    window.addEventListener("pageshow", eventhandle);
  }
  // window事件监听页面变化  onload 事件触发后初始化页面时触发
  onPageHide() {
    const eventHandle = (event) => {
      this.onPageHideLogic(event);
    }
    window.removeEventListener("pagehide", eventHandle)
    window.addEventListener("pagehide", eventHandle);
  }

  // 页面展示逻辑处理
  onPageShowLogic(event) {
    // 相同地址不需要重新上报
    if (this.lastAppearUrl === location.href) return;
    // 传递数据
    typeof this.emitPageShowLogic === "function" &&
      this.emitPageShowLogic(event);
    this.lastAppearUrl = window.location.href;
  }

  // 页面隐藏逻辑
  onPageHideLogic(event) {
    typeof this.emitPageHideLogic === "function" &&
      this.emitPageHideLogic(event);
  }
}
