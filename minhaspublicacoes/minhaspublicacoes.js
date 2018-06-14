var $arquivos = null;
var $arquivoAtual = null;


var buscarArquivosNoServidor = function () {
    $.get({
        url: '/api/arquivo/meusarquivos',
        headers: {
            token: localStorage.getItem("token"),
        },
        method: 'get',
        success: function (e) {
            gerarLista(e)

        },
        error: function (e) {
            //alert('Login expirado. Redirecionando...')
            console.log(e.status)
            //window.location.href = '/app/login/index.html?page=' + window.location
        }
    });
}

var exibirArquivo = function (arquivo) {

    $arquivoAtual = arquivo

    $('#voltar').unbind( "click" );
    $('#voltar').on('click', function () { buscarArquivosNoServidor() })

    $('.container').empty()

    $tabela = $('<table />', { id: 'tbl_arquivos' }).appendTo($('.container'));

    $("#tbl_arquivos").on("click", "tr", function () {
        if ( $(this).attr('class') == 'baixar') 
        {
            $arquivoAtual.Acessado = true
            $arquivoAtual.DataDeAcesso = $.now()
            exibirArquivo($arquivoAtual)
            window.open('/api/arquivo/' + $arquivoAtual.Id + '/' + localStorage.getItem("token"));
        }

        if ( $(this).attr('class') == 'confirmar' ) 
        {
            $('#loading').show();

            $arquivoAtual.Confirmado = true
            $arquivoAtual.DataDeConfirmacao = $.now()
            exibirArquivo($arquivoAtual)

            $.get({
                url: '/api/arquivo/confirmacao/' + $arquivoAtual.Id + '/' + localStorage.getItem("token"),
                headers: {
                    token: localStorage.getItem("token"),
                },
                method: 'get',
                success: function (e) {
                    alert('Leitura confirmada')
                    $('#loading').hide();
                },
                error: function (e) {
                    //alert('Login expirado. Redirecionando...')
                    console.log(e.status)
                    $('#loading').hide();
                    //window.location.href = '/app/login/index.html?page=' + window.location
                }
            });

            //window.open('/api/arquivo/' + $arquivoAtual.Id + '/' + localStorage.getItem("token"));

        }
            //window.open('/api/arquivo/confirmacao/' + $arquivoAtual.Id + '/' + localStorage.getItem("token"));
    });

    $tabela.append(
        $('<tr />').attr('class', 'baixar').append(
            $('<td />').attr('colspan', 2).text(arquivo.Descricao)
        )
        
    )
    
    $tr = $('<tr />').attr('class', 'baixar');

    if (arquivo.Acessado)
        $tr.append(
            $('<td />').text('Acessado em:' + $.format.date(arquivo.DataDeAcesso, "dd/MM/yy HH:mm"))
        )
    else {
        $td = $('<td />')
        $('<p/>').text('Arquivo não acessado').appendTo($td)
        $('<p/>').text('Clique para acessar').appendTo($td)
        $tr.append($td)
    }

     $td = $('<td />')
    
    clone = $('#download').clone(true)
    clone.show()
    $(clone).appendTo($td);
    
    $tr.append($td);

    $tabela.append($tr);



    if (!arquivo.Acessado)
        return;

    $tr = $('<tr />').attr('class', 'confirmar');

    if (arquivo.Confirmado)
        $tr.append(
            $('<td />').text('Confirmado em:' + $.format.date(arquivo.DataDeConfirmacao, "dd/MM/yy HH:mm"))
        )
    else
    {
        $td = $('<td />')
        $('<p/>').text('Arquivo não confirmado').appendTo($td)
        $('<p/>').text('Clique para confirmar').appendTo($td)
        $tr.append($td)
    }

        


    $td = $('<td />')
    if (arquivo.Acessado) {
        clone = $('#confirmado').clone(true)
        clone.show()
        $(clone).appendTo($td);
    }

    $tr.append($td);

    $tabela.append($tr);


    
}

var gerarLista = function(lista) {    

    $('.container').empty();

    $('#voltar').unbind( "click" );
    $('#voltar').on('click', function() { window.location.href='/app'})

    $arquivos = lista;

    $('<table />', { id: 'tbl_arquivos' }).appendTo($('.container'));    

    $.each(lista, function (i, l) {

        $lido = $('<td />')
        if ( l.Acessado )
        {
            clone = $('#download').clone(true)
            clone.show()
            //$('<img />').attr('src','/app/img/favicon-32x32.png').appendTo($lido);
            $(clone).appendTo($lido);
        }

        $confirmado = $('<td />')
        if ( l.Acessado )
        {
            clone = $('#confirmado').clone(true)
            clone.show()
            //$('<img />').attr('src','/app/img/favicon-32x32.png').appendTo($lido);
            $(clone).appendTo($confirmado);
        }
    
        var $tr = $('<tr />', { id: l.Id });
        $tr.append($('<td />').text(l.Descricao));        
        //$tr.append($('<td />').text($.format.date(l.Atualizacao, "dd/MM/yy HH:mm")));          
        $tr.append($lido)
        $tr.append($confirmado);
        //$tr.append(makeCheckBox(l.Id, 'arquivo'));
        $('#tbl_arquivos').append($tr);
        
    });

    
    $("#tbl_arquivos").on("click", "tr", function() {
    if ( $( this ).text() == '')
        return;
    var $arquivo = $arquivos.find(x=>x.Id == $( this ).attr('id'))
    //alert($arquivo)
    exibirArquivo($arquivo);
        //window.location.href = '/api/arquivo/' + $(this).closest('tr').attr("id") +'/'+localStorage.getItem("token")
    });

$('#loading').hide();
}


$(document).ready(function () {
    $('#loading').show();

    $('#titulo').text("Minhas Publicações");
    

    buscarArquivosNoServidor();

    $('#zoio').hide();
    $('#download').hide();
    $('#confirmado').hide();
    $('#nao_confirmado').hide();
    


});

