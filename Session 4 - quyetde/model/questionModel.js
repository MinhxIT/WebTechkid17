const mongoose = require('mongoose');  // thử viên;
var Schema = mongoose.Schema; // tạo 1 schama

const QuestionSchema = new Schema({
    content: { type:String,required:true},
    yes: {type:Number,default:0},
    no: {type:Number,default:0}
},{
    timestamps:true // createAt updateAt
});

module.exports = mongoose.model("Question",QuestionSchema);// export để sử dụng 