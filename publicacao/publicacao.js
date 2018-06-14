$arquivos = null;
$tripulantes = null;
$arquivoAtual = null;

function validarForm() {
    if ($('#descricao').val() == '') {
        alert('Preencha a Descrição')
        return false;
    }

    if ($('#versao').val() == '') {
        alert('Preencha a Descrição')
        return false;
    }
    return true;
}

function makeCheckBox(id, name)
{
    var $tr = $('<tr />', { id: id });
    var $td = $('<td />');
    var $div = $('<div />').addClass('round')
    var $chk = $('<input/>', { type: 'checkbox', id: '_' + id, name:name, value:id })
    var $label = $('<label />', { for: '_' + id })

    $div.append($chk)
    $div.append($label)
    $td.append($div);

    return $td;
}

var listarTripulantes = function (result, publicacao) {

    var $lista = $('.checkedlistbox')    

    $lista.append($('<table />', { id: 'tbl_tripulantes'}))


    $.each(result, function (i, l) {

        var $tr = $('<tr />', { id: l.Id });
        $tr.append(makeCheckBox(l.Id, 'tripulante'));

        $tr.append($('<td />').text(l.Trato));

        $('#tbl_tripulantes').append($tr);
    });

    $.each(publicacao, function (i, l) {

        var $check = $('.checkedlistbox').find('#_'+l.Tripulante.Id)[0]

        $check.checked = true;
    });
}

var listaraquivos = function () {

    $('.container').empty();

    $('<form>', {id: 'frm_arquivos'}).appendTo($('.container'));

    $('<table />', { id: 'tbl_arquivos'}).appendTo($('#frm_arquivos'));

    $.each($arquivos, function (i, l) {

        var $tr = $('<tr />', { id: l.Id });
        $tr.append(makeCheckBox(l.Id, 'arquivo'));
        $tr.append($('<td />').text(l.Descricao));        
        $tr.append($('<td />').text($.format.date(l.Atualizacao, "dd/MM/yy HH:mm")));
        $tr.append($('<td />').addClass('visualizar').text('ver'));
        $('#tbl_arquivos').append($tr);
        
    });

    $('.visualizar').on('click', function() { 
        window.location.href = '/api/arquivo/' + $(this).closest('tr').attr("id")
    });

    $('input:checkbox').change(podeApagar)

    $("#tbl_arquivos").on("click", "td", function() {
        if ( $( this ).text() == '')
            return;
        $arquivoEditando = $arquivos.find(x=>x.Id == $( this ).closest('tr').attr('id'))
        showForm($arquivoEditando)
   });

    $('#salvar').hide();
    $('#cancelar').hide();
    $('#novo').show();
    $('#voltar').show();
    $('#cancelar').hide();

    $('#loading').hide();
       
}

var showForm = function (arquivo) {
   
    $arquivoAtual = arquivo
   
    $('.container').empty();

//    arquivo.fodase = '';

    $form = $('<form />', { id: 'frm_cadastro', method: 'post', enctype: 'multipart/form-data' } ).appendTo($('.container'))

    $label = $('<label />');
    $('<span />').text('Descrição').appendTo($label)
    $('<input>')
        .attr('type', 'text')
        .attr('id', 'Descricao')
        .attr('name', 'Descricao')
        .attr('value', arquivo.Descricao)
        .appendTo($label);
    $form.append($label)

    $label = $('<label />');
    $('<span />').text('Versão').appendTo($label)
    $('<input>')
        .attr('type', 'text')
        .attr('id', 'Versao')
        .attr('name', 'Versao')
        .attr('value', arquivo.Versao)
        .appendTo($label);
    $form.append($label)

    $label = $('<label />');
    $('<span />').text('Arquivo').appendTo($label)
    $('<input>').attr('type', 'file').attr('id', 'arquivo').attr('name', 'arquivo').appendTo($label);
    $form.append($label)

    $div = $('<div />').addClass("checkedlistbox");
    $form.append($div)

    listarTripulantes($tripulantes, arquivo.Publicacao);

    $('#salvar').show();
    $('#cancelar').show();
    $('#novo').hide();
    $('#voltar').hide();

    $('#loading').hide();
    
}

var podeApagar = function()
{
       if ( $('input:checkbox:checked').length > 0 )
       {
            $("#novo").hide()   
            $("#apagar").show()
       }
       else
       {
            $("#apagar").hide()
            $("#novo").show()   
       }
}

var apagar = function()
{
    $.ajax({
        url:  '/api/arquivo',
        method: 'delete',
        data: new FormData($('#frm_arquivos')[0]),
        cache: false,
        contentType: false,
        processData: false,
        async: false,
        success: function(retorno){
            alert('Itens excluídos com sucesso!')
            window.location.href='/app/publicacao'
        },
    });
}


var enviarForm = function()
{
    if (!validarForm())
        return;

    $arquivoAtual.Descricao = $('#Descricao').val();
    $arquivoAtual.Versao = $('#Versao').val();

    $.each($arquivoAtual.Publicacao, function(i, l) {
        l.Ativo = $('.checkedlistbox').find('#_'+l.Tripulante.Id)[0].checked
    })

    $.each($('.checkedlistbox input:checkbox:checked'), function(i, l) {
        
        $tripulanteId = l.id.replace("_", "")

        if ($arquivoAtual.Publicacao == undefined)
            $arquivoAtual.Publicacao = [];

        if ( $arquivoAtual.Publicacao.find(x=>x.Tripulante.Id == $tripulanteId ) != undefined )
            return
        $publicacao = {}
        $publicacao.Tripulante = {}
        $publicacao.Tripulante.Id = $tripulanteId
        $publicacao.Arquivo = {}
        $publicacao.Arquivo.Id = $arquivoAtual.Id;
        $publicacao.Ativo = 1 
        $arquivoAtual.Publicacao.push($publicacao)
    })
        
    var formData = new FormData($('#frm_cadastro')[0]);
    formData.append('valtim', '1234');
    formData.append('obj', JSON.stringify($arquivoAtual));


    $('#loading').show();

    $.ajax({
        url:  '/api/arquivo',
        method: 'post',
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        async: false,
        success: function(retorno){
            alert('Salvo com sucesso')
            carregarArquivos();
            $('#loading').hide();
        },
    });
}

function CreateGuid() {  
   function _p8(s) {  
      var p = (Math.random().toString(16)+"000000000").substr(2,8);  
      return s ? "-" + p.substr(0,4) + "-" + p.substr(4,4) : p ;  
   }  
   return _p8() + _p8(true) + _p8(true) + _p8();  
}  

var prepararInterface = function()
{
    $('#titulo').text("Biblioteca");

//    $('#voltar').text('<');

//    $('#salvar').text('Salvar');
    $('#salvar').toggle();

//    $('#cancelar').text('Cancelar');
    $('#cancelar').toggle();


//    $('#novo').text('+');

    //$('#apagar').text('Apagar');
    $('#apagar').toggle();

    $('#apagar').on('click', apagar);

    $('#novo').on('click', function(){
        novoarquivo = {}
        novoarquivo.Id = CreateGuid()
        showForm(novoarquivo)
    })
     $('#cancelar').on('click', function(){         
         listaraquivos()
     })
    $('#voltar').on('click', function () { window.location.href = '/app' })
    $('#salvar').on('click', enviarForm)       


}

var abrirFormulario = function()
{

}

var carregarArquivos = function(){
    $.ajax({
        url: '/api/arquivo', 
        headers: {
            token: localStorage.getItem("token"),
        },
        success: function(data)
        {
            $arquivos = data;
            listaraquivos()
            console.log('Lista de Arquivos OK')
        },
        error: function(e) { 
        alert(e); 
        }
    });

}


$(document).ready(function () {

     //criarForm({})

    carregarArquivos()

    $.ajax({
        url: '/api/tripulante',
        headers: {
            token: localStorage.getItem("token"),
        },
        success: function(data)
        {
            $tripulantes = data;
            console.log('Lista de Tripulantes OK')
        },
        error: function (e) {
            if ( e.status == 403)
            {
                alert('Login Expirado, por favor entre com usuário e senha novamente')
                window.location.href = '/app/login';
                return;
            }

            alert(e.statusText);
        }
    });


    prepararInterface()
    

        
})