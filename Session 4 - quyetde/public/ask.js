
// jquery 
$(document).ready(function () {
    // đếm số lượng ký tự 
    $('#content').on('input', function () {
        $('#count').text(200-$('#content').val().length);
    });
    $.ajax({
        type: "GET",
        url: "/api/random",
        success: function (data) {
            $("#contentQues").text(data.question.content);
            $("#yesVote").text(data.question.yes);
            $("#noVote").text(data.question.no);
            $(".btn-answer").attr("data-questionId",data.question.id);
            $(".btn-result").attr("data-questionId",data.question.id);
        },
        error:function(err){
            console.log(err);
        }
    });
    // sự kiến bấm nút answer
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
    $(".btn-result").click(function () { 
        const questionId = $(".btn-result").attr("data-questionId");       
        $.ajax({
            type: "GET",
            url: "/question/"+questionId,
            success: function (data) {
                alert("Nội dung câu hỏi: " + data.question.content + "      Yes: " + data.question.yes + "       No:" +data.question.no);
                
                window.location.href = "/result/"+questionId;
            },
            error:function(err){
                console.log(err);
            }
        });
    });
    
});
