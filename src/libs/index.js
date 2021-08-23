import request from "./request";
import { requestType } from "../utils/constant";
import formatUrl from "./format-url";
import ViewCycle from "./view-cycle";

/* 
    config:{
        pageShowHook(event, shouldSendRes): 页面展示   
            event:回调写入参数触发显示的事件名称 visibilitychange ｜ msvisibilitychange ｜ webkitvisibilitychange ｜ pageshow
            shouldSendRes: 是否应该提交数据

        pageHideHook(event)：页面隐藏   event： 回调写入参数触发显示的事件名称 visibilitychange ｜ msvisibilitychange ｜ webkitvisibilitychange ｜ page
        shouldSend   是否应该发送数据
        pageSign:    页面标识
        actionSign:  动作标识
        dataPool：   上报的数据
        requestType: 请求的方式 base | ajax
    }
 */

class WatchPoint {
  constructor(baseUrl, config) {
    this.config = config || { requestType: requestType.base, dataPool: {} };
    this.baseUrl = baseUrl;
    if (typeof baseUrl !== "string") {
      throw new Error("请配置正确的地址！！！");
    }
    this.init();
  }

  init() {
    this.watchPointCycle = new ViewCycle({});
    this.watchPointCycle.emitPageShowLogic = this.pageShowLogic.bind(this);
    this.watchPointCycle.emitPageHideLogic = this.pgeHideLogic.bind(this);
  }

  //   页面展示
  async pageShowLogic(event) {
    const shouldSendRes = await this.onShouldSend()
    this.config.pageShowHook && this.config.pageShowHook(event , shouldSendRes)
    if (shouldSendRes) {
      this.send(this.config.dataPool || {}, this.config.requestType);
    }
  }

  //   页面隐藏
  pgeHideLogic(event) {
    this.config.pageHideHook && this.config.pageHideHook(event)
  }

  //   发送数据
  dispatchSend() {
    this.send(this.dataPool);
  }

  //   是否应该发送数据
  async onShouldSend() {
    const { shouldSend = true } = this.config;
    let status = true;
    if (typeof shouldSend === "function") {
      status = await shouldSend();
    } else if (
      typeof shouldSend === "boolean" ||
      typeof shouldSend === "string"
    ) {
      status = shouldSend;
    }
    return Boolean(status);
  }

  //   钩子函数
  useHooks(hooks) {
    if (typeof hooks !== "object") {
      throw new Error("hooks 必须使用对象");
    }
    // 页面展示钩子
    "pageShowHook" in hooks
      ? (this.config.pageShowHook = hooks.pageShowHook)
      : "";
    // 页面隐藏钩子
    "pageHideHook" in hooks
      ? (this.config.pageHideHook = hooks.pageHideHook)
      : "";
    //   是否发送数据  页面展示后会调用该方法
    "shouldSend" in hooks
      ? (this.config.shouldSend = hooks.shouldSend)
      : (this.config.shouldSend = true);
  }

  // 上报地址
  setBaseUrl(url) {
    this.baseUrl = url;
  }

  // 发送
  send(params, type = requestType.base) {
    const body = { ...this.config.dataPool, ...params };
    const url = formatUrl(this.baseUrl ,body);
    request(url, type);
  }
}

export default WatchPoint;
