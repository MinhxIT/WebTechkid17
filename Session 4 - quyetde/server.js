const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express(); // app là web server
const mongoose = require('mongoose'); // thử viện mongoose
const QuestionModel = require("./model/questionModel");// lấy từ model 
// kết nối với mongodb 
mongoose.connect('mongodb://localhost:27017/quyetde', {useNewUrlParser: true},(err)=>{
    if(err){
        console.log("Kết nối lỗi");
    }else{
        console.log("Kết nối thành công");
    }
});


app.use(express.static(__dirname+'/public'));// middleware: express.static: thư mục muốn cho là static
app.use(bodyParser.urlencoded({extended:false}));
// thêm câu hỏi vào db
app.post("/addQuestion",(req,res)=>{//  phương thức post lấy dữ liệu từ form 
    // const questions = JSON.parse(fs.readFileSync("./questionAsk.json",{encoding:"utf-8"})); // đọc dữ liệu ra
    const newQuestion  = {
        content: req.body.questionContent// content lấy từ form 
    }; // dữ liệu mới
    QuestionModel.create(newQuestion, function (err, questionCreated) {
        if (err) return handleError(err);
        else{
            console.log("Thêm thành công");
            res.redirect("/ask");
        } 
    });
    // 
   
});
app.get("/answer",(req,res)=>{
   const questions = JSON.parse(fs.readFileSync("./questionAsk.json",{encoding:"utf-8"}));
   if(questions.length==0){
        res.sendFile(__dirname+"/view/noAnswer.html");
   }else{
        res.sendFile(__dirname +"/view/answer.html");
   }
});
app.get("/api/random",(req,res)=>{
    // mongo
    QuestionModel.find({}, function (err, questions) {
        if (err) return handleError(err);
        else{
            const randomQuestion = questions[Math.floor(Math.random()*questions.length)];
            console.log(randomQuestion);
            res.send({question:randomQuestion});
        } 
    });
    //
    // QuestionModel.count({},(err,totalQuestion)=>{
    //     QuestionModel
    //     .findOne(({}))
    //     .skip(Math.floor(Math.random()*totalQuestion))
    //     .exec((err,randomQuestion)=>{
    //         if(err) console.log(err);
    //         else{
    //             res.send({question:randomQuestion});
    //         }
    //     });
    // });
});



app.get("/vote/:questionId/:vote",(req,res)=>{
    const questionId = req.params.questionId; // id ở trên đường dẫn
    const vote = req.params.vote;
    // let questions = JSON.parse(fs.readFileSync("./questionAsk.json"),{encoding:"utf-8"});

    if(vote=="yes"){
        QuestionModel.findById(questionId, function (err, question) {
            if (err) return handleError(err);
            
            question.set({yes: question.yes+=1 });
            question.save();
            });
    }
    else{
        QuestionModel.findById(questionId, function (err, question) {
            if (err) return handleError(err);
            
            question.set({no: question.no+=1 });
            question.save();
            });
    }
    //res.redirect("/answer");
});

app.get("/ask",(req,res)=>{
    res.sendFile(__dirname + "/view/ask.html");
}); // đến trang ask 
app.get("/question/:questionId",(req,res)=>{
    res.sendFile(__dirname+"/view/question.html");
});
app.get("/api/question/:questionId",(req,res)=>{
    const questionId = req.params.questionId; // id ở trên đường dẫn
    QuestionModel.find({_id : questionId }, function (err, question) {
        if (err) return handleError(err);
        else{
            let questionFound;
            questionFound = question[0];
            console.log(question);
            res.send({question:questionFound});
            //console.log(question.content);
        } 
    });
})
app.listen(3000,(err)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log("Server start success!");
    }
});