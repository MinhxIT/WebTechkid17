const mongoose = require('mongoose');  // thử viên;
var Schema = mongoose.Schema; // tạo 1 schama

// const ScoreSchema = new Schema({
//     players:[{type:String}],
//     scores:[{type:Number,defaut:0}]
// },{
//     timestamps:true // createAt updateAt
// });
 const ScoreSchema = new Schema({
    player1: { name: { type: String }, score: { type: Array }},
    player2: { name: { type: String }, score: { type: Array }},
    player3: { name: { type: String }, score: { type: Array }},
    player4: { name: { type: String }, score: { type: Array }}
 },{
     timestamps:true // createAt updateAt
 });
module.exports = mongoose.model("Score",ScoreSchema);// export để sử dụng 