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
// display create game
app.get("/game",function(req,res){
    res.sendFile(__dirname + "/views/CreateScreen.html");
});
// post data on db 
app.post("/game",(req,res)=>{
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
    
    ScoreModel.create(newPlayers, (err, playerCreated)=> {
        if (err) return handleError(err);
        else{  
            res.redirect("/game/"+playerCreated._id);
        } 
    });
});
// hien thi man hinh game
app.get("/game/:idPlayer",(req,res)=>{
    res.sendFile(__dirname+"/views/PlayScreen.html");
});
// api lay du lieu tu id 
app.get("/api/game/:idPlayer",(req,res)=>{
    var idPlayer = req.params.idPlayer;
    ScoreModel.findById(idPlayer, function (err, playersData) {
        if (err) return handleError(err);
        else{    
            res.send({playersData:playersData})
        } 
    });
});
// 
app.post("/api/game/:gameId",(req,res)=>{
    const gameId = req.params.gameId;
	arrItem = req.body.id.split("r");
	newScore = req.body.score;
	gameModel.findById(gameId, function (err, gameCreated) {
		if (err) console.log(err);
		else {
			
			switch(arrItem[0]){
				case "1":
				{
					var arrScore;
					arrScore = gameCreated.player1.score;
					arrScore[arrItem[1]-1] = parseInt(newScore);
					gameModel.findByIdAndUpdate(gameId, { player1  : { name: gameCreated.player1.name, score: arrScore } }, function (err, game) {
						if (err) console.log(err);
					});
					break;
				}
				case "2":
				{
					var arrScore;
					arrScore = gameCreated.player2.score;
					arrScore[arrItem[1]-1] = parseInt(newScore);
					gameModel.findByIdAndUpdate(gameId, { player2  : { name: gameCreated.player2.name, score: arrScore } }, function (err, game) {
						if (err) console.log(err);
					});
					break;
				}
				case "3":
				{
					var arrScore;
					arrScore = gameCreated.player3.score;
					arrScore[arrItem[1]-1] = parseInt(newScore);
					gameModel.findByIdAndUpdate(gameId, { player3  : { name: gameCreated.player3.name, score: arrScore } }, function (err, game) {
						if (err) console.log(err);
					});
					break;
				}
				case "4":
				{
					var arrScore;
					arrScore = gameCreated.player4.score;
					arrScore[arrItem[1]-1] = parseInt(newScore);
					gameModel.findByIdAndUpdate(gameId, { player4  : { name: gameCreated.player4.name, score: arrScore } }, function (err, game) {
						if (err) console.log(err);
					});
					break;
				}
				default: break;
			}
			res.send({ gameCreated: gameCreated });
		}
	});
    
})
app.listen(8080,function(err){
    if(err){
        console.log("Lỗi");
    }else{
        console.log("Server connect success");
    }
});
