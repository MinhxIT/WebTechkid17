const express = require('express');
const AuthApi = express.Router();
const bcrypt = require('bcryptjs');
const path = require('path');
const UserModel = require('../models/userModel');


AuthApi.post('/login',function(req,res){
    const {username, password} = req.body;
    UserModel.findOne({username})
    .then((userFound)=>{
        if(userFound){
            if(bcrypt.compareSync(password,userFound.password)){
                req.session.username  =userFound.username;
                res.send("Success");
            }else{
                res.status(401).send({error:"Wrong pass"});
            }
        }else{
            res.status(404).send({error:"User not exist"});
        }
    })
    .catch((error)=>{
        res.status.send({error});
    })
})
AuthApi.get("/",(req,res)=>{
    const {username} = req.session;
    if(username) res.send({username});
    else res.status(401).send({message:"sssssss"});
});
var sessionChecker = (req, res, next) => {
    if (req.session.user && req.cookies.user_sid) {
        res.redirect('/dashboard');
    } else {
        next();
    }    
};


module.exports = AuthApi;