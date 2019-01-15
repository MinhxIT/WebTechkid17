const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose'); // thử viện mongoose
const ScoreModel = require("./models/scoreModel");
const app = express(); // app là web server
mongoose.connect('mongodb://localhost:27017/scorekeeper', {useNewUrlParser: true},(err)=>{
    if(err){
        console.log("Kết nối lỗi ",err);
    }else{
        console.log("Kết nối thành công");
    }
});
app.use(express.static(__dirname+'/public'));// middleware: express.static: thư mục muốn cho là static
app.use(bodyParser.urlencoded({extended:false}));

app.get("/game",function(req,res){
    res.sendFile(__dirname + "/views/CreateScreen.html");
});
app.post("/game",function(req,res){
    const name1 = req.body.player1;
    const name2 = req.body.player2;
    const name3 = req.body.player3;
    const name4 = req.body.player4;
    const newPlayers = {
        player1 : {name:name1,score:[]},
        player2 : {name:name2,score:[]},
        player3 : {name:name3,score:[]},
        player4 : {name:name4,score:[]}
    }
    
    ScoreModel.create(newPlayers, function (err, playerCreated) {
        if (err) return handleError(err);
        else{  
            res.redirect("/game");
        } 
    });
});
app.get("/api/playerName",(req,res)=>{
    // mongo
    var id = req.params.id;
    ScoreModel.findOne({}, {}, { sort: { 'createdAt' : -1 } }, function(err, player) {
        res.send({player:player});
    });
});

app.get("/game/:id",function(req,res){
    var id = req.params.id;
    ScoreModel.findById(id, function (err, score) {
        if (err) return handleError(err);
        else{    
            res.sendFile(__dirname + "/views/PlayScreen.html");
        } 
    });
});
app.get("/game",function(req,res){
    res.sendFile(__dirname + "/views/PlayScreen.html");
});
app.listen(8080,function(err){
    if(err){
        console.log("Lỗi");
    }else{
        console.log("Server connect success");
    }
});
