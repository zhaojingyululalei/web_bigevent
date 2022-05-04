$(function () {
    let layer = layui.layer
    let form=layui.form
    //获取文章类别初始列表
    initArtCateList()
    //给添加按钮绑定点击事件
    let addindex;
    $("#addCate").on("click", function (e) {
        addindex = layer.open({
            type: 1,
            title: '添加文章分类',
            content: $("#dialog-add").html(),//拿到script中的标签结构
            area: ['500px', '250px']
        });
    })
    //给弹出层里的form表单绑定提交事件
    //由于弹出层中的页面元素是后渲染上去的，直接绑定肯定不行
    //利用事件委托，委托到body元素上
    $("body").on("submit", "#form_add", function (e) {
        e.preventDefault()
        //
        $.ajax({
            method: "POST",
            url: "my/article/addcates",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg("添加分类失败!")
                } else {
                    layer.msg("添加分类成功!")
                    initArtCateList()
                    layer.close(addindex)
                }
            }
        })
    })
    //给所有标记按钮绑定点击事件
    //由于是后渲染上去的采用事件委托
    //委托给tbody元素
    let editindex
    $("#tablebody").on("click", ".btn_edit", function (e) {
        editindex = layer.open({
            type: 1,
            title: '修改文章分类',
            content: $("#dialog-edit").html(),//拿到script中的标签结构
            area: ['500px', '250px']
        })
        // 给编辑弹出层的input框赋值
        let id = $(this).attr("data-id")
        // console.log(id)
        $.ajax({
            method: "GET",
            url: "my/article/cates/" + id,
            success: function (res) {
                if (res.status !== 0) {
                    layer.msg(res.message)
                }
                // console.log(res)
                //将结果渲染到编辑弹出层的表单上
                form.val("form_edit",res.data)
            }
        })
    })

    //给编辑弹出层表单绑定提交事件
    //委托给body
    $("body").on("submit","#form_edit",function(e){
        e.preventDefault()
        //根据id更新文章分类
        $.ajax({
            method:"POST",
            url:"my/article/updatecate",
            data:$(this).serialize(),
            success:function(res){
                if(res.status!==0){
                    return layer.msg("更新文章分类失败")
                }else{
                    layer.msg("更新文章分类成功")
                    //刷新列表
                    initArtCateList()
                    //关闭编辑层弹出框
                    layer.close(editindex)
                }
            }
        })
    })

    //为删除按钮建立弹出层
    $("#tablebody").on("click",".btn_delet",function(e){
        let id=$(this).attr("data-id")
        layer.confirm('确定删除?', {icon: 3, title:'提示'}, function(index){
            //点击确定就进行删除操作
            $.ajax({
                method:"GET",
                url:"my/article/deletecate/"+id,
                success:function(res){
                    if(res.status!==0){
                       return layer.msg("删除失败")
                    }
                    layer.msg("删除成功")
                    initArtCateList()
                }
            })
            layer.close(index);
          }); 
    })
    //出现询问框
    //点击确定发出ajax请求进行删除








    //获取文章类别初始列表
    function initArtCateList() {
        $.ajax({
            method: "GET",
            url: "my/article/cates",
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg("获取文章类别列表失败")
                }
                let htmlstr = template("tpl-table", res)
                $("#tablebody").html(htmlstr)
            }
        })
    }
})