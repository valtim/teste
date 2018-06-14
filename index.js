var URL = window.location.origin === "http://localhost:8080" ? "https://teste.sistemasol.com.br" : "";

var logoff = function () {

    $.get({
        url: '/api/exit',
        headers: {
            token: localStorage.getItem("token"),
        },
        method: 'get',
        success: function (e) {
            window.location.href = '/app/login/index.html?page=' + window.location
        },
        error: function (e) {
            //alert('Login expirado. Redirecionando...')
            console.log(e.status)
            window.location.href = '/app/login/index.html?page=' + window.location
        }
    });
}

var logoffOK = function () {
    window.location.href = '/app/login';
};

$links = [ // id, nome, caminho
    //['Gerenciar Publicações', function () { window.location.href = '/app/publicacao' }],
    //['Minhas Publicações', function () { window.location.href = '/app/minhaspublicacoes' }],
    ['Diário de Bordo', function () { window.location.href = '/app/diario/db' }],
    //['Relatório DB', function () { window.location.href = '/app/relatorio_db' }],
    ['Relatório Tripulante', function () { window.location.href = '/app/relatorio_tripulante' }],
    ['Papeleta', function () { window.location.href = '/app/papeleta' }],
    //['Escala de Voo', function () { window.location.href = '/app/escala' }],
    //['Despacho', function () { window.location.href = '/app/despacho' }],
    [' ', function () { }],
    ['Trocar Minha Senha', logoff],
    ['Logoff', logoff]
]


function iniciarDocumento() {
    $('#logoff').on('click', logoff);
    $('#titulo').text("SOL");
}

function gerarLinks() {
    $tabela = $("<table />");

    $.each($links, function (index, value) {
        $td = $("<td />", { id: index }).text(value[0]);
        $tabela.append($('<tr />').append($td))
    })

    $('body').append($tabela)

    //$(this).attr('id')
    //$links[$(this).attr('id')][1])
    $("table").on("click", "td", function () {
        $links[$(this).attr('id')][1]()
    });
}



var carregarMenu = function (itens) {

    $links = itens;

    $tabela = $("<table />");

    $.each(itens, function (index, value) {
        $td = $("<td />", { id: index }).text(value['Nome']);
        $tabela.append($('<tr />').append($td));
    });

    $('body').append($tabela)

    //$(this).attr('id')
    //$links[$(this).attr('id')][1])
    $("table").on("click", "td", function () {
        window.location.href = $links[$(this).attr('id')]['Caminho']
    });
    $('#loading').hide();
}

var validarToken = function () {
    $.get({
        url: URL + '/api/menu',
        headers: {
            token: localStorage.getItem("token"),
        },
        method: 'get',
        success: function (e) {
            //alert()
            carregarMenu(e);
        },
        error: function (e) {
            if (e.status === 403) {
                window.location.href = '/app/login/index.html?page=' + window.location;
            }
        }
    });
}

$(document).ready(function () {
    //$('#loading').toggle();
    $('#loading').show();
    validarToken();
    iniciarDocumento();
    //gerarLinks()

    // $('#loading').toggle()
});

