var URL = window.location.origin === "http://localhost:8080" ? "https://teste.sistemasol.com.br" : "";
var tBody = document.querySelector('table').querySelector('tbody');
var blocoList = [];
var id = 0;

$.ajax({
    method: "GET",
    url: URL + "/api/bloco"
}).done(function (response) {
    blocoList = response;
    response.forEach(function(bloco){
        var tr = $('<tr />');
        $('<td />')
        .append($('<input />').attr('type', 'checkbox').attr('value', bloco.Id))
        .appendTo(tr);

        $('<td />')
        .text(bloco.Prefixo.PrefixoCompleto)
        .appendTo(tr);

        $('<td />')
        .text(bloco.Numero)
        .appendTo(tr);

        $('<td />')
        .text(bloco.FolhaInicial)
        .appendTo(tr);
        
        $('<td />')
        .text(bloco.FolhaFinal)
        .appendTo(tr);

        $('<td />')
        .text(bloco.Fechado)
        .appendTo(tr);

        $('<td />')
        .text(bloco.Atualizacao)
        .appendTo(tr);

        tr.appendTo(tBody);
    });    
});

document.getElementById('novoBloco').onclick = function(){
    var novo = {
        Prefixo: {
            PrefixoCompleto: ''
        },
        Numero: '',
        FolhaInicial: 0,
        FolhaFinal: 0,
        Fechado: 0,
        Atualizacao: new Date()
    }


    var tr = $('<tr />');
    $('<td />')
    .append($('<input />').attr('type', 'checkbox').attr('value', id))
    .appendTo(tr);
    
    var dataPrefixo = $('<input />').attr('type', 'text').attr('data-prefixo', id);
    $('<td />')
    .append(dataPrefixo)
    .appendTo(tr);
    dataPrefixo[0].onchange = function(){
        novo.Prefixo.PrefixoCompleto = this.value;
    }

    var dataNumero = $('<input />').attr('type', 'text').attr('data-numero', id);
    $('<td />')
    .append(dataNumero)
    .appendTo(tr);
    dataNumero[0].onchange = function(){
        novo.Numero = this.value;
    }

    var dataFolhaInicial = $('<input />').attr('type', 'number').attr('data-folha-inicial', id);
    $('<td />')
    .append(dataFolhaInicial)
    .appendTo(tr);
    dataFolhaInicial[0].onchange = function(){
        novo.FolhaInicial = this.value;
    }
    
    var dataFolhaFinal = $('<input />').attr('type', 'number').attr('data-folha-final', id);
    $('<td />')
    .append(dataFolhaFinal)
    .appendTo(tr);
    dataFolhaFinal[0].onchange = function(){
        novo.FolhaFinal = this.value;
    }

    var dataFechado = $('<input />').attr('type', 'number').attr('data-fechado', id);
    $('<td />')
    .append(dataFechado)
    .appendTo(tr);
    dataFechado[0].onchange = function(){
        novo.Fechado = this.value;
    }

    $('<td />')
    .appendTo(tr);
    
    blocoList.push(novo);
    id++;
    tr.insertBefore($('tbody>tr')[0]);
};

document.getElementById('excluirBloco').onclick = function(){
    $('input:checked').each(function(_, element) {
        $($(element).parent().parent()).remove();
        for (let index = 0; index < blocoList.length; index++) {
            if(blocoList[index].Id === element.value){
                blocoList.splice(index, 1);
            }
        }
        console.log('blocoList: ', blocoList);
    });
};

document.getElementById('salvarBloco').onclick = function(){
    $.ajax({
        method: "POST",
        url: URL + "/api/bloco",
        data: blocoList
    }).done(function (response) {
        console.log('Response:', response);
    });
};

setTimeout(() => {
    $("#loading").hide();
}, 1000);
