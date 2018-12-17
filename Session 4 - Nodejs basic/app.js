const fs = require('fs'); 
const fileController = require('./fileController');
const {readFile} = fileController;
readFile("hello.txt",function(data){
console.log(data);
});
//const readFile = fileController.readFile;

//console.log(fileController.writeFile("hello.txt","Hello"));
// console.log("Begin");
// fs.writeFile("hello.txt","Hello world",function(err){
//     if(err){
//         console.log(err);
//     }else{
//         console.log("Write file success");
//     }
// });
// fs.writeFileSync("testSync.txt","Hello sync");
// console.log("End");

// console.log("Begin");
// fs.readFile("hello.txt",{encoding:"utf-8"},function(err,data){
//     if(err){
//         console.log(err);
//     }else{
//         console.log("File data: ", data);
//     }
// });
// console.log("End");
// console.log("Begin sync");
// fs.readFileSync("txtSync.txt");
// console.log("End sync");
// 
// const objectData = {
//     name:"Minh",
//     age:20
// }
// const parseData = fs.writeFileSync("hello.txt",JSON.stringify(objectData));// chuyển thành json
// fs.writeFileSync("hello.txt",JSON.parse(parseData)); // chuyển thành object
// const parseData = JSON.parse(objectData);
// console.log("File data: ",parseData.age);
// fs.readFileSync("hello.txt",{encoding:"utf-8"});