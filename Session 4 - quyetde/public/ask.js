var content = document.getElementById("content").addEventListener("input",function(){
    var check = document.getElementById("count").innerText = 200 - document.getElementById("content").value.length;
    if(check<0){
        document.getElementById("content").value.slice(0,199);
    }
});