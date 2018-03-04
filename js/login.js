/**
 * 登录并跳转到主页面
*/
function login() {
    var param = {
        name: $('#name').val(),
        password: $('#password').val()
    };
    $.ajax({
        type: 'POST',
        url: 'http://localhost:3000/login',
        contentType: 'application/json',
        data: JSON.stringify(param),
        success: function (data) {
           if (data == 'SUCCESS') {
               window.location.href = 'main.html';
           } else {
               alert('用户名或密码错误');
           }
        }
    });
}

function refreshGrid() {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:3000/books',// 以后有了服务端 则改为服务端的URL，如GET: http://137.234.20.8:8090/library/books
        success: function (data) {
            VUE_DATA.mydata = JSON.parse(data);
        }
    });
}

