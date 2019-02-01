const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var session = require('express-session')
// router
const UserApi = require('./routers/userApi');
const PostApi = require('./routers/postApi');
const AuthApi = require('./routers/authApi');
const app = express();
// connect db 
mongoose.connect('mongodb://localhost:27017/tkhotgirl', {useNewUrlParser: true},(err)=>{
    if(err){
        console.log("Kết nối lỗi");
    }else{
        console.log("Kết nối thành công");
    }
});
app.use(session({
    secret: 'keyboard cat', // mã dùng để mã hóa
    resave: false,// ghi đè trạng thái 
    saveUninitialized: true, // thiết lập webserver có lưu khi vừa truy cập ko 
    cookie: { 
        secure: true,
        maxAge:1000*60,
        httpOnly:false 
    }
}));
// body parrse
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


app.use((req,res,next)=>{
    console.log("SESSION: ", req.session);
    next();
});
app.use('/api/user',UserApi);
app.use('/api/post',PostApi);
app.use('/api/auth',AuthApi);
app.get('/login', (req, res) => {
	res.sendFile(__dirname+"/views/Login.html");
});
app.get('/', (req, res) => {
	res.sendFile(__dirname + "/views/index.html");
});


app.use("/public", express.static("public"));
// open connect server
app.listen(3000,(err)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log("Server start success!");
    }
});