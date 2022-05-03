$(function() {
    getUserInfo()
    var layer = layui.layer
        //实现退出功能
    $('#btnLogout').on('click', function() {
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function(index) {
            //do something
            //1.清空localStorage
            localStorage.removeItem('token');
            //2.跳转到登录界面
            // location.href('./login.html')
            location.href = './login.html';
            //3.取消弹出框
            layer.close(index);
        });
    })
})

function getUserInfo() {
    $.ajax({
        method: 'get',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        //         // Authorization: localStorage.setItem('token') || '' 
        // },
        success: function(res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            }
            renderAvatar(res.data) //res.data对象里有username
        },

        // //不论成功与否，都会调用complete回调函数
        // complete: function(res) {
        //     // console.log("use complete func");
        //     // console.log(res);
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         localStorage.removeItem('token');
        //         location.href = './login.html'
        //     }
        // }

    })
}

function renderAvatar(user) {
    //1.确认用户名
    var name = user.nickname || user.username
        //2.欢迎信息
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
        //3.渲染对象
    if (user.user_pic != null) {
        //图片
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avater').hide()
    } else {
        //文本
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avater').html(first).show()
    }

}