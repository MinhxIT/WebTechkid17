const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express(); // app là web server

app.use(express.static(__dirname+'/public'));//
app.use(bodyParser.urlencoded({extended:false}));

app.get("/answer",(req,res)=>{
    // response.send(JSON.stringify({a:5,b:7}));
   // response.send(JSON.stringify({a:5,b:7}));
   const questions = JSON.parse(fs.readFileSync("./questionAsk.json",{encoding:"utf-8"}));
   if(questions.length==0){
        res.send("Chưa có câu hỏi nào");
   }else{
        const randomQuestion = questions[Math.floor(Math.random()*questions.length)];
        // res.send(`<h1>
        //     ${randomQuestion.content}
        // </h1>
        // <a href="/vote/${randomQuestion.id}/yes">Yes</a><br>
        // <a href="/vote/${randomQuestion.id}/no">No</a><br>
        // `);
        res.sendFile(__dirname +"/view/answer.html");
   }
   
});
app.get("/api/random",(req,res)=>{
    const questions = JSON.parse(fs.readFileSync("./questionAsk.json",{encoding:"utf-8"}));
    const randomQuestion = questions[Math.floor(Math.random()*questions.length)]
    res.send({question:randomQuestion});
})

// app.get("/about",(req,res)=>{
//     res.sendFile(__dirname + "/resource/about.html");
// }); // đến trang about
// app.post("/countVote/:idQues",(req,res)=>{
//     let vote = req.body.vote;
//     let idQues = req.params.idQues; // tham số id câu hỏi
//     const questions = JSON.parse(fs.readFileSync("./questionAsk.json",{encoding:"utf-8"})); // đọc dữ liệu ra
//     questions.forEach((question) => {
//         if(question.id == idQues){
//             if(vote=="yes"){
//                 question.yes++;
//             }else if(vote=="no"){
//                 question.no++;
//             }
//         }
//     });
//     fs.writeFileSync("./questionAsk.json",JSON.stringify(questions)); // ghi vào 
//     res.redirect("/")
// });
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
    res.redirect('/answer');
});
app.get("/vote/:questionId/:vote",(req,res)=>{
    const questionId = req.params.questionId;
    const vote = req.params.vote;
    let questions = JSON.parse(fs.readFileSync("./questionAsk.json"),{encoding:"utf-8"});
    questions.forEach((question,index)=>{
        if(question.id = questionId){
            if(vote=="yes"){
                questions[index].yes+=1;
            }
            else{
                questions[index].no+=1;
            }
        }
    });
    fs.writeFileSync("./questionAsk.json",JSON.stringify(questions));
    res.redirect("/ask");
});
app.listen(3000,(err)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log("Server start success!");
    }
});