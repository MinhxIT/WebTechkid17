$(document).ready(function () {
   
    $("#btn-create").click(function () { 
        // const playerId = $("#btn-create").attr("data-id");
        // $.ajax({
        //     type: "GET",
        //     url: "/game/" + playerId,
        //     success: function (data) {
        //         window.location.href = "/game/"+playerId;
        //     },
        //     error:function(err){
        //         console.log(err);
        //     }
        // });
        $.ajax({
            type: "GET",
            url: "/api/playerName",
            success: function (data) {
                window.location.href = "/game/"+data.player._id;
            }
        });
    });
});