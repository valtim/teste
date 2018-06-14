var login = function () {


    if (checkFields()) {
        var url = "/api/login";
        var usrObj = {
            "username": $('#txt_username').val(),
            "password": $('#txt_password').val()
        };
        //$inputs.prop("disabled", true);
        $("#mensagem").text("Carregando...");
        $.post(url, usrObj).done(loginOK).fail(failLogin);
    }
}

var loginOK = function(e)
{

    localStorage.setItem("token", e);


    if ( getUrlVars()["page"] != undefined )
    {
        window.location.href =  getUrlVars()["page"];
        return;
    }

    window.location.href = '/app';


}

var failLogin = function (e)
{
    if (e.status == 403)
    {
        $("#mensagem").text("Usuário ou senha incorreto");
        return;
    }

    $("#mensagem").text("Erro no Login");
}

function checkFields(e) {
    var hasP = $('#txt_password').val().length > 0;
    var hasU = $('#txt_username').val().length > 0;
    
    return hasP && hasU;
}



$(document).ready(function () {
    $('#btn_submit').on('click', login);
    $('#titulo').text("Login");
    $('#loading').toggle();
});