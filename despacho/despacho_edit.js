var getValor = function (caminho) {
    var res = caminho.split('/')

    if (res.length == 2) {
        return $model[res[0]][res[1]]
    }

    if (res.length == 3) {
        return $model[res[0]][res[1]][res[2]]
    }

    if (res.length == 4) {
        return $model[res[0]][res[1]][res[2]][res[3]]
    }

    if (res.length == 5) {
        return $model[res[0]][res[1]][res[2]][res[3]][res[4]]
    }


    return $model[res[0]]
}

var retornaDiv = function (texto, campo) {
    $div = $('<div />')

    $('<label />')
        .attr('for', campo.attr('id'))
        .text(texto)
        .appendTo($div)

    $div.append(campo)

    return $div
}

var getStr = function(valor, caminho){
    var res = caminho.split('.')

    if ( res.length == 2 )
    {
        return valor[res[0]][res[1]]
    }

    return valor[res[0]]
}

var novoDecimal = function(id,  databind, readonly, classe){
   
    if ( readonly == undefined)
        readonly = false;

    return $('<input />').attr('type', 'tel')
    .attr('id', id)
    .attr('maxlength', 8)
    .attr('data-bind', databind)
    .prop('readonly', readonly)
    .addClass('decimal')
    .val(getValor(databind), "HH:mm")
}

var novoTexto = function(id,  databind, readonly, classe){
   
    if ( readonly == undefined)
        readonly = false;

    return $('<input />').attr('type', 'text')
    .attr('id', id)
    .attr('maxlength', 8)
    .attr('data-bind', databind)
    .prop('readonly', readonly)
    //.addClass('decimal')
}


var novaCombo = function (id, databind, opcoes, key, desc, valorPadrao) {

    if (valorPadrao == undefined)
        valorPadrao = 'Selecione uma opção'

    $select = $('<select />')
        .attr('id', id)
        .attr('data-bind', databind)

    $('<option />')
        .attr('value', '')
        .text(valorPadrao)
        .appendTo($select)
    $.each(opcoes, function (item, value) {

        $('<option />')
            .attr('value', value[key])
            .text(getStr(value, desc))
            .appendTo($select)

    })


    if (getValor(databind) != undefined)
        $select.val(getValor(databind)[key])

    return $select;
}



var $model = {}

var configuracoes = function (configs) {

    valorPadrao = 'Selecione uma Configuração'

    $select = $('<select />')
        .attr('id', 'cmbPesoBaseDoPrefixo')
        //.attr('data-bind', databind)

    $('<option />')
        .attr('value', '')
        .text(valorPadrao)
        .appendTo($select)

    $.each(configs, function (item, value) {

            $('<option />')
                .attr('value', value['Id'])
                .text(value["Prefixo"]["PrefixoCompleto"] + ' - ' + value["Configuracao"]["Nome"])
                .appendTo($select)

    })

        /*
    if (getValor(databind) != undefined)
        $select.val(getValor(databind)[key])
        */
    return $select;

}


google.load("visualization", "1", { packages: ["corechart"] });
//google.setOnLoadCallback(drawChart);

var arrayyy = [
    ['X', 'Points', 'Line'],
    [3, 3.5, null],
    [3, 6, null],
    [1, null, 1],
    [10, null, 1],
    [10, null, 10],
    [1, null, 10],
    [1, null, 1],
]


function novoitem() {
    var novo = arrayyy.length;

    arrayyy.push([3, novo, null]);

}


var chart;

var polygon;

function inside(point, vs) {
    // ray-casting algorithm based on
    // http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html

    var x = point[0], y = point[1];

    var inside = false;
    for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
        var xi = vs[i][0], yi = vs[i][1];
        var xj = vs[j][0], yj = vs[j][1];

        var intersect = ((yi > y) != (yj > y))
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }

    return inside;
};


function drawChart(cg, pesoDecolagem, estaDentro) {
    //novoitem()

    var titulo = 'CG dentro dos Limites'
    if ( !estaDentro)
        titulo = 'CG fora dos Limites'



    var valor = configuracao.Configuracao.LonCG
    arrayyy = [];
    polygon =[];

    arrayyy.push(['X', 'Points', 'Line']);

    $.each(valor.Pontos, function (item, value) {

        arrayyy.push([value.X,null , value.Y])
        polygon.push([value.X, value.Y])

    })

    if ( pesoDecolagem != undefined && cg != undefined)
        arrayyy.push([cg, pesoDecolagem, null]);



    var data = google.visualization.arrayToDataTable(arrayyy);

    var options = {
        title: titulo,
        hAxis: { title: 'Station', minValue: valor.MinX, viewWindow: { min: valor.MinX, max: valor.MaxX }, gridlines: { count: 10 }, maxValue: valor.MaxX },
        vAxis: { title: 'Weight', minValue: valor.MinY, viewWindow: { min: valor.MinY, max: valor.MaxY }, gridlines: { count: 10 }, maxValue: valor.MaxY },
        legend: 'none',
        interpolateNulls: true,
        height: 200  ,
        width: 300,
        series: {
            1: { lineWidth: 1, pointSize: 0 }
        }
    };
    chart = new google.visualization.ScatterChart(document.getElementById('chart_div'));


    google.visualization.events.addListener(chart, 'ready', function () {
        //debugger;
      $('#div_grafico').html('<img src="' + chart.getImageURI() + '">');
    });


    chart.draw(data, options);


}

var configuracao = {};


var exibeFormulario = function()
{
    
    $('form').remove();

    $('.container').append($('<form />'))

    var valor = $model.config.Configuracao.LonCG
    arrayyy = [];

    

    


    for (i = 1; i <= $model.config.Configuracao.TipoDeAeronave.NumeroDeTripulantes; i++) { 

        $divpax = $('<div />')
        .addClass('pnTrip')
        .appendTo($('form'))

        $('<div />').text("Tripulante " + i).appendTo($divpax)


        $divDuasColunas = $('<div />')
        .addClass('duas_colunas')
        //.addClass('pnPax')
        .appendTo($divpax)
        

        retornaDiv('nome', novoTexto('nomePax' + i, '').addClass('nome'))
        .appendTo($divDuasColunas)

      //   retornaDiv('documento', novoTexto('docPax'+i, '').addClass('documento') )
      //  .appendTo($divDuasColunas)


        retornaDiv('peso', novoDecimal('pesoPax'+i, '').addClass('peso') )
        .appendTo($divDuasColunas)

        retornaDiv('bagagem', novoDecimal('pesoBag'+i, '').addClass('bagagem') )
        .appendTo($divDuasColunas)
        
    }

    if ( $model.config.Configuracao.TemPaciente) { 

        $divpax = $('<div />')
        .addClass('pnPaciente')
        .appendTo($('form'))

        $('<div />').text("Paciente ").appendTo($divpax)


        $divDuasColunas = $('<div />')
        .addClass('duas_colunas')
        //.addClass('pnPax')
        .appendTo($divpax)
        

        retornaDiv('nome', novoTexto('nomePax' + i, '').addClass('nome'))
        .appendTo($divDuasColunas)

         retornaDiv('documento', novoTexto('docPax'+i, '').addClass('documento') )
        .appendTo($divDuasColunas)


        retornaDiv('peso', novoDecimal('pesoPax'+i, '').addClass('peso') )
        .appendTo($divDuasColunas)

        retornaDiv('bagagem', novoDecimal('pesoBag'+i, '').addClass('bagagem') )
        .appendTo($divDuasColunas)
        
    }

    if ( $model.config.Configuracao.TemCarga) { 

        $divpax = $('<div />')
        .addClass('pnCarga')
        .appendTo($('form'))

        $('<div />').text("Carga").appendTo($divpax)


        $divDuasColunas = $('<div />')
        .addClass('duas_colunas')
        //.addClass('pnPax')
        .appendTo($divpax)       


        retornaDiv('peso cabine', novoDecimal('pesoPax'+i, '').addClass('peso') )
        .appendTo($divDuasColunas)

        retornaDiv('peso bagageiro', novoDecimal('pesoBag'+i, '').addClass('bagagem') )
        .appendTo($divDuasColunas)
        
    }





    for (i = 1; i <= $model.config.Configuracao.Passageiros; i++) { 

        $divpax = $('<div />')
        .addClass('pnPax')
        .appendTo($('form'))

        $('<label />')
        .addClass('titulo').text("Passageiro " + i).appendTo($divpax)


        $divDuasColunas = $('<div />')
        .addClass('duas_colunas')
        //.addClass('pnPax')
        .appendTo($divpax)
        

        retornaDiv('nome', novoTexto('nomePax' + i, '').addClass('nome'))
        .appendTo($divDuasColunas)

         retornaDiv('documento', novoTexto('docPax'+i, '').addClass('documento') )
        .appendTo($divDuasColunas)


        retornaDiv('peso', novoDecimal('pesoPax'+i, '').addClass('peso') )
        .appendTo($divDuasColunas)

        retornaDiv('bagagem', novoDecimal('pesoBag'+i, '').addClass('bagagem') )
        .appendTo($divDuasColunas)
    }

    if ( $model.config.Configuracao.TemPaciente) { 

        $divpax = $('<div />')
        .addClass('pnPacienteVolta')
        .appendTo($('form'))

        $('<label />').text("Paciente ").appendTo($divpax)


        $divDuasColunas = $('<div />')
        .addClass('duas_colunas')
        //.addClass('pnPax')
        .appendTo($divpax)
        

        retornaDiv('nome', novoTexto('nomePax' + i, '').addClass('nome'))
        .appendTo($divDuasColunas)

         retornaDiv('documento', novoTexto('docPax'+i, '').addClass('documento') )
        .appendTo($divDuasColunas)


        retornaDiv('peso', novoDecimal('pesoPax'+i, '').addClass('peso') )
        .appendTo($divDuasColunas)

        retornaDiv('bagagem', novoDecimal('pesoBag'+i, '').addClass('bagagem') )
        .appendTo($divDuasColunas)
        
    }

    if ( $model.config.Configuracao.TemCarga) { 

        $divpax = $('<div />')
        .addClass('pnCargaVolta')
        .appendTo($('form'))

        $('<label />').text("Carga ").appendTo($divpax)


        $divDuasColunas = $('<div />')
        .addClass('duas_colunas')
        //.addClass('pnPax')
        .appendTo($divpax)       


        retornaDiv('peso cabine', novoDecimal('pesoPax'+i, '').addClass('peso') )
        .appendTo($divDuasColunas)

        retornaDiv('peso bagageiro', novoDecimal('pesoBag'+i, '').addClass('bagagem') )
        .appendTo($divDuasColunas)
        
    }


    for (i = 1; i <= $model.config.Configuracao.Passageiros; i++) { 

        $divpax = $('<div />')
        .addClass('pnPaxVolta')
        .appendTo($('form'))

        $('<label />')
            .addClass('titulo').text("Passageiro " + i).appendTo($divpax)


        $divDuasColunas = $('<div />')
        .addClass('duas_colunas')
        //.addClass('pnPax')
        .appendTo($divpax)
        

        retornaDiv('nome', novoTexto('nomePax' + i, '').addClass('nome'))
        .appendTo($divDuasColunas)

         retornaDiv('documento', novoTexto('docPax'+i, '').addClass('documento') )
        .appendTo($divDuasColunas)


        retornaDiv('peso', novoDecimal('pesoPax'+i, '').addClass('peso') )
        .appendTo($divDuasColunas)

        retornaDiv('bagagem', novoDecimal('pesoBag'+i, '').addClass('bagagem') )
        .appendTo($divDuasColunas)
    }

$('<div />')
    .addClass('duas_colunas')
    .attr('id', 'pnBalancete')  
    .appendTo($('form'))

    retornaDiv('Peso Máximo de Decolagem', novoDecimal('decMaxDecolagem', 'config/Configuracao/TipoDeAeronave/PesoMaximoDeDecolagem', true) )
    .appendTo($('#pnBalancete'))

    retornaDiv('Peso Básico Operacional', novoDecimal('decPesoBasicoOperacional', 'config/PesoBasico', true) )
    .appendTo($('#pnBalancete'))

    retornaDiv('Peso Total dos Passageiros', novoDecimal('decPesoPax', '', true) )
    .appendTo($('#pnBalancete'))

    retornaDiv('Peso Total da Bagagem', novoDecimal('decPesoBag', '', true) )
    .appendTo($('#pnBalancete'))

    retornaDiv('Peso da Carga', novoDecimal('decPesoCarga', '', true) )
    .appendTo($('#pnBalancete'))

    retornaDiv('Peso Total do Combustível', novoDecimal('decPesoCombustivel', '') )
    .appendTo($('#pnBalancete'))

    retornaDiv('Peso de Decolagem', novoDecimal('decPesoDecolagem', '') )
    .appendTo($('#pnBalancete'))


    $('<div />')
    //.addClass('duas_colunas')
    .attr('id', 'pnEstacoes')  
    .appendTo($('form'))

    $.each($model.config.Configuracao.Estacoes, function (item, value) {
        retornaDiv(value.Nome, novoDecimal('pn'+value.Nome, '') )
        .appendTo($('#pnEstacoes'))
    })


    $('.decimal').on('change', trataDecimal)
    $('.decimal').on('change', calcularTudo)
    $('.decimal').on('change', calcularCG)
    $('.decimal').on('change', gerarImpressao)


    arrayyy.push(['X', 'Points', 'Line']);

    $.each(valor.Pontos, function (item, value) {

        arrayyy.push([value.X,null , value.Y])

    })
}

var trataDecimal = function()
{
    if ( $(this).val().length == 0 )
    {
        $(this).val(0)
        return
    }

    var valorTratado = $(this).val();
    valorTratado = valorTratado.replace('.', '')
    valorTratado = valorTratado.replace(',', '')
    
    var valorInteiro = 0;
    if (valorTratado.length>2 )
        valorInteiro = valorTratado.substr(0, valorTratado.length - 2);

    var valorDecimal = 00;

    valorDecimal = valorTratado.substr(valorTratado.length - 2);

    

    $(this).val(valorInteiro + "," + valorDecimal)
    }

var tratarValor = function(valor)
{
    if ( valor == undefined || valor == '' )
        return 0;

    var valorAtual = valor.replace(",", ".");
        
    valorAtual = parseFloat(valorAtual);

    return valorAtual;

}

var calcularCG = function()
{
    var cg = [];

    $.each($model.config.Configuracao.Estacoes, function (item, value) {
        cg.push([value.Nome, value.Longitudinal, tratarValor($('#pn'+value.Nome).val())])
    })

    cg.push(['PesoBasico', $model.config.EstacaoBaseLongitudinal, $model.config.PesoBasico])

    var somaDosPesos = 0;
    var somaDosMomentos = 0;

    cg.forEach(function(item, index) {
        somaDosPesos = somaDosPesos + item[2]
    })

    cg.forEach(function(item, index) {
        somaDosMomentos = somaDosMomentos + item[1] * item[2]
    })


    

    var cgCalculado = somaDosMomentos/somaDosPesos


    polygon =[];

    $.each($model.config.Configuracao.LonCG.Pontos, function (item, value) {
        polygon.push([value.X, value.Y])

    })

    drawChart(cgCalculado, somaDosPesos, inside([ cgCalculado, somaDosPesos ], polygon))


    //alert(inside([ cgCalculado, somaDosPesos ], polygon))

/*
    EstacaoCG combustivel = (from a in Estacoes where a.Nome.Contains("Combust") select a).First();
    //combustivel.Peso = CombustivelRemanecente + CombustivelNecessario;
    combustivel.Peso = CombustivelCarregado;

    double somaDosMomentos = (from a in Estacoes select a.MomentoLongitudinal).Sum();
    double somaDosPesos = (from a in Estacoes select a.Peso).Sum();
    return somaDosMomentos / somaDosPesos;
    */
    }




var calcularTudo = function()
{

    
    $model.PesoPax = 0.0
    $model.PesoBag = 0.0
    $model.PesoTripulante = 0.0
    $model.PesoCarga = 0.0
    $model.PesoPaciente = 0.0
    $model.PesoCombustivel = 0.0

    $.each($(".pnTrip .peso"), function (item, value) {
        $model.PesoTripulante = $model.PesoTripulante + tratarValor($(value).val())
    })

    $.each($(".pnPax .peso"), function (item, value) {
        $model.PesoPax = $model.PesoPax + tratarValor($(value).val())
    })

    $.each($(".pnPax .bagagem"), function (item, value) {
        $model.PesoBag = $model.PesoBag + tratarValor($(value).val())
    })

    $.each($(".pnPaciente .peso"), function (item, value) {
        $model.PesoPaciente = $model.PesoPaciente + tratarValor($(value).val())
    })


    $.each($(".pnCarga .peso"), function (item, value) {
        $model.PesoCarga = $model.PesoCarga + tratarValor($(value).val())
    })

    $model.PesoCombustivel = tratarValor($('#decPesoCombustivel').val())

    $("#decPesoBasicoOperacional").val($model.config.PesoBasico + $model.PesoTripulante)

    $("#decPesoPax").val($model.PesoPax + $model.PesoPaciente)
    $("#decPesoBag").val($model.PesoBag)
    $("#decPesoCarga").val($model.PesoPax + $model.PesoPaciente + $model.PesoBag + $model.PesoCarga)
    $("#decPesoDecolagem").val(
    ($model.config.PesoBasico + $model.PesoPax + $model.PesoPaciente + $model.PesoBag + $model.PesoCarga + $model.PesoTripulante + $model.PesoCombustivel).toFixed(2)
    )

}

//var 

var gerarImpressao = function(){
    $("#div_pdf").empty();



    $tabela = $('<table />').addClass('align-center').appendTo($("#div_pdf"));
    $tr = $('<tr />').appendTo($tabela)
    $td = $('<td />').appendTo($tr)
    $td.append($('<img />').prop('id', 'logo_emar').prop('src', '/app/img/logo_emar.png'))
    $tr.append($('<td />').text("MANIFESTO DE TRANSPORTE AÉREO - MTA"))


    $tabela = $('<table />').appendTo($("#div_pdf"));
    $tr = $('<tr />').appendTo($tabela);
    $tr.append($('<td />').text("CONTRATANTE"))
    $tr.append($('<td />').text("VOO Nº"))
    $tr.append($('<td />').text("PREFIXO DA AERONAVE"))
    $tr.append($('<td />').text("MODELO"))
    $tr.append($('<td />').text("DATA"))

    $tr = $('<tr />').appendTo($tabela);
    $tr.append($('<td />').text(" "))
    $tr.append($('<td />').text(" "))
    $tr.append($('<td />').text($model.config.Prefixo.PrefixoCompleto))
    $tr.append($('<td />').text($model.config.Configuracao.TipoDeAeronave.Nome))
    $tr.append($('<td />').text(" "))

    
    $tabela = $('<table />').appendTo($("#div_pdf"));
    $tr = $('<tr />').appendTo($tabela);
    $tr.append($('<td />').text("COMANDANTE"))
    $tr.append($('<td />').text("1º OFICIAL"))
    $tr.append($('<td />').text("BASE"))
    $tr.append($('<td />').text("RELATÓRIO DE VOO Nº"))

    $tr = $('<tr />').appendTo($tabela);
    $tr.append($('<td />').text(" "))
    $tr.append($('<td />').text(" "))
    $tr.append($('<td />').text('SJUY'))
    $tr.append($('<td />').text(" "))


    $('<br />').appendTo($("#div_pdf"));

    $tabela = $('<table />').appendTo($("#div_pdf"));

    $tr = $('<tr />').appendTo($tabela);

    $tr.append($('<td />').text("Nº"))
    $tr.append($('<td />').text("Nome do Passageiro"))
    $tr.append($('<td />').text("Documento"))
    $tr.append($('<td />').text("Origem"))
    $tr.append($('<td />').text("Destino"))
    $tr.append($('<td />').text("Peso Pax"))
    $tr.append($('<td />').text("Peso Bag"))


    $tr = $('<tr />').appendTo($tabela);
    $tr.append($('<td />').prop('colspan', '7').text("Ida"))

    $.each($(".pnPax"), function (item, value) {


        value

        $tr = $('<tr />').appendTo($tabela);
        $tr.append($('<td />').text(item+1))
        $tr.append($('<td />').text($(value).find('.nome').val()))
        $tr.append($('<td />').text($(value).find('.documento').val()))
        $tr.append($('<td />').text(''))
        $tr.append($('<td />').text(''))
        $tr.append($('<td />').text($(value).find('.peso').val()))
        $tr.append($('<td />').text($(value).find('.bagagem').val()))

       

    })
    
    $tr = $('<tr />').appendTo($tabela);
    $tr.append($('<td />').prop('colspan', '7').html("Observações<br /><br /><br />"))
    
    $tr = $('<tr />').appendTo($tabela);
    $tr.append($('<td />').prop('colspan', '7').text("Volta"))

    $.each($(".pnPaxVolta"), function (item, value) {


        $tr = $('<tr />').appendTo($tabela);
        $tr.append($('<td />').text(item+1))
        $tr.append($('<td />').text($(value).find('.nome').val()))
        $tr.append($('<td />').text($(value).find('.documento').val()))
        $tr.append($('<td />').text(''))
        $tr.append($('<td />').text(''))
        $tr.append($('<td />').text($(value).find('.peso').val()))
        $tr.append($('<td />').text($(value).find('.bagagem').val()))

       

    })

    $tr = $('<tr />').appendTo($tabela);
    $tr.append($('<td />').prop('colspan', '7').html("Observações<br /><br /><br />"))

    $('<br />').appendTo($("#div_pdf"));


    $("#div_pdf").append($('<div/>').addClass('align-center').html($('#div_grafico').html()))

/*

    
    
    
    

*/

    $tabela = $('<table />').appendTo($("#div_pdf"));
    $tr = $('<tr />').appendTo($tabela);
    $tr.append($('<td />').prop('rowspan', 8).html())
    $tr.append($('<td />').prop('colspan', 3).text('Balancete da Aeronave'))
    $tr.append($('<td />').text('Assinatura Comandante'))
    $tr = $('<tr />').appendTo($tabela);    
    $tr.append($('<td />').text('1'))
    $tr.append($('<td />').text('PESO MÁXIMO DE DECOLAGEM'))
    $tr.append($('<td />').text($model.config.Configuracao.TipoDeAeronave.PesoMaximoDeDecolagem))
    $tr.append($('<td />').prop('rowspan', 8))
    $tr = $('<tr />').appendTo($tabela);    
    $tr.append($('<td />').text('2'))
    $tr.append($('<td />').text('PESO BÁSICO OPERACIONAL'))
    $tr.append($('<td />').text($("#decPesoBasicoOperacional").val()))
    //$tr.append($('<td />').text(''))
    $tr = $('<tr />').appendTo($tabela);    
    $tr.append($('<td />').text('3'))
    $tr.append($('<td />').text('PESO TOTAL DOS PASSAGEIROS'))
    $tr.append($('<td />').text($("#decPesoPax").val()))
    //$tr.append($('<td />').text(''))
    $tr = $('<tr />').appendTo($tabela);    
    $tr.append($('<td />').text('4'))
    $tr.append($('<td />').text('PESO TOTAL DA BAGAGEM'))
    $tr.append($('<td />').text($("#decPesoBag").val()))
    //$tr.append($('<td />').text(''))
    $tr = $('<tr />').appendTo($tabela);    
    $tr.append($('<td />').text('5'))
    $tr.append($('<td />').text('PESO DA CARGA'))
    $tr.append($('<td />').text($("#decPesoCarga").val()))
    //$tr.append($('<td />').text(''))
    $tr = $('<tr />').appendTo($tabela);    
    $tr.append($('<td />').text('6'))
    $tr.append($('<td />').text('PESO TOTAL DO COMBUSTÍVEL'))
    $tr.append($('<td />').text($model.PesoCombustivel))
    //$tr.append($('<td />').text(''))
    $tr = $('<tr />').appendTo($tabela);    
    $tr.append($('<td />').text('7'))
    $tr.append($('<td />').text('PESO DE DECOLAGEM'))
    $tr.append($('<td />').text($("#decPesoDecolagem").val()))
    //$tr.append($('<td />').text(''))



}

$(document).ready(function () {
    $('#voltar').on('click', function () { history.back() })


    $('<div />').attr('id', 'div_grafico').appendTo($('.container'))

    var id = getUrlParameter('id');

    if (id == undefined) {
        $model = {}
        $model.id = newGuid()
    }


    configuracoes(JSON.parse(localStorage.getItem("PesoBaseDoPrefixo")))
    .appendTo($('.container'))


    $("#cmbPesoBaseDoPrefixo").on('change', function () {
        configuracao = JSON.parse(localStorage.getItem("PesoBaseDoPrefixo")).find(x=>x.Id == this.value)
        $model.config = JSON.parse(localStorage.getItem("PesoBaseDoPrefixo")).find(x=>x.Id == this.value);
        //drawChart();
        exibeFormulario()
    })

    //$('input').on('change', function() { mudouValor($(this)) })

/*
    $("#salvar").on('click', function () {
        //configuracao = JSON.parse(localStorage.getItem("PesoBaseDoPrefixo")).find(x=>x.Id == this.value);
        drawChart()
    })


    */
    $('#loading').hide();

    $('#subir').on('click', function () { $(document).scrollTop(0) })

    $('#descer').on('click', function () { $(document).scrollTop($('#decPesoDecolagem').offset().top + 100) })

})