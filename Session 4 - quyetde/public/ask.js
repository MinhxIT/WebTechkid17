
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
            //alert(data.length)

            $("#contentQues").text(data.question.content);
            $(".btn-answer").attr("data-questionId",data.question._id);
            $(".btn-result").attr("data-questionId",data.question._id);
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
                window.location.href = "/question/"+questionId;
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
                window.location.href = "/question/"+questionId;
            },
            error:function(err){
                console.log(err);
            }
        });
    });
    
});
