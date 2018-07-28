var URL = window.location.origin === "http://localhost:8080" ? "https://teste.sistemasol.com.br" : "";
var tBody = document.querySelector('table').querySelector('tbody');
var blocoList = [];

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
    var tr = $('<tr />');
    $('<td />')
    .text('nova')
    .appendTo(tr);
    $('<td />')
    .text('bloco.Prefixo')
    .appendTo(tr);

    $('<td />')
    .text('bloco.Numero')
    .appendTo(tr);

    $('<td />')
    .text('bloco.FolhaInicial')
    .appendTo(tr);
    
    $('<td />')
    .text('bloco.FolhaFinal')
    .appendTo(tr);

    $('<td />')
    .text('bloco.Fechado')
    .appendTo(tr);

    $('<td />')
    .text('bloco.Atualizacao')
    .appendTo(tr);

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
    });
};

setTimeout(() => {
    $("#loading").hide();
}, 1000);
