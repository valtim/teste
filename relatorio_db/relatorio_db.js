var exibirDiarios = function(diarios){

    $tabela = $("<table />").appendTo("body")

        $tr = $("<tr>").appendTo($tabela);
        $('<td />').text('Data').appendTo($tr)
        $('<td />').text('Prefixo').appendTo($tr)
        $('<td />').text('Número do DB').appendTo($tr)
        $('<td />').text('Folha do DB').appendTo($tr)

        $('<td />').text('Pouso Noturno').appendTo($tr)
        $('<td />').text('Decolagem Noturna').appendTo($tr)
        $('<td />').text('Voo IFR').appendTo($tr)
        $('<td />').text('Pouso Offshore').appendTo($tr)

    $.each(diarios, function( index, value ) {

        $tr = $("<tr>").appendTo($tabela);
        $('<td />').text(value.DataDoDiario).appendTo($tr)
        $('<td />').text(value.Prefixo.PrefixoCompleto).appendTo($tr)
        $('<td />').text(value.NumeroDoDiario).appendTo($tr)
        $('<td />').text(value.NumeroDaFolha).appendTo($tr)


        $('<td />').text(value.Linhas.filter(x=>x.PousoNoturno == 1).length).appendTo($tr)
        $('<td />').text(value.Linhas.filter(x=>x.DecolagemNoturna == 1).length).appendTo($tr)
        $('<td />').text(value.Linhas.filter(x=>x.VooIFR == 1).length).appendTo($tr)
        $('<td />').text(value.Linhas.filter(x=>x.PousoOffshore == 1).length).appendTo($tr)
    });
}


var carregarRelatorio = function () {

$('#loading').show();

$.get({
    url: '/api/novodiario/porTripulante/90',
    headers: {
        token: localStorage.getItem("token"),
    },
    method: 'get',
    success: function (e) {
        exibirDiarios(e)
        $('#loading').hide();
    },
    error: function (e) {
        //alert('Login expirado. Redirecionando...')
        console.log(e.status)
        $('#loading').hide();
        //window.location.href = '/app/login/index.html?page=' + window.location
    }
    })

}




$(document).ready(function() {
    carregarRelatorio()
/*

        buscarBasicos();

        $('#loading').show();

        $('#titulo').text("Diário de Bordo");

        $('#voltar').on('click', function () { window.location.href = '/app' })

        criarPrimeiraPagina()


        $("#cadeado").hide();

        $("#cancelada").hide();

        $('#loading').hide();

    */
});
