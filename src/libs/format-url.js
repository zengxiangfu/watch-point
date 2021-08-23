// 格式化请求链接  
export default function(baseUrl , config){
    // config为空或者非对象
    if(!config || typeof config !== 'object') return baseUrl
    // 拼接
    let params = [];
    for(let k in config){
        if(config.hasOwnProperty(k)){
            params.push(`${k}=${config[k]}`)
        }
    }

    return  baseUrl + '?' + params.join('&')
}