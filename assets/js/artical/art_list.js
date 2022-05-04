
$(function () {

    let layer = layui.layer
    let form = layui.form
    
    let laypage = layui.laypage
    //时间过滤器美化时间
    template.defaults.imports.dataFormat = function (date) {
        let dt = new Date(date)
        let y = dt.getFullYear()
        let m = padZero(dt.getMonth() + 1)
        let d = padZero(dt.getDate())

        let hh = padZero(dt.getHours())
        let mm = padZero(dt.getMinutes())
        let ss = padZero(dt.getSeconds())

        return y + "-" + m + "-" + d + " " + hh + ":" + mm + ":" + ss

    }

    function padZero(x) {
        if (x < 10) {
            return "0" + x
        }
    }

    let q = {
        pagenum: 1,//页码值
        pagesize: 2,//每页多少数据
        cate_id: "",//文章类别对应的id
        state: ""//文章的发布状态
    }
    initTable()
    initCate()

    //为筛选表单绑定提交事件
    $("#form_search").on("submit", function (e) {
        e.preventDefault()
        //获取表单的值
        let cate_id = $("[name=cate_id]").val()
        let state = $("[name=state]").val()
        //更新q
        q.cate_id = cate_id
        q.state = state
        //发送ajax请求更新经过筛选的文章列表
        initTable()
    })

    //点击删除按钮删除文章更新页面文章列表
    //当该页仅剩一条数据时，pagenum-1 如果为第1页就不变，更新q
    //调用inittable更新文章列表








    //从服务器获取文章列表数据
    function initTable() {
        $.ajax({
            method: "GET",
            url: "my/article/list",
            data: q,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg("获取文章列表失败")
                } else {
                    layer.msg("获取文章列表成功")
                    console.log(res)
                    //使用模板引擎渲染数据
                    let htmlstr = template("tpl-table", res)
                    $("#tablebody").html(htmlstr)
                    //渲染完数据列表后渲染分页区
                    renderpage(res.total)
                }
            }
        })
    }
    //初始化文章分类的方法
    function initCate() {
        $.ajax({
            method: "GET",
            url: "my/article/cates",
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg("获取文章分类列表失败")
                } else {
                    //模板引擎渲染分类列表
                    console.log(res)
                    let htmlstr = template("tpl-cate", res)
                    console.log(htmlstr)
                    $("[name=cate_id]").append(htmlstr)
                    //通知layui重新渲染表单结构
                    form.render()
                }
            }
        })
    }
    //渲染分页区的方法
    function renderpage(total) {
        laypage.render({
            elem: "pageBox",//分页容器id
            count: total,//总数据条数
            limit: q.pagesize,//每页显示几条数据
            curr: q.pagenum,//默认起始页
            layout:['count','limit','prev', 'page', 'next','skip'],
            limits:[2,3,5,10],
            jump:function(obj,first){
                console.log(obj.curr)
                q.pagenum=obj.curr
                q.pagesize=obj.limit
                // initTable()
                if(!first){
                    initTable()
                }
            }
        })
    }


})