var baseURL = 'http://ajax.frontend.itheima.net'
$.ajaxPrefilter(function (option) {
    option.url = baseURL + option.url

    if (option.url.indexOf('/my/') !== -1) {
        option.headers = {
            Authorization: localStorage.getItem('token' || ''),
        }
    }

    //3.所有的请求完成后都要进行身份认证
    option.complete = function (res) {
        var data = res.responseJSON
        if (data.status == 1 && data.message == '身份认证失败！') {
            localStorage.removeItem('token')
            location.href = '/login.html'
        }
    }
})
