
var express = require('express');
var app = express();
var http =require('http').Server(app)
var io = require('socket.io')(http);









app.get('/', function(req, res){
    res.sendFile(__dirname + "/start.html");
});


//load sprites
for(let i=0; i<3; i++){
    app.get('/'+i+'.png', function(req, res){
        res.sendFile(__dirname + "/sprites/"+i+".png");
    });
}

app.get('/game.js', function(req, res){
    res.sendFile(__dirname + "/game.js");
});

var id=0
io.on("connection", function(socket){
console.log("Player joined")
    var id1=id
    id++
    for(let j=0; j<10; j++){
    //player positions
        socket.on('player_position'+j,function(x,y){
        io.emit('player_position'+j,id1,x,y)  
        })
    //player scores
        socket.on('score'+j,function(score){
        io.emit('score'+j,id1,score)  
        })
        
    //player colors
        socket.on('color'+j,function(color){
        io.emit('color'+j,id1, color)  
        })
    }
    
    
    
    
    
    
    
})





http.listen(3000, function(){
console.log("server started");
});
