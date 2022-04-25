//获取Ajax提供的配置对象
$.ajaxPrefilter(function(options) {
    //在这个函数之前，统一经行拼接请求的根路径
    options.url = 'http://www.liulongbin.top:3007' + options.url
    console.log(options.url)
})