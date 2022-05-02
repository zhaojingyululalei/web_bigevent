
$(function(){
    let layer=layui.layer
    
    let form = layui.form
    //表单验证
    form.verify({
        ncm:function(value){
            if(value.length>6){
                return "昵称格式不对"
            }
        }
    })
    //初始化表单
    inituserinfo(form)
    //重置
    $("#btnReset").on("click",function(e){
        e.preventDefault()
        inituserinfo(form)
    })
    //提交表单信息
    $(".layui-form").on("submit",function(e){
        e.preventDefault()
        $.ajax({
            method:"POST",
            url: "my/userinfo",
            data: $(this).serialize(),
            success: function(res){
                if(res.status!==0){
                    return layer.msg("提交失败!")
                }else{
                    layer.msg("提交成功!")
                }
            }
        })
    })
    //更新index界面的用户信息
    //当前是user界面，更改index界面的内容
    //user界面是index界面中的iframe，是index的子界面
    //调用父页面中的getUserInfo方法
    window.parent.getUserInfo()

})



function inituserinfo(form){
    $.ajax({
        method: "GET",
        url: "my/userinfo",
        success: function(res){
            if(res.status===1){
                layer.msg("获取用户信息失败！")
            } 
            // console.log(res.data)
            //layui内置方法给表单赋值
            form.val("formuserinfo",res.data)
        }
    })
}