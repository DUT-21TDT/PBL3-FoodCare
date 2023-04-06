function LoadCss(url) {
    var link = document.createElement("link");
    link.type = "text/css";
    link.rel = "stylesheet";
    link.href = url;
    document.querySelector("head").appendChild(link);
    }
    function LoadScript(url) {
        var script = document.createElement('script');
        script.setAttribute('src', url);
        script.setAttribute('async', false);
        document.head.appendChild(script);
    }
    $(document).ready(function(){
        $(".ChangePassword_footer__forgetPass").click(function(event)
        {
            event.preventDefault();
            $("html").html('');
            $("body").load('../ForgetPassword/ForgetPassword.html');
            LoadCss("../ForgetPassword/ForgetPassword.css");
            LoadScript("../ForgetPassword/ForgetPassword.js");
            event.stopPropagation();
          
        });
        
    });
