function carregarDiario(diario) {
    var body = document.getElementById('tabela-responsiva');
    body.innerHTML = '';
    var tbl = document.createElement('table');
    var tbdy = document.createElement('tbody');

    var tr = document.createElement('tr');
    tr.appendChild(newTH('#', "headcol"));
    tr.appendChild(newTH('DE'));
    tr.appendChild(newTH('PARA'));
    tr.appendChild(newTH('PARTIDA'));
    tr.appendChild(newTH('DECOLAGEM'));
    tr.appendChild(newTH('POUSO'));
    tr.appendChild(newTH('CORTE'));
    tbdy.appendChild(tr);

    diario.Linhas.forEach(function (linha) {
        tbdy.appendChild(carregarLinha(linha));
    });


    /*
    
        diario.Linhas.forEach(function(linha){
               var tr = document.createElement('tr');
               var td = document.createElement('td');
               td.appendChild(document.createTextNode(linha.Id));           
               tr.appendChild(td);
               tbdy.appendChild(tr);
            });
    
    */
    tbl.appendChild(tbdy);
    body.appendChild(tbl);
}

function newTH(conteudo, classe) {
    var th = document.createElement('th');
    th.innerText = conteudo;

    if (classe !== undefined)
        th.setAttribute("class", "headcol");
    return th;
}

function campoParaTd(obj, nomeDoCampo, classe) {
    var td = document.createElement('td');

    if (obj[nomeDoCampo] == undefined)
        return td;
    var td = document.createElement('td');
    td.innerText = obj[nomeDoCampo];

    if (classe !== undefined)
        td.setAttribute("class", "headcol");
    //tr.appendChild(td);
    return td;
}

function carregarLinha(linha) {
    var tr = document.createElement('tr');
    tr.appendChild(campoParaTd(linha, "OrdemDeExibicao", "headcol"));
    tr.appendChild(campoParaTd(linha, "OrigemDeclarada"));
    tr.appendChild(campoParaTd(linha, "DestinoDeclarado"));
    tr.appendChild(campoParaTd(linha, "Partida"));
    tr.appendChild(campoParaTd(linha, "Decolagem"));
    tr.appendChild(campoParaTd(linha, "Pouso"));
    tr.appendChild(campoParaTd(linha, "Corte"));
    return tr;
}

window.onload = function () {
    var id = getUrlParameter('id');

    try {
        var diario = JSON.parse(localStorage.getItem("diarios")).find(function (x) { return x.Id === id; });
        carregarDiario(diario);
        //calcularDatas()
    }
    catch (err) {
        alert(err);
    }
};

