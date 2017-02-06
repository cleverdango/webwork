//Vue 聊天内容
var content = new Vue({
    el: '#content',
    data: {
        messagelist: [
            { id: '', message: '' }
        ]
    }
});

var socket = io();
socket.on('message', function(message) {
    content.messagelist.unshift(message);
});

function sendMessage() {
    var newid = "";
    var newmessage = "";

    newid = $('#chatID').val();
    newmessage = $('#chatwindow').val().trim();

    var message = { id: newid, message: newmessage };
    socket.emit('message', message);
    content.messagelist.unshift(message);

    // 清空聊天窗口
    $('#chatwindow').val('');
}


//按下回车触发事件：发送聊天内容
$("#chatwindow").keyup(function(event) {
    if (event.keyCode == 13) {
        sendMessage();
    }
});