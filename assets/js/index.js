$(function () {
    //获取用户信息
    getUserInfo()

    //退出登录
    var layer = layui.layer
    $('#btnLogout').on('click', function () {
        layer.confirm('是否确认退出', { icon: 3, title: '提示' }, function (
            index
        ) {
            layer.close(index)
            localStorage.removeItem('token')
            location.href = '/login.html'
        })
    })
})

//封装获取用户信息
function getUserInfo() {
    $.ajax({
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token' || ''),
        // },
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg(res.message)
            }
            renderUser(res.data)
        },
    })
}

//封装用户渲染数据
function renderUser(user) {
    var name = user.nickname || user.username
    $('#welcome').html('欢迎&nbsp;&nbsp' + name)
    if (user.user_pic !== null) {
        $('.layui-nav-img').show().attr('src', user.user_pic)
        $('.text-avatar').hide()
    } else {
        $('.text-avatar').show().html(name[0].toUpperCase())
        $('.layui-nav-img').hide()
    }
}
