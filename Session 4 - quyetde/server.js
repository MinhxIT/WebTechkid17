const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express(); // app là web server

app.use(express.static(__dirname+'/public'));// middleware: express.static: thư mục muốn cho là static
app.use(bodyParser.urlencoded({extended:false}));

app.get("/answer",(req,res)=>{
    // response.send(JSON.stringify({a:5,b:7}));
   // response.send(JSON.stringify({a:5,b:7}));
   const questions = JSON.parse(fs.readFileSync("./questionAsk.json",{encoding:"utf-8"}));
   if(questions.length==0){
        res.sendFile(__dirname+"/view/noAnswer.html");
   }else{
        res.sendFile(__dirname +"/view/answer.html");
   }
   
});
app.get("/api/random",(req,res)=>{
    const questions = JSON.parse(fs.readFileSync("./questionAsk.json",{encoding:"utf-8"}));// danh sách câu hỏi
    const randomQuestion = questions[Math.floor(Math.random()*questions.length)] // câu hỏi ngẫu nhiên 
    res.send({question:randomQuestion});
})

app.get("/ask",(req,res)=>{
    res.sendFile(__dirname + "/view/ask.html");
}); // đến trang ask 

app.post("/addQuestion",(req,res)=>{
    const questions = JSON.parse(fs.readFileSync("./questionAsk.json",{encoding:"utf-8"})); // đọc dữ liệu ra
    const newQuestion  = {
        content: req.body.questionContent,
        yes:0,
        no:0,
        id:questions.length
    }; // dữ liệu mới
    questions.push(newQuestion); // thêm dữ liệu vào json 
    fs.writeFileSync("./questionAsk.json",JSON.stringify(questions)); // ghi vào 
    res.redirect("/ask")
});
app.get("/vote/:questionId/:vote",(req,res)=>{
    const questionId = req.params.questionId; // id ở trên đường dẫn
    const vote = req.params.vote;
    let questions = JSON.parse(fs.readFileSync("./questionAsk.json"),{encoding:"utf-8"});
    questions.forEach((question,index)=>{
        if(question.id == questionId){
            if(vote=="yes"){
                questions[index].yes+=1;
            }
            else{
                questions[index].no+=1;
            }
        }
    });
    fs.writeFileSync("./questionAsk.json",JSON.stringify(questions));
});
app.get("/question/:questionId",(req,res)=>{
    const questionId = req.params.questionId; // id ở trên đường dẫn
    let questions = JSON.parse(fs.readFileSync("./questionAsk.json"),{encoding:"utf-8"});
    questions.forEach((question)=>{
        if(question.id == questionId){
            res.send({question:question});
        }
    });
})
app.get("/result/:questionId",(req,res)=>{
    const questionId = req.params.questionId;
    res.sendFile(__dirname+"/view/result.html");
})
app.listen(3000,(err)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log("Server start success!");
    }
});