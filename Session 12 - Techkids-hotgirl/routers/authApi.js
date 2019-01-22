const express = require('express');
const AuthApi = express.Router();
const bcrypt = require('bcryptjs');
const path = require('path');
const UserModel = require('../models/userModel');
AuthApi.get("/login",function(req,res){
    res.sendFile(path.join(__dirname+"../../views/Login.html"));
})

AuthApi.post('/login',function(req,res){
    const {username, password} = req.body;
    UserModel.findOne({username})
    .then((userFound)=>{
        if(userFound){
            if(bcrypt.compareSync(password,userFound.password)){
                res.send({userFound:userFound});
            }else{
                res.send({userPassFail:userFound});
            }
        }else{
            res.send({error});
        }
    })
    .catch((error)=>{
        res.send({error});
    })
})
module.exports = AuthApi;