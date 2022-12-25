const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const PORT = process.env.PORT || 4443;
const { exec } = require("child_process");


app.get('/', function(req,res){
    console.log("here!");
    res.sendFile(__dirname+"/www/index.html");
});

io.on("connection", function(socket){
    socket.on("signal", function(signal){
        console.log("Signal: " + signal);
        exec("sudo ./IR_signal_Transmitter " + signal, (error, stdout, stderr) => {
            if(error){
                exec("sudo killall pigpiod", (error, stdout, stderr) => console.log(stdout));
            }
            console.log(stdout)
        });
    });
    socket.on("log", function(logText){
        console.log("log: " + logText);
    });
})

http.listen(PORT, function(){
    console.log('server listening at Port:' + PORT);
});