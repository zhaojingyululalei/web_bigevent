//给所有请求添加过滤器，包括post get ajax都会经过这个过滤器的处理
$.ajaxPrefilter(function(options){//option就是请求的配置对象
    //让所有的url在过滤器中把路径拼接好
    options.url="http://api-breakingnews-web.itheima.net/"+options.url
})