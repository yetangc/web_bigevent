$(function() {
    $('#link-reg').on('click', function() {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    $('#link-login').on('click', function() {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    //从layui中获取form对象
    var form = layui.form
    var layer = layui.layer
        //调用form.verify()函数 自定义验证条件
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        repwd: function(value) {
            var pwd = $('.reg-box [name=password]').val()
            if (value !== pwd) {
                return "两次密码不一致！"
            }
        }
    })

    // 监听注册表单的提交事件
    $('#form_reg').on('submit', function(e) {
        //1.阻止默认的提交行为
        e.preventDefault()
            //2.发起Ajax的post请求
        var data = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
        }
        $.post('/api/reguser', data, function(res) {
            if (res.status !== 0) { //不等于0为真
                return layer.msg(res.message);
            }
            // console.log("注册成功！"); //等于0为成功
            layer.msg('注册成功，请登录！')
                //模拟人为点击
            $('#link-login').click()
        })
    })

    //监听登录表单的提交事件
    // $('#form_login').on('submit', function(e) {
    $('#form_login').submit(function(e) {
        //1.防止默认注册表单
        e.preventDefault()
            //2.发起post请求
        $.ajax({
            url: '/api/login',
            method: 'post',
            //3.快速获取表单内容
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败！')
                }
                layer.msg('登录成功！')
                    //4.将返回的token值保存在本地浏览器
                localStorage.setItem('token', res.token)
                    //5.跳转网页 index.html
                location.href = '/index.html'
            }
        })

    })
})