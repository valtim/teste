$diarios = null;
var URL = window.location.origin === "http://localhost:8080" ? "https://teste.sistemasol.com.br" : "";

var exibirDiarios = function (diarios) {
    $("#tbl_diarios").remove();

    $diarios = diarios;
    localStorage.setItem("diarios", JSON.stringify(diarios))

    $("<table />")
        .attr('id', 'tbl_diarios')
        .attr('data-bind', 'teste')
        .appendTo('.container');

    $("#tbl_diarios").on("click", "tr", function () {
        window.location.href = 'diario_edit.html?id=' + $(this).attr('id')
    });

    $.each($diarios, function (key, value) {

        var texto = value.Prefixo.PrefixoCompleto;
        if (value.NumeroDoDiario !== undefined) {
            texto = texto + ' - ' + value.NumeroDoDiario;
        }

        if (value.NumeroDaFolha !== undefined) {
            texto = texto + ' / ' + value.NumeroDaFolha;
        }

        $tr = $('<tr />').attr('id', value.Id).appendTo("#tbl_diarios");
        $td = $('<td />').text(texto);
        $tr.append($td);

        $fechado = $('<td />')
        if (value.Fechado) {
            clone = $('#cadeado').clone(true)
            clone.show()
            //$('<img />').attr('src','/app/img/favicon-32x32.png').appendTo($lido);
            $(clone).appendTo($fechado);
        };
        $tr.append($fechado);

        $cancelado = $('<td />');
        if (value.Cancelada) {
            clone = $('#cancelada').clone(true)
            clone.show();
            //$('<img />').attr('src','/app/img/favicon-32x32.png').appendTo($lido);
            $(clone).appendTo($cancelado);
        }
        $tr.append($cancelado);
    });
};

var carregarDiarios = function (data) {
    $('#loading').show();

    $.get({
        url: URL + '/api/novodiario/' + data,
        headers: {
            token: localStorage.getItem("token"),
        },
        method: 'get',
        success: function (e) {
            exibirDiarios(e);
            $('#loading').hide();
        },
        error: function (e) {
            //alert('Login expirado. Redirecionando...')
            console.log(e.status);
            $('#loading').hide();
            //window.location.href = '/app/login/index.html?page=' + window.location
        }
    });
};

var criarPrimeiraPagina = function () {

    $('.container').empty();
    $('<div />').addClass('busca').appendTo('.container');
    //$('.container').append(
    //$('<input/>')
    //.attr('type', 'date')
    //.attr('id', 'dt_busca')
    //.on('change', function () { carregarDiarios($(this).val()) })
    //.val($.format.date($.now(), "yyyy-MM-dd"))
    //)

    $('#dt_busca').val($.format.date($.now(), "yyyy-MM-dd"));
    $('#dt_busca').on('change', function () { carregarDiarios($('#dt_busca').val()); });
    $('#buscar').on('click', function () { carregarDiarios($('#dt_busca').val()); });
    carregarDiarios($.format.date($.now(), "yyyy-MM-dd"));
};

var buscarBasicos = function () {
    $.get({
        url: URL + '/api/listaspadrao',
        headers: {
            token: localStorage.getItem("token"),
        },
        method: 'get',
        success: function (e) {
            console.log("e: ", e);
            localStorage.setItem("Tripulante", JSON.stringify(e.Tripulante));
            localStorage.setItem("Cliente", JSON.stringify(e.Cliente));
            localStorage.setItem("Prefixo", JSON.stringify(e.Prefixo));
            localStorage.setItem("Natureza", JSON.stringify(e.Natureza));
            localStorage.setItem("Abastecedora", JSON.stringify(e.Abastecedora));
            localStorage.setItem("TipoDeOperacao", JSON.stringify(e.TipoDeOperacao));
            localStorage.setItem("FuncaoBordo", JSON.stringify(e.FuncaoBordo));
        },
        error: function (e) {
            //alert('Login expirado. Redirecionando...')
            console.log(e.status);
            $('#loading').hide();
            //window.location.href = '/app/login/index.html?page=' + window.location
        }
    });
};

var novaFolha = function () {
    var fodase = JSON.parse(localStorage.getItem("diarios"));
    var nova = {};
    nova.Id = newGuid();
    nova.Fechado = false;
    nova.Linhas = [];
    for (var i = 0; i < 8; i++) {
        var linha = {};
        linha.Id = newGuid();
        linha.OrdemDeExibicao = i + 1;
        nova.Linhas.push(linha);
    }

    fodase.push(nova);
    localStorage.setItem("diarios", JSON.stringify(fodase))
    window.location.href = 'diario_edit.html?id=' + nova.Id;
};

$(document).ready(function () {
    buscarBasicos();
    $('#loading').show();
    $('#titulo').text("Diário de Bordo");
    $('#voltar').on('click', function () { window.location.href = '/app'; });
    criarPrimeiraPagina();
    $('#novo').on('click', function () { novaFolha(); });
    $("#cadeado").hide();
    $("#cancelada").hide();
    $('#loading').hide();
});
