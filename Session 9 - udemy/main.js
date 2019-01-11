
$(document).ready(function () {
    function getData(urlAPI){
        $.ajax({
            type: "GET",
            url: urlAPI,
            success: function (data) {
                //var nextURL = $(".info").attr("next", data.next);
                for (let i = 0; i < data.results.length; i++) {
                    $(".info").append(
                        `<div class="col-4 price-item">
                            <div class="card text-left">
                            <img class="card-img-top img" src="${data.results[i].image_480x270}" alt="">
                            <div class="card-body">
                                <h4 class="card-title title">${data.results[i].title}</h4>
                                <p class="card-text description">${data.results[i].visible_instructors[0].job_title}</p>
                                <p>Price: ${data.results[i].visible_instructors[0].job_title}</p>
                                <a href="${"https://www.udemy.com"+data.results[i].url}" class="btn btn-primary">Go to course</a>
                            </div>
                            </div>
                        </div>
                        `
                    );
                }  
                $('.lds-pacman').hide();
            }
        });
    }
    let nextPage = 2;
    $('.lds-pacman').hide();
    $("#udemy-form").on('submit', function () {
        event.preventDefault();
        $('.lds-pacman').show();
        $(".info").empty();
        let requestURL = "https://api.techkids.vn/udemy/courses?search="+$("#udemy-input").val()+"&price="+$("select").val()+"&page=1";
        getData(requestURL);
    });
    $(window).scroll(function() {
        if($(window).scrollTop() + $(window).height() > $(document).height() - 1) {
            $('.lds-pacman').show();
            let nextURL = "https://api.techkids.vn/udemy/courses?search="+$("#udemy-input").val()+"&price="+$("select").val()+"&page="+nextPage;
            getData(nextURL);
            nextPage++;
        }
    });

    $(window).scroll(function(){ 
        if ($(this).scrollTop() > 100) { 
            $('#scroll').fadeIn(); 
        } else { 
            $('#scroll').fadeOut(); 
        } 
    }); 
    $('#scroll').click(function(){ 
        $("html, body").animate({ scrollTop: 0 }, 600); 
        return false; 
    }); 
    
});