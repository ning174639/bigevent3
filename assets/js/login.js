$(function () {
    // 1.点击切换
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    $('#link_login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    // 2.定义表单验证
    var form = layui.form
    form.verify({
        pwd: [/^\S{6,12}$/, '密码6-12位且密码不能包含空格'],
        repwd: function (value) {
            if ($('#reg-pwd').val() !== value) {
                return '两次密码输入不一致'
            }
        },
    })

    // 3.注册功能
    var layer = layui.layer
    $('#form_reg').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            type: 'post',
            url: '/api/reguser',
            data: {
                username: $('#form_reg [name=username]').val(),
                password: $('#form_reg [name=password]').val(),
            },
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                $('#link_login').click()
                $('#form_reg')[0].reset()
            },
        })
    })

    //4.登录功能
    $('#form_login').submit(function (e) {
        e.preventDefault()
        $.ajax({
            type: 'post',
            url: '/api/login',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                localStorage.setItem('token', res.token)
                location.href = '/index.html'
            },
        })
    })
})
