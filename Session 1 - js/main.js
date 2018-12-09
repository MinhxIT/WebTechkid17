// console.log("Hello world");
// // const let var 
// const constVariable = "ABC";
// // constVariable = "XYZ";
// let variable = "áhdjksajdksadkj";
// console.log(variable);
// variable = 6;
// console.log(variable);
// variable = true;
// console.log(variable);
// var va;
// console.log(typeof(va));
// sss =1;
// console.log(sss);
// let obj = {
//     name: "Minh",
//     age: 20,
//     isMarried : false
// }
// console.log(obj.name);
// obj.lastName = "Nguyen Duc ";
// console.log(obj);
// console.log(`Minh ten la ${obj.name}`);
// // 
// let arr = ["1",2,"Ba"];
// console.log(arr);
// for (let i = 0; i < arr.length; i++) {
//     console.log(arr[i]);
// }
// arr.forEach(function(item,index,array) {
//     console.log(item,index,array);
// });
// console.log(arr.map(function(item){
//     return item*2;
// }))
// function funA(){
//     console.log("sssssssssssssss");
// }
// var a = function (name){
//     console.log(`Hello ${name}`);
// }
// const funB = ()=>{
//     console.log("ffffffffff");
// }
// a("Oanh");
// // 
// let now = new Date();
// console.log(now.getHours());
// //exception 
// let regex = new RegExp("[A-Z]");
// function scope: biến sẽ tồn tại ở trong func mà n khai báo 

// var a = 9 ;
// function print(){
//     var b = 10;
//     console.log(a);
//     console.log(b);
// }
// print();
// console.log(a);
//console.log(b);
// setTimeout(function(){
//     console.log("aaaaa");
// },3000) // chạy vài trong func trong 1000ms
// function print(num,waitTime){
//     setTimeout(function(){
//         console.log(num);
//     },waitTime*1000);
// }
// function countDown(count){
//     for (var i = count; i >= 0; i--) {
//        print(i,count-i);
//     }
// }
// function countDown(count){
//     for (var i = count; i >= 0; i--) {
//         setTimeout(function(){
//             console.log(i);
//         },(count-i)*1000);
        
//     }
// }
// countDown(5);
function callback()