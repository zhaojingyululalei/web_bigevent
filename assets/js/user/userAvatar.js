$(function () {
    let layer = layui.layer
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)

    //上传按钮绑定点击事件
    $("#shangchuan").on("click", function (e) {
        //调用input的点击事件
        $("#file").click()
    })
    // 给input绑定change事件
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

    //给确定按钮绑定点击事件
    $("#upload").on("click", function (e) {

        let dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png')       // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
        console.log(dataURL)
            //点击确定按钮上传裁剪区的图片
        $.ajax({
            method: "POST",
            url: "my/update/avatar",
            data: {
                avatar: dataURL
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg("上传失败！")
                } else {
                    layer.msg("上传成功")
                    window.parent.getUserInfo()
                }
            }
        })
    })



})