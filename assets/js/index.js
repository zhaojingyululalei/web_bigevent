$(function () {

    getUserInfo()
    //给退出绑定点击事件
    $("#tuichu").on("click",function(e){
        layer.confirm('确定退出登录?', {icon: 3, title:'提示'}, function(index){
            //退出要做的事情
            //清除localStorage中的token字符串
            localStorage.removeItem("token")
            //回到登录页面
            location.href="../../login.html"
            layer.close(index);
          });
    })

})
function getUserInfo() { 
    $.ajax({
        method: "GET",
        url: "my/userinfo",
        success: function (res) {
            //
            if (res.status === 1) {
                return layui.layer.msg("获取用户信息失败！")
            }
            //成功获取用户信息后渲染头像
            renderAvatar(res.data)
        }
    })
}

//渲染用户头像
function renderAvatar(data) {
    //获取用户名
    let name = data.nickname || data.username
    //设置欢迎的文本
    $("#welcome").html("欢迎&nbsp;&nbsp;"+name)
    //渲染用户头像
    if(data.user_pic!==null){
        //渲染图片头像
        $(".layui-nav-img").prop("src",data.user_pic).show()
        $(".text-avatar").hide()

    }else{
        //渲染文本头像
        $(".layui-nav-img").hide()
        let first=name[0].toUpperCase()
        $(".text-avatar").html(first).show()

    }
}