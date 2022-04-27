//获取Ajax提供的配置对象
$.ajaxPrefilter(function(options) {
    //在这个函数之前，统一经行拼接请求的根路径
    options.url = 'http://www.liulongbin.top:3007' + options.url
    console.log(options.url)

    //统一为有权限的接口，设置headers请求头
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    //全局挂载 complete 函数
    options.complete = function(res) {
        // console.log("use complete func");
        // console.log(res);
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            localStorage.removeItem('token');
            location.href = './login.html'
        }
    }
})