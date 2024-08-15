// Websocket config
const url = "ws://localhost:2904/";
const ws_server = new WebSocket(url);


// Handler when receiving message
ws_server.onmessage = (event) => {
    const data = JSON.parse(event.data);
    $("#chat_table").append('<tr><th scope="row">' + data[0] + '</th>' + '<td>' + data[2] + '</td>' + '<td>' + data[1] + '</td>'+ '</tr>');
};

// Add event listener to websocket
ws_server.addEventListener('open', () => {
    ws_server.send('Client ready to chat')
})

// Send and display message 
function send_msg(event) {
    const msg = document.getElementById('msg').value;
    const uname = document.getElementById('uname').value;
    const time = document.getElementById('time').value;
    const data_send = JSON.stringify([time, msg, uname]);
    ws_server.send(data_send)
    $("#msg").val('')
    event.preventDefault();
};


document.getElementById('chat-form').addEventListener('submit', send_msg)