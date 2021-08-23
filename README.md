## 引入方式

```
npm i watch-point -S
```

## 参数配置

```
config:{
 	pageShowHook(event, shouldSendRes): 页面展示
		event:回调写入参数触发显示的事件名称 visibilitychange ｜ msvisibilitychange ｜ webkitvisibilitychange ｜ pageshow
		shouldSendRes: 是否应该提交数据

	pageHideHook(event)：页面隐藏   
		event： 回调写入参数触发显示的事件名称 visibilitychange ｜ 			msvisibilitychange ｜ webkitvisibilitychange ｜ page
	shouldSend   是否应该发送数据 true:发送  false：不发送
	pageSign:    页面标识
	actionSign:  动作标识
	dataPool：   上报的数据
	requestType: 请求的方式 base | ajax
}
```

## 使用方式

```
const wp = new WatchPoint('baseurl',{
    dataPool:{
        //...上报参数. 全局基础数据
    }
})

// 手动上报 上报的数据dataPool = { ...dataPool , ...params}
wp.send(params , requestType)

//修改上报地址
wp.setBaseUrl(url)

//事件回调
wp.useHooks({
    pageShowHook,
    pageHideHook,
    shouldSend
})


function shouldSend(){
    return true
}

function pageShowHook(event){
    console.log('pageB --- pageShowHoos',event);
}

function pageHideHook(event){
    console.log('pageB --- pageHideHoos',event);
}
```