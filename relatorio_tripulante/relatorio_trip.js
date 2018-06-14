var stringParaMinutos = function(str){
    if (str === '00:00')
    {
        return 0;
    }

    var hora = parseInt(str.substr(11,13))
    var minuto = parseInt(str.substr(14,16))
    return (60*hora) + minuto 
}

var minutosParaHoras = function(valor){
    var minutos = '0' + valor%60
    var horas = '0' + (valor-minutos)/60
    return horas.substr(horas.length - 2) + ':' + minutos.substr(minutos.length - 2)
}

var calcularDatas = function(linhaDoDiario){


    var vTotalNoturno=0;
    var vTotalIFRR=0;
    var vTotalIFRC=0;
    var vTotalGeral=0;

    var vPartida  = stringParaMinutos(linhaDoDiario.Partida)
    var vDecolagem  = stringParaMinutos(linhaDoDiario.Decolagem)
    var vPouso  = stringParaMinutos(linhaDoDiario.Pouso)
    var vCorte  = stringParaMinutos(linhaDoDiario.Corte)

    if (vPartida === 0)
        vPartida = vDecolagem

    if (vCorte === 0)
        vCorte = vPouso

    if (vDecolagem === 0 ) return;

    var vIFRR  = stringParaMinutos(linhaDoDiario.IFRR)
    var vIFRC  = stringParaMinutos(linhaDoDiario.IFRC)

    var Total = (vDecolagem-vPartida) + (vPouso - vDecolagem) + (vCorte - vPouso)


    var vNoturno  = stringParaMinutos(linhaDoDiario.Noturno)



}

var SimNao = function(str){
    if ( str )
        return "Sim"
    return "Não"
}

var exibirDiarios = function(diarios){

    $div = $('<div/>').attr("id", "tabela").appendTo("body")

    $tabela = $("<table />").appendTo($div)

        $tr = $("<tr>").appendTo($tabela);
        $('<td />').text('Data').appendTo($tr)
        $('<td />').text('Prefixo').appendTo($tr)
        $('<td />').text('Diario').appendTo($tr)
        $('<td />').text('Folha').appendTo($tr)
        $('<td />').text('Origem').appendTo($tr)
        $('<td />').text('Destino').appendTo($tr)
        $('<td />').text('Comandante').appendTo($tr)
        $('<td />').text('Primeiro Oficial').appendTo($tr)
        //$('<td />').text('Folha do DB').appendTo($tr)

        $('<td />').text('Pousos').appendTo($tr)

        $('<td />').text('Pouso Noturno').appendTo($tr)
        $('<td />').text('Decolagem Noturna').appendTo($tr)
        $('<td />').text('Voo IFR').appendTo($tr)
        $('<td />').text('Pouso Offshore').appendTo($tr)

        $('<td />').text('T.Total').appendTo($tr)
        $('<td />').text('T.Noturno').appendTo($tr)
        $('<td />').text('T.IFR').appendTo($tr)

    $.each(diarios, function( index, value ) {
        //$.format.date(valor[databind], "yyyy-MM-dd"))

        $tr = $("<tr>").appendTo($tabela);
        $('<td />').text($.format.date(value.DiarioDeBordo.DataDoDiario, "dd/MM/yyyy")).appendTo($tr)
        $('<td />').text(value.DiarioDeBordo.Prefixo.PrefixoCompleto).appendTo($tr)
        $('<td />').text(value.DiarioDeBordo.NumeroDoDiario).appendTo($tr)
        $('<td />').text(value.DiarioDeBordo.NumeroDaFolha).appendTo($tr)
        $('<td />').addClass('upper').text(value.OrigemDeclarada).appendTo($tr)
        $('<td />').addClass('upper').text(value.DestinoDeclarado ).appendTo($tr)
        $('<td />').text(value.Comandante.Trato).appendTo($tr)
        if ( value.PrimeiroOficial != undefined )
            $('<td />').text(value.PrimeiroOficial.Trato).appendTo($tr)
        else
        $('<td />').text('---').appendTo($tr)
        //$('<td />').text(value.NumeroDaFolha).appendTo($tr)


        $('<td />').text(value.Pousos).appendTo($tr)
        $('<td />').text(SimNao(value.PousoNoturno)).appendTo($tr)
        $('<td />').text(SimNao(value.DecolagemNoturna)).appendTo($tr)
        $('<td />').text(SimNao(value.VooIFR)).appendTo($tr)
        $('<td />').text(SimNao(value.PousoOffshore)).appendTo($tr)


        var vTotalNoturno=0;
        var vTotalIFRR=0;
        var vTotalIFRC=0;
        var vTotalGeral=0;

        var vPartida  = stringParaMinutos(value.Partida)
        var vDecolagem  = stringParaMinutos(value.Decolagem)
        var vPouso  = stringParaMinutos(value.Pouso)
        var vCorte  = stringParaMinutos(value.Corte)

        if (vPartida === 0)
            vPartida = vDecolagem

        if (vCorte === 0)
            vCorte = vPouso

        if (vDecolagem === 0 ) return;

        var vIFRR  = stringParaMinutos(value.IFRR)
        var vIFRC  = stringParaMinutos(value.IFRC)

        var Total = (vDecolagem-vPartida) + (vPouso - vDecolagem) + (vCorte - vPouso)


        var vNoturno  = stringParaMinutos(value.Noturno)

        $('<td />').text(minutosParaHoras(Total)).appendTo($tr)
        $('<td />').text(minutosParaHoras(vNoturno)).appendTo($tr)
        $('<td />').text(minutosParaHoras(vIFRR + vIFRC)).appendTo($tr)

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


    $('#voltar').on('click', function () { history.back() })
    $('#download').on('click', function (e) {
        window.open('data:application/vnd.ms-excel,' + $('#tabela').html());
        e.preventDefault();
    });

    $("#btnExport").click();
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
