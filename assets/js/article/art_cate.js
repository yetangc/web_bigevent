$(function() {
    var layer = layui.layer
    var form = layui.form
    var indexAdd = null
    var indexEdit = null
    initArtCateList()

    function initArtCateList() {
        $.ajax({
            type: "get",
            url: "/my/article/cates",
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取数据失败！')
                }
                var htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
            }
        });
    }

    $('#btnAddCate').on('click', function() {
        indexAdd = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#dialog-add').html()
        });
    })

    //通过代理绑定提交事件
    $('body').on('submit', '#from-add', function(e) {
        e.preventDefault();
        $.ajax({
            type: "post",
            url: "/my/article/addcates",
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('新增文章分类失败！')
                }
                initArtCateList();
                layer.msg('新增文章分类成功！')
                layer.close(indexAdd)
            }
        });

    })


    $('body').on('click', '.btn-edit', function() {
        indexEdit = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '修改文章分类',
            content: $('#dialog-edit').html()
        });
        var id = $(this).attr('data-id');
        $.ajax({
            method: 'get',
            url: '/my/article/cates/' + id,
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取文章分类数据失败！')
                }
                form.val('from-edit', res.data)
            }
        })
    })

    //通过代理绑定提交事件
    $('body').on('submit', '#from-edit', function(e) {
            e.preventDefault();
            $.ajax({
                type: "post",
                url: "/my/article/updatecate",
                data: $(this).serialize(),
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg('更新分类数据失败！')
                    }
                    initArtCateList();
                    layer.msg('更新分类数据成功！')
                    layer.close(indexEdit)
                }
            });
        })
        // 删除
    $('body').on('click', '.btn-delete', function() {
        var id = $(this).attr('data-id');
        layer.confirm('确认删除?', {
            icon: 3,
            title: '提示'
        }, function(index) {
            $.ajax({
                type: "get",
                url: "/my/article/deletecate/" + id,
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg('删除文章分类失败！')
                    }
                }
            });
            initArtCateList()
            layer.msg('删除文章分类成功！')
            layer.close(index)
        })


    })

})