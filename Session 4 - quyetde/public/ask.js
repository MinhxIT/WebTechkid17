

// var content = document.getElementById("content").addEventListener("input",function(){
//     var check = document.getElementById("count").innerText = 200 - document.getElementById("content").value.length;
//     if(check<0){
//         document.getElementById("content").value.slice(0,199);
//     }
// });
// jquery 
$(document).ready(function () {
    $('#content').on('input', function () {
        $('#count').text(200-$('#content').val().length);
    });
    
    $(".btn-answer").click(function () { 
        const questionId = $(".btn-answer").attr("data-questionId");
        const questionVote = $(this).attr("id");
        $.ajax({
            type: "GET",
            url: "/vote/"+questionId+"/" + questionVote,
            success: function (data) {
                window.location.href = "/answer";
            },
            error:function(err){
                console.log(err);
            }
        });
    });
    $.ajax({
        type: "GET",
        url: "/api/random",
        success: function (data) {
            $("#contentQues").text(data.question.content);
            $(".btn-answer").attr("data-questionId",data.question.id);
        },
        error:function(err){
            console.log(err);
        }
    });
});
