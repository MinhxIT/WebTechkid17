const express = require('express');
const postApi = express.Router();
const PostModel = require('../models/postModel');

postApi.use((req,res,next)=>{
    next();
})
// get all data
postApi.get("/",(req,res)=>{
    const {page=1,per_page=5} = req.query;
    PostModel.find({})
    .populate(
        'author',
        {
            _id:0,
            password:0,
            __v:0
        },
    )
    .populate('comments.author',{
        _id:0,
        password:0,
        __v:0
    })
    .skip((page-1)*per_page)
    .limit(Number(per_page))
    .then((posts)=>{
        res.send({data:posts})
    })
    .catch((error)=>{
        res.send({error})
    })
});
/// get by id
postApi.get("/:idPost",(req,res)=>{
    const {idPost} = req.params;
    PostModel.findById(idPost)
    .then((postFound)=>{
        res.send({data:postFound});
    })
    .catch((error)=>{
        res.send({error});
    })
}) ;
// post data 
postApi.post("/",(req,res)=>{
    const {picture,description,like,title,comments,views,date,author} = req.body; // get form input 
    const newPost = {picture,description,like,title,comments,views,date,author};
    PostModel.create(newPost)
    .then((postCreated)=>{
        res.send({data:postCreated});
    })
    .catch((error)=>{
        res.send({error});
    })
})
// update 
postApi.put("/:idPost",(req,res)=>{
    const {idPost} = req.params;
    const { picture, description, title, comment } = req.body;
    PostModel.findByIdAndUpdate({idPost})
    .then((postFound)=>{
        if(!postFound){
            res.send({error:"Post not found"});
        }else{
            if(picture) postFound.picture = picture;
            if(description) postFound.desciption = description;
            if(title) postFound.title = title;
            if(comment) postFound.comment = comment;
            return postFound.save();
        }
    })
    .then((postUpdated)=>{
        res.send({data:postUpdated});
    })
    .catch((error)=>{
        res.send({error});
    })
});
// delete 
postApi.delete("/:idPost",(req,res)=>{
    const {idPost} = res.params;
    PostModel.findByIdAndRemove(idPost)
    .then(()=>{
        res.send({data:"Success"});
    })
    .catch((error)=>{
        res.send({error});
    })
})
module.exports = postApi;