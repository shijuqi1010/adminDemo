$(function() {
    /**
     * 初始显示
     */
    showModule('area4');
    showContent('book/bookManage.html');
});

function showModule(areaId) {
    // 先隐藏全部模块的菜单
    $('#area1').hide();
    $('#area2').hide();
    $('#area3').hide();
    $('#area4').hide();

    // 显示当前模块
    $('#' + areaId).show();
}

/**
 * 显示页面核心区内容
*/
function showContent(url) {
    $.ajax({
        type: 'GET',
        url: url,
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        success: function (body) {
            $('#content').html(body);
        }
    });
}

