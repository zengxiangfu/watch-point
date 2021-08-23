// 路由信息
export interface IRoutePage {
    route:string
    pageType:string
}

// 配置
export interface IConfig {
    baseUrl:string
    routeList:IRoutePage[]
    sendData:any
}