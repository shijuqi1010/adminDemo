var VUE_DATA;

$(function () {
    VUE_DATA = new Vue({
        el: '#box',
        data: {
            mydata: [],
            id: '',
            name: '',
            password: '',
            tempItem: {},
            curItem: null,
            nowIndex: -100
        },
        methods: {
            refresh: function () {
                refreshGrid();
            },

            add: function () {
                var param = {
                    name: this.name,
                    password: this.password
                };
                // 提交到服务端
                $.ajax({
                    type: 'POST',
                    url: 'http://localhost:3000/vips',
                    contentType: 'application/json',
                    data: JSON.stringify(param),
                    success: function (data) {
                        // 刷新列表
                        refreshGrid();
                    }
                });

                this.name = '';
                this.password = '';
            },

            del: function (n, id) {
               if (n == -1) {// 删除选中项
                    var ids = [];
                    $('input:checkbox[name="items"]').each(function () {
                        if (this.checked) {
                            ids.push($(this).val());
                        }
                    });
                    $.ajax({
                        type: 'DELETE',
                        url: 'http://localhost:3000/vips?ids=' + ids,
                        success: function (data) {
                            // 刷新列表
                            refreshGrid();
                        }
                    });
                } else {
                    $.ajax({
                        type: 'DELETE',
                        url: 'http://localhost:3000/vips?ids=' + id,
                        success: function (data) {
                            // 刷新列表
                            refreshGrid();
                        }
                    });
                }
                
               $('input').prop('checked',false);//将input框设为非选中
            },

            modify: function () {
                var param = {
                    id: this.tempItem.id,
                    name: this.tempItem.name,
                    password: this.tempItem.password
                };
                // 提交到服务端
                $.ajax({
                    type: 'PUT',
                    url: 'http://localhost:3000/vips',
                    contentType: 'application/json',
                    data: JSON.stringify(param),
                    success: function (data) {
                        // 刷新列表
                        refreshGrid();
                    }
                });
            },

            look: function () {
                var param = {
                    name: this.tempItem.name,
                    password: this.tempItem.password
                };
                // 提交到服务端
                $.ajax({
                    type: 'GET',
                    url: 'http://localhost:3000/vips',
                    contentType: 'application/json',
                    data: JSON.stringify(param),
                    success: function (data) {
                        // 刷新列表
                        refreshGrid();
                    }
                });
            }
        }        
    });

    /**
     * 初始化数据
     */
    refreshGrid();
});

function refreshGrid() {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:3000/vips',
        success: function (data) {
            VUE_DATA.mydata = JSON.parse(data);
        }
    });
}

$(function () {
    //实现全选与反选  
    $("#allAndNotAll").click(function () {
        //debugger
        if (this.checked) {
            $("input[name='items']").prop("checked", "true");
        } else {
            $("input[name='items']").removeAttr('checked');
        }
    });
});  