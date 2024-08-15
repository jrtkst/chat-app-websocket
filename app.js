// Start routing for the main app
const express = require('express');
const { WebSocketServer } = require('ws');


const app = express();
const PORT = 5000;

// Set view engine to ejs
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use('/static', express.static('static'))

// Render template
app.get('/', (req, res) => {
    res.render('index')
});


app.listen(PORT, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log(`App listening on port ${PORT}`);
    }
});

// Setting up username
app.post('/start-conversation', (req, res, next) => {
    const uname = req.body.uname;
    res.render('main', {uname: uname})
})

// Set up ws server
const ws_server = new WebSocketServer({
    port: 2904
})

ws_server.on("connection", function(ws) {   // Websocket config | What should the websocket do for each event
    
    console.log('New client connected');

    ws.send(JSON.stringify(['--', 'New client connected', 'System']));

    ws.on('close', () => {
        console.log('Client has disconnected')
    })

    ws.on("message", function(msg) {        // message event is fired when data is received through a WebSocket 
        ws_server.clients.forEach((client) => {
            console.log(`Distributing message: ${msg}`);
            client.send(`${msg}`)
        })
    });

    ws.onerror = () => {
        console.log('Websocket error');
    }

})
