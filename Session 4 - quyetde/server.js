const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express(); // app là web server

app.use(express.static(__dirname+'/public/'));//
app.use(bodyParser.urlencoded({extended:false}));
app.get("/",(req,res)=>{
    // response.send(JSON.stringify({a:5,b:7}));
   // response.send(JSON.stringify({a:5,b:7}));
   const questions = JSON.parse(fs.readFileSync("./questionAsk.json",{encoding:"utf-8"}));
   if(questions.length==0){
        res.send("Chưa có câu hỏi nào");
   }else{
        
        const randomQuestion = questions[Math.floor(Math.random()*questions.length)]
        res.send(`<h1>
            ${randomQuestion.content}
        </h1>
        <form action="/countVote/${randomQuestion.id}" method="POST">
            <button name="vote" value="yes">Đúng/Có/Phải</button>
            <button name="vote" value="no">Sai/không/Trái</button>
        </form>
        `);
   }
   
});
// app.get("/about",(req,res)=>{
//     res.sendFile(__dirname + "/resource/about.html");
// }); // đến trang about
app.post("/countVote/:idQues",(req,res)=>{
    let vote = req.body.vote;
    let idQues = req.params.idQues; // tham số id câu hỏi
    const questions = JSON.parse(fs.readFileSync("./questionAsk.json",{encoding:"utf-8"})); // đọc dữ liệu ra
    questions.forEach((question) => {
        if(question.id == idQues){
            if(vote=="yes"){
                question.yes++;
            }else if(vote=="no"){
                question.no++;
            }
        }
    });
    fs.writeFileSync("./questionAsk.json",JSON.stringify(questions)); // ghi vào 
    res.redirect("/")
});
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
    res.redirect('/');
});
app.listen(3000,(err)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log("Server start success!");
    }
});