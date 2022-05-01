$(function () {
    // 点击去注册连接，隐藏login盒子显示reg盒子
    $("#link_reg").on("click", function () {
        $(".login-box").hide()
        $(".reg-box").show()
    })
    //点击去登录连接，隐藏reg盒子，显示login盒子
    $("#link_login").on("click", function () {
        $(".reg-box").hide()
        $(".login-box").show()
    })
    //利用layui自定义密码校验规则
    let form = layui.form
    
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        repwd: function (value) {
            //拿到密码框里的值
            let pwdval = $(".reg-box [name=password]").val()
            //将密码框的值和repwd框里的值进行比较
            if (value !== pwdval) {
                return "您前后输入的密码不一致"
            }
        }
    })
    const path_root = "http://api-breakingnews-web.itheima.net/"
    var layer = layui.layer;
    //监听注册表单的提交事件
    $("#form_reg").on("submit", function (e) {
        e.preventDefault()
        //表单发起post请求
        $.post("api/reguser", {
            username: $("#form_reg [name=username]").val(),
            password: $("#form_reg [name=password]").val()
        }, function (res) {
            if (res.status !== 0) {
                return layer.msg("注册失败："+res.message)
            }
            layer.msg("注册成功,请登路")
            //模拟人的点击行为，自动点击登录按钮
            $("#link_login").click()
        })
    })
    //监听登录表单的提交事件
    $("#form_login").on("submit",function(e){
        e.preventDefault()
        //通过ajax发送post请求
        $.ajax({
            url:"api/login",
            method:"POST",
            data:$(this).serialize(),
            success:function(res){
                if(res.status!==0){
                    return layer.msg("登录失败:"+res.message)
                }
                layer.msg("登录成功")
                //登录成功后用localStrage存储token字符串,http申请一些有权限的接口需要通过请求头Authorization把字符串传过去
                console.log(res.token)
                localStorage.setItem("token",res.token)
                //登录成功后跳转页面到index.html
                location.href="./index.html"
            }

        })
    })




})

