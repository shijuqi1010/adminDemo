var VUE_DATA;

$(function () {
    VUE_DATA = new Vue({
        el: '#box',
        data: {
            mydata: [],
            id: '',
            name: '',
            locate: '',
            introduce: '',
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
                    locate: this.locate,
                    introduce: this.introduce
                };
                // 提交到服务端
                $.ajax({
                    type: 'POST',
                    url: 'http://localhost:3000/books',
                    contentType: 'application/json',
                    data: JSON.stringify(param),
                    success: function (data) {
                        // 刷新列表
                        refreshGrid();
                    }
                });

                // this.mydata.push({
                //     name: this.name,
                //     locate: this.locate
                // });
                this.name = '';
                this.locate = '';
                this.introduce = '';
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
                        url: 'http://localhost:3000/books?ids=' + ids,
                        success: function (data) {
                            // 刷新列表
                            refreshGrid();
                        }
                    });
                } else {
                    $.ajax({
                        type: 'DELETE',
                        url: 'http://localhost:3000/books?ids=' + id,
                        success: function (data) {
                            // 刷新列表
                            refreshGrid();
                        }
                    });
                }
                
               $('input').prop('checked',false);//将input框设为非选中
            },

            modify: function () {
                // this.curItem.name = this.tempItem.name;
                // this.curItem.locate = this.tempItem.locate;
                var param = {
                    id: this.tempItem.id,
                    name: this.tempItem.name,
                    locate: this.tempItem.locate,
                    introduce: this.tempItem.introduce
                };
                // 提交到服务端
                $.ajax({
                    type: 'PUT',
                    url: 'http://localhost:3000/books',
                    contentType: 'application/json',
                    data: JSON.stringify(param),
                    success: function (data) {
                        // 刷新列表
                        refreshGrid();
                    }
                });
            },

            look: function () {
                // this.curItem.name = this.tempItem.name;
                // this.curItem.locate = this.tempItem.locate;
                var param = {
                    name: this.tempItem.name,
                    locate: this.tempItem.locate,
                    introduce: this.tempItem.introduce
                };
                // 提交到服务端
                $.ajax({
                    type: 'GET',
                    url: 'http://localhost:3000/books',
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
        url: 'http://localhost:3000/books',// 以后有了服务端 则改为服务端的URL，如GET: http://137.234.20.8:8090/library/books
        success: function (data) {
            VUE_DATA.mydata = JSON.parse(data);
        }
    });
}

// function selectRow(index) {
//     var result= $.inArray(index, VUE_DATA.curSelects);
//     if(result == -1) {
//         VUE_DATA.curSelects.push(index);
//     } else {
//         VUE_DATA.curSelects.remove(index);
//     }
// }

$(function () {
    //实现全选与反选  
    $("#allAndNotAll").click(function () {
        //debugger
        if (this.checked) {
            // $("input[name='items']:checkbox").each(function () {
            //     $(this).attr("checked", true);
            // });
            $("input[name='items']").prop("checked", "true");
        } else {
            $("input[name='items']").removeAttr('checked');
        }
    });

});  