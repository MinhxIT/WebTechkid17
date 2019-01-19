const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const UserApi = require('./routers/userApi');

const app = express();
// connect db 
mongoose.connect('mongodb://localhost:27017/tkhotgirl', {useNewUrlParser: true},(err)=>{
    if(err){
        console.log("Kết nối lỗi");
    }else{
        console.log("Kết nối thành công");
    }
});
// body parrse
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use('/api/user',UserApi);








// open connect server
app.listen(3000,(err)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log("Server start success!");
    }
});