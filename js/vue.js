var TodoItem = function (title, desc) {
    this.title = title;
    this.desc = desc;
}
new Vue({
    el: '#app',
    data: {
        todolist:[],
        title:'',
        desc:''
    },
    methods:{
        addItem:function(){
            this.todolist.push(new TodoItem(this.title,this.desc))

            this.title=this.desc='';

            console.log(JSON.stringify(this.todolist));
        }
    }
})


/**
 * note提示框
 */
function notice() {
    var content = '这是一个提示框';
    NoteBox.note(content);
}
