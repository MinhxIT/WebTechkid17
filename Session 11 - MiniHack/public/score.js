$(document).ready(function () {
    const idPlayer = window.location.pathname.replace("/game/", "");
    $.ajax({
        type: "GET",
        url: "/api/game/"+idPlayer,
        success: function (data) {
            const {playersData} = data;
            //load name player
            $("#name1").text(playersData.player1.name);
            $("#name2").text(playersData.player2.name);
            $("#name3").text(playersData.player3.name);
            $("#name4").text(playersData.player4.name);
        },
        error:function(error){
           console.log(error);
        }
    });
    $("#btn-create").click(function () { 
        $("tbody").append(`
        <tr>
            <th>Round</th>
            <td scope="col"><input type="number" value="0"></td>
            <td scope="col"><input type="number" value="0"></td>
            <td scope="col"><input type="number" value="0"></td>
            <td scope="col"><input type="number" value="0"></td>
        </tr>
        `);
    });
});