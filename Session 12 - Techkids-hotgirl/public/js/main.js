(function ($) {
    "use strict";

    /*==================================================================
    [ Validate ]*/
    var input = $('.validate-input .input100');

    $('.validate-form').on('submit',function(){
        var check = true;

        for(var i=0; i<input.length; i++) {
            if(validate(input[i]) == false){
                showValidate(input[i]);
                check=false;
            }
        }

        return check;
    });


    $('.validate-form .input100').each(function(){
        $(this).focus(function(){
           hideValidate(this);
        });
    });

    function validate (input) {
        if($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
            if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                return false;
            }
        }
        else {
            if($(input).val().trim() == ''){
                return false;
            }
        }
    }

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }
    
    $(".login100-form").on('submit',function (e) {
        var username = $(".username").val();
        var password = $(".password").val(); 
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "http://localhost:3000/api/auth/login",
            data:{username,password},
            success: function (data) {
                console.log(data);
                if(data.userFound){
                    $(".login-fail").text("Login success");
                }else if(data.userPassFail){
                    $(".login-fail").text("Login Faild");
                }else{
                    $(".login-fail").text("User not exist");
                }
                
            }
        });
    });
    

})(jQuery);