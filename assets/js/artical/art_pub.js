

$(function () {

    let layer = layui.layer
    let form = layui.form
    //模板引擎更新选择框
    initCate()
    // 初始化富文本编辑器
    initEditor()
    // 图片区操作
    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)
    //4.实现更换剪裁图片
    //给选择封面按钮绑定点击事件
    $("#btn-selectCover").on("click", function (e) {
        $("#file").click()
    })
    $("#file").on("change", function (e) {
        //获取用户选择的文件列表
        let filelist = e.target.files
        if (filelist.length === 0) {
            //如果用户没有选择任意文件
            return layer.msg("请选择图片")
        } else {
            //如果用户选择了图片就更换裁剪图片
            var file = e.target.files[0]
            var newImgURL = URL.createObjectURL(file)
            $image
                .cropper('destroy')      // 销毁旧的裁剪区域
                .attr('src', newImgURL)  // 重新设置图片路径
                .cropper(options)        // 重新初始化裁剪区域
        }
    })

    //发布和存草稿的操作
    let state = "草稿"//文章状态默认为草稿
    // 为提交表单按钮绑定点击事件
    $("#btn-pub").on("click", function (e) {
        //只要点击已发布按钮那么就将文章状态改为已发布
        state = "已发布"
    })
    //为form表单绑定提交事件
    $("#B_form").on("submit", function (e) {
        e.preventDefault()
        //准备数据
        let fd = new FormData($(this)[0])
        //追加文章状态
        fd.append("state", state)
        //追加封面文件
        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function (blob) {       // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                // 将该文件对象追加到表单数据中
                fd.append("cover_img", blob)
            })

        // 手动提交数据
        $.ajax({
            method: "POST",
            url: "my/article/add",
            data: fd,
            contentType: false,
            processData: false,
            success: function (res) {
                console.log(res)
                if (res.status !== 0) {
                    return layer.msg("上传数据到后台失败！")
                } else {
                    layer.msg("文章:" + state)
                    //重置所有表单
                    //手动点击隐藏的重置按钮
                    // $("#btn-reset").click()
                    //自动跳转到文章列表区查看新发布的文章
                    // location.href="/artical/art_list.html"
                }
            }
        })
    })








    //模板引擎更新选择框的方法
    //发送ajax请求获取文章类别列表
    function initCate() {
        $.ajax({
            method: "GET",
            url: "my/article/cates",
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg("获取文章分类列表失败！")
                } else {
                    // console.log(res)
                    //模板引擎填充数据
                    let htmlstr = template("tpl-selectCate", res)
                    $("[name=cate_id]").append(htmlstr)
                    form.render()
                }
            }
        })
    }



})