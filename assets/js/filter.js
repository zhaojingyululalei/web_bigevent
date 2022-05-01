//给所有请求添加过滤器，包括post get ajax都会经过这个过滤器的处理
$.ajaxPrefilter(function(options){//option就是请求的配置对象
    //让所有的url在过滤器中把路径拼接好
    options.url="http://api-breakingnews-web.itheima.net/"+options.url
    //给所有有请求权限的请求加请求头 /my开头的都是需要权限的
    if(options.url.indexOf("my/")!==-1){
        options.headers={
            Authorization: localStorage.getItem("token") || ""
        }
    }
    //挂载complete函数，只要身份验证失败就清空token跳转到login
    options.complete=function(res){
        if(res.responseJSON.status===1){
            //如果身份认证失败了
            //清空localStorag中的token
            localStorage.removeItem("token")
            //强制跳转到login页面
            location.href="../../login.html"
        }
    }

})