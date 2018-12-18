const express = require('express');
const app = express(); // app là web server
app.use(express.static(__dirname+'/resource/'));
app.get("/",(request,response)=>{
    // response.send(JSON.stringify({a:5,b:7}));
   // response.send(JSON.stringify({a:5,b:7}));
    response.send("<h1>Helloo</h1>");
    //response.sendFile(__dirname + "/resource/index1.html");
});
app.get("/about",(req,res)=>{
    res.sendFile(__dirname + "/resource/about.html");
});
app.listen(3000,(err)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log("Server start success!");
    }
});