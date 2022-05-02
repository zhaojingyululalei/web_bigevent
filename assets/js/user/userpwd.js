$(function () {
    //新密码和旧密码不一致，点击提交给出错误提示信息
    //给提交按钮绑定点击事件
    let form = layui.form
    let layer=layui.layer
    form.verify({
        pwd:function(value){
            if(value.length<6){
                return "密码等级太低，请重新设置"
            }
        }
    })
    $("#btnreset").on("click", function (e) {
        // e.preventDefault()
        //获取表单数据
        let formdata = form.val("formpwd")
        console.log(formdata)
        if(formdata.confirm_pwd!==formdata.newPwd){
            return layer.msg("您输入的密码前后不一致")
        }
    })
    // 提交
    $(".layui-form").on("submit",function(e){
        e.preventDefault()
        console.log("1223")
        $.ajax({
            method:"POST",
            url:"my/updatepwd",
            data:$(this).serialize(),
            success:function(res){
                if(res.status!==0){
                    return layer.msg("密码更新失败")
                }else{
                    layer.msg("密码更新成功!")
                    //清除token字符串
                    localStorage.removeItem("token")
                    //跳转登录页面  
                    // location.href="/login.html"错误做法
                    //到父页面中手动点击退出按钮
                    setTimeout(() => {
                        layer.msg("请重新登录")
                    }, 2000);
                    
                    setTimeout(() => {
                        window.parent.location.href="/login.html"
                    }, 4000);
                   
                }
            }
        })
    })



})