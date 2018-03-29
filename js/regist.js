/**
 * 注册页面，注册完成自动跳转到登录页面
*/
function regist() {
    var param = {
        name: $('#name').val(),
        password: $('#password').val()
    };
    $.ajax({
        type: 'POST',
        url: 'http://localhost:3000/regist',
        contentType: 'application/json',
        data: JSON.stringify(param),
        success: function (data) {
        //    if (data == 'SUCCESS') {
               window.location.href = 'login.html';
        //    } else {
        //        alert('用户名或密码错误');
        //    }
        }
    });
}

