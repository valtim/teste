var buscarBasicos = function () {
    $.get({
        url: '/api/pesobasedoprefixo',
        headers: {
            token: localStorage.getItem("token"),
        },
        method: 'get',
        success: function (e) {
            localStorage.setItem("PesoBaseDoPrefixo", JSON.stringify(e))
        },
        error: function (e) {
            //alert('Login expirado. Redirecionando...')
            console.log(e.status)
            $('#loading').hide();
            //window.location.href = '/app/login/index.html?page=' + window.location
        }
    });
}


$(document).ready(function () {
    buscarBasicos();

    $('#loading').show();

    $('#titulo').text("MTA");

    $('#voltar').on('click', function () { window.location.href = '/app' })

    //criarPrimeiraPagina()

    $("#novo").on("click", function () {

        window.location.href = 'despacho_edit.html'
    })


    $('#loading').hide();
});