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


var exibirPapeleta = function(dados)
{
    $('#papeleta').remove()
    
    $div = $('<div/>').attr("id", "papeleta").appendTo("body")

    $tabela = $("<table />")

    

    $tr = $("<tr>").appendTo($tabela);
    $logo = $('<img />')
    .attr('src', "/app/img/logo_emar.png")
    .appendTo($('<th />').attr('rowspan', 4)
    .attr('colspan', 3).appendTo($tr))


    $('<th />').html('Av. Rui Barbosa, 698, sala 709 – Centro<br>Macaé – RJ – CEP: 27.910-361 - Brasil')
    .attr('colspan', 6)
    .appendTo($tr)

    $tr = $("<tr>").appendTo($tabela);
    $('<th />').html('Ficha de Controle de Regulamentação do Aeronauta')
    .attr('colspan', 6)
    .appendTo($tr)

     $tr = $("<tr>").appendTo($tabela);
     $('<th />').html('Nome:').appendTo($tr)
     $('<th />').html(dados.Nome).attr('colspan', 3).appendTo($tr)
     $('<th />').html('Cód. ANAC:').appendTo($tr)
     $('<th />').html(dados.ANAC).appendTo($tr)

     $tr = $("<tr>").appendTo($tabela);
     $('<th />').html('Função:').appendTo($tr)
     $('<th />').html(dados.Funcao).appendTo($tr)
     $('<th />').html('Mês:').appendTo($tr)
     $('<th />').html(dados.Mes).appendTo($tr)
     $('<th />').html('Ano:').appendTo($tr)
     $('<th />').html(dados.Ano).appendTo($tr)

//


    $tr = $("<tr>").appendTo($tabela);
    $('<td />').text("Apres. Jornada").attr('colspan', 3).appendTo($tr)
    $('<td />').text("Intervalo Refeição").appendTo($tr).attr('colspan', 2)
    $('<td />').text("Término Jornada").appendTo($tr).attr('colspan', 2)
    $('<td />').text("Total Voo").appendTo($tr).attr('colspan', 2)


    $tr = $("<tr>").appendTo($tabela);
    $('<td />').text('Dia').appendTo($tr)
    $('<td />').text('Cód').appendTo($tr)
    $('<td />').text('Hora').appendTo($tr)
    $('<td />').text('Início').appendTo($tr)
    $('<td />').text('Término').appendTo($tr)
    $('<td />').text('Dia').appendTo($tr)
    $('<td />').text('Hora').appendTo($tr)
    $('<td />').text('Dia').appendTo($tr)
    $('<td />').text('Mês').appendTo($tr)

    $.each(dados.Linhas, function( index, value ) {
        $tr = $("<tr>").appendTo($tabela);
        $('<td />').text(value.DiaDaSemana + ' ' + $.format.date(value.Dia, "dd")).appendTo($tr)
        $('<td />').appendTo($tr)
        $('<td />').text(value.HoraDeApresentacao).appendTo($tr)
        $('<td />').text(value.HoraDeRefeicao).appendTo($tr)
        $('<td />').text(value.HoraFimDeRefeicao).appendTo($tr)
        $('<td />').text(value.DiaDaSemana + ' ' + $.format.date(value.Dia, "dd")).appendTo($tr)
        $('<td />').text(value.TerminoJornada).appendTo($tr)
        $('<td />').text(value.TempoDeVoo).appendTo($tr)
        $('<td />').text(value.TempoAcumulado).appendTo($tr)
    })

    $tabela.appendTo($div)

    $tabelaDireita = $tabela.clone()

    $tr = $("<tr>").appendTo($tabela);
    $('<td />').text('Recebi do Tripulante '+ dados.Nome + ' regulamentação referente ' + dados.Mes + ' ' + dados.Ano).attr('colspan', 9).appendTo($tr)

    $tr = $("<tr>").appendTo($tabela);
    $('<td />').addClass('assinatura').text('Nome e Assinatura do Recebedor').attr('colspan', 9).appendTo($tr)
    

    $tr = $("<tr>").appendTo($tabelaDireita);
    $('<td />').addClass('assinatura').text('Assinatura do Tripulante:').attr('colspan', 7).appendTo($tr)
    $('<td />').addClass('assinatura').text('Visto:').attr('colspan', 2).appendTo($tr)

    $tr = $("<tr>").appendTo($tabelaDireita);
    $('<td />').addClass('assinatura')
    .html('EV= Escala de Voo RV= Reserva SA= Sobreaviso SE= Sem Escala RP= Repouso<br/>FP= Folga Periódica FE= Férias LI= Licença SIM= Simulador CR= Cursos<br/> CHT= Prova Gerência Regional CCF=Renovação DM= Disp.Médica VG=Viagem')
    .attr('colspan', 9).appendTo($tr)

    $tabelaDireita.addClass('espelho').appendTo($div)
}

var carregarPapeleta = function(id)
{
        $.get({
        url: '/api/novodiario/'+id+'/3/2018',
        headers: {
            token: localStorage.getItem("token"),
        },
        method: 'get',
        success: function (e) {
            exibirPapeleta(e)
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

var exibirTripulantes = function(lista)
{
    $div = $('<div/>').attr("id", "tabela").appendTo("body")
    $tabela = $("<table />").appendTo($div)

    $.each(lista, function( index, value ) {
        $tr = $("<tr>").on('click', function() {carregarPapeleta(value.Id)}).appendTo($tabela);
        $('<td />').text(value.CodigoANAC).appendTo($tr)
        $('<td />').text(value.NomeCompleto).appendTo($tr)
    })
}

var carregarTripulantes = function()
{
    $.get({
        url: '/api/Tripulante',
        headers: {
            token: localStorage.getItem("token"),
        },
        method: 'get',
        success: function (e) {
            exibirTripulantes(e)
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
    carregarTripulantes()

    $('#voltar').on('click', function () { history.back() })


});
