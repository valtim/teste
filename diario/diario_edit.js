var URL = window.location.origin === "http://localhost:8080" ? "https://teste.sistemasol.com.br" : "";

function isDate(val) {
    if (val === null) {
        return false;
    }
    var d = new Date(val);
    return !isNaN(d.valueOf());
}

var $diario = null;

var retornaDiv = function (texto, campo) {
    $div = $('<div />');

    $('<label />')
        .attr('for', campo.attr('id'))
        .text(texto)
        .appendTo($div);

    $div.append(campo);
    return $div;
};

var getValor = function (caminho) {
    var res = caminho.split('/');
    if (res.length === 3) {
        return $diario[res[0]][res[1]][res[2]];
    }

    return $diario[res[0]];
};

var setValor = function (caminho, valor) {
    var res = caminho.split('/');

    if (res.length === 3) {
        $diario[res[0]][res[1]][res[2]] = valor;
        return;
    }

    $diario[res[0]] = valor;
};

var novaComboEspecial = function (id, databind, opcoes, key, desc, valorPadrao, readonly) {
    var retorno = novaCombo(id, databind, opcoes, key, desc, valorPadrao, readonly);

    if (getValor(databind) !== undefined) {
        retorno.val(getValor(databind));
    }
    return retorno;
};

var novaCombo = function (id, databind, opcoes, key, desc, valorPadrao, readonly) {
    if (readonly === undefined) {
        readonly = false;
    }

    if ($diario.Fechado) {
        readonly = true;
    }

    if (valorPadrao === undefined) {
        valorPadrao = 'Selecione uma opção';
    }

    $select = $('<select />')
        .attr('id', id)
        .prop('disabled', readonly)
        .attr('data-bind', databind);

    $('<option />')
        .attr('value', '')
        .text(valorPadrao)
        .appendTo($select);

    $.each(opcoes, function (item, value) {
        $('<option />')
            .attr('value', value[key])
            .text(value[desc])
            .appendTo($select);

    });

    if (getValor(databind) !== undefined) {
        $select.val(getValor(databind)[key]);
    }

    return $select;
};


var novaCheckbox = function (id, valor, databind, readonly) {

    if (readonly === undefined) {
        readonly = false;
    }

    if ($diario.Fechado) {
        readonly = true;
    }

    return $('<input/>')
        .attr('type', 'checkbox')
        .attr('id', id)
        .attr('data-bind', databind)
        .prop('disabled', readonly)
        .attr('checked', getValor(databind))
        .appendTo($div);
};

var novaData = function (id, valor, databind, readonly) {

    if (readonly === undefined) {
        readonly = false;
    }

    if ($diario.Fechado) {
        readonly = true;
    }

    return $('<input />').attr('type', 'date')
        .attr('id', id)
        .attr('data-bind', databind)
        .prop('readonly', readonly)
        .val($.format.date(valor[databind], "yyyy-MM-dd"));
};

var novaHora = function (id, databind, readonly) {
    if (readonly === undefined) {
        readonly = false;
    }

    if ($diario.Fechado) {
        readonly = true;
    }

    return $('<input />').attr('type', 'tel')
        .attr('id', id)
        .attr('maxlength', 5)
        .attr('data-bind', databind)
        .prop('readonly', readonly)
        .attr('class', 'hora')
        .val($.format.date(getValor(databind), "HH:mm"));
};

var novoInteiro = function (id, databind, readonly) {
    if (readonly === undefined) {
        readonly = false;
    }

    if ($diario.Fechado) {
        readonly = true;
    }

    return $('<input />').attr('type', 'tel')
        .attr('id', id)
        .attr('data-bind', databind)
        .attr('class', 'inteiro')
        .prop('readonly', readonly)
        .val(getValor(databind));
};

var novoTexto = function (id, databind, readonly) {
    if (readonly === undefined) {
        readonly = false;
    }

    if ($diario.Fechado) {
        readonly = true;
    }

    return $('<input />').attr('type', 'text')
        .attr('id', id)
        .attr('data-bind', databind)
        .prop('readonly', readonly)
        .val(getValor(databind));
};

var novaTextArea = function (id, databind, linhas, readonly) {
    if (readonly === undefined) {
        readonly = false;
    }

    if ($diario.Fechado) {
        readonly = true;
    }

    return $('<textarea />').attr('type', 'text')
        .attr('id', id)
        .attr('data-bind', databind)
        //.attr('cols', colunas)
        .attr('rows', linhas)
        .prop('readonly', readonly)
        .val(getValor(databind));
};

var novoNumero = function (id, valor, databind, readonly) {
    if (readonly === undefined) {
        readonly = false;
    }

    if ($diario.Fechado) {
        readonly = true;
    }

    return $('<input />').attr('type', 'number')
        .attr('id', id)
        .attr('data-bind', databind)
        .prop('readonly', readonly)
        .val(valor[databind], "HH:mm");
};

var carregarDiario = function (diario) {

    $('<div />')
        .attr('id', 'primeira_pagina')
        .appendTo(".container");

    $('<div />')
        .addClass('titulo_pagina')
        .text('Primeira Pagina')
        .appendTo("#primeira_pagina");

    $('<div />')
        .addClass('duas_colunas')
        .attr('id', 'cabecalho')
        .appendTo("#primeira_pagina");


    retornaDiv('Data', novaData('dtData', $diario, 'DataDoDiario'))
        .appendTo($('#cabecalho'));


    retornaDiv('Prefixo', novaCombo('cmbPrefixo', 'Prefixo', JSON.parse(localStorage.getItem("Prefixo")), 'Id', 'PrefixoCompleto', 'Prefixo'))
        .appendTo($('#cabecalho'));

    retornaDiv('Nº Diário', novoTexto('txtDiario', 'NumeroDoDiario'))
        .appendTo($('#cabecalho'));

    retornaDiv('Folha Diário', novoTexto('txtFolha', 'NumeroDaFolha'))
        .appendTo($('#cabecalho'));

    retornaDiv('Refeição', novaHora('hrRefeicaoTrip2', 'Refeicao2'))
        .appendTo($('#tripulantes'));

    retornaDiv('Fechar', novaCheckbox('chkFechar', $diario, 'Fechado'))
        .appendTo($('#cabecalho'));

    retornaDiv('Cancelar', novaCheckbox('chkCancelar', $diario, 'Cancelada'))
        .appendTo($('#cabecalho'));

    $('<div />')
        .addClass('titulo_pagina')
        .text('Base')
        .appendTo("#primeira_pagina");

    $('<div />')
        .addClass('tres_colunas')
        .attr('id', 'basedeoperacao')
        .appendTo("#primeira_pagina");

    retornaDiv('Base ', novoTexto('txtBaseDeOperacao', 'BaseDeOperacao'))
        .appendTo($('#basedeoperacao'));

    retornaDiv('Nascer ', novaHora('txtNascer', '', 'readonly'))
        .appendTo($('#basedeoperacao'));

    retornaDiv('Por ', novaHora('txtPor', '', 'readonly'))
        .appendTo($('#basedeoperacao'));

    $('<div />')
        .addClass('titulo_pagina')
        .text('Hora de Apresentação')
        .appendTo("#primeira_pagina");

    $('<div />')
        .addClass('tres_colunas')
        .attr('id', 'tripulantes')
        .appendTo("#primeira_pagina");

    retornaDiv('Tripulante 1', novaCombo('cmbTrip1', 'Trip1', JSON.parse(localStorage.getItem("Tripulante")), 'Id', 'Trato', 'Tripulante'))
        .appendTo($('#tripulantes'));

    retornaDiv('Refeição', novaHora('hrRefeicaoTrip1', 'Refeicao1'))
        .appendTo($('#tripulantes'));

    retornaDiv('Apresentação', novaHora('hrApresTrip1', 'HoraDeApresentacao1'))
        .appendTo($('#tripulantes'));


    retornaDiv('Tripulante 2', novaCombo('cmbTrip2', 'Trip2', JSON.parse(localStorage.getItem("Tripulante")), 'Id', 'Trato', 'Tripulante'))
        .appendTo($('#tripulantes'));

    retornaDiv('Refeição', novaHora('hrRefeicaoTrip2', 'Refeicao2'))
        .appendTo($('#tripulantes'));

    retornaDiv('Apresentação', novaHora('hrApresTrip2', 'HoraDeApresentacao2'))
        .appendTo($('#tripulantes'));

    retornaDiv('Tripulante 3', novaCombo('cmbTrip3', 'Trip3', JSON.parse(localStorage.getItem("Tripulante")), 'Id', 'Trato', 'Tripulante'))
        .appendTo($('#tripulantes'));

    retornaDiv('Refeição', novaHora('hrRefeicaoTrip3', 'Refeicao3'))
        .appendTo($('#tripulantes'));

    retornaDiv('Apresentação', novaHora('hrApresTrip3', 'HoraDeApresentacao3'))
        .appendTo($('#tripulantes'));

    retornaDiv('Tripulante 4', novaCombo('cmbTrip4', 'Trip4', JSON.parse(localStorage.getItem("Tripulante")), 'Id', 'Trato', 'Tripulante'))
        .appendTo($('#tripulantes'));

    retornaDiv('Refeição', novaHora('hrRefeicaoTrip4', 'Refeicao4'))
        .appendTo($('#tripulantes'));

    retornaDiv('Apresentação', novaHora('hrApresTrip4', 'HoraDeApresentacao4'))
        .appendTo($('#tripulantes'));

    $('<div />')
        .addClass('titulo_pagina')
        .text('Performance')
        .appendTo("#primeira_pagina");

    $('<div />')
        .addClass('duas_colunas')
        .attr('id', 'pnPerformance')
        .appendTo("#primeira_pagina");

    retornaDiv('OAT', novoNumero('txtOAT', $diario, 'OAT'))
        .appendTo($('#pnPerformance'));

    retornaDiv('Q (%)', novoNumero('txtQ', $diario, 'Q'))
        .appendTo($('#pnPerformance'));

    retornaDiv('N1 #1', novoNumero('txtN1_1', $diario, 'N1_1'))
        .appendTo($('#pnPerformance'));

    retornaDiv('N1 #2', novoNumero('txtN1_2', $diario, 'N1_2'))
        .appendTo($('#pnPerformance'));

    retornaDiv('T5 #1', novoNumero('txtT5_1', $diario, 'T5_1'))
        .appendTo($('#pnPerformance'));

    retornaDiv('T5 #2', novoNumero('txtT5_2', $diario, 'T5_2'))
        .appendTo($('#pnPerformance'));

    retornaDiv('RPM', novoNumero('txtRPM', $diario, 'RPM'))
        .appendTo($('#pnPerformance'));

    retornaDiv('TGT', novoNumero('txtTGT', $diario, 'TGT'))
        .appendTo($('#pnPerformance'));

    $.each($diario.Linhas, function (i, n) {
        var idx = i + 1;

        $('<div />')
            .addClass('titulo_pagina')
            .text('Linha ' + idx + ' de ' + $diario.Linhas.length)
            .appendTo(("#primeira_pagina"));


        $('<div />')
            .addClass('duas_colunas')
            .addClass('sessao')
            .attr('id', 'pnLinha_' + idx)
            .appendTo("#primeira_pagina");


        retornaDiv('De', novoTexto('txtDe', 'Linhas/' + i + '/OrigemDeclarada'))
            .appendTo($('#pnLinha_' + idx));

        retornaDiv('Para', novoTexto('txtPara', 'Linhas/' + i + '/DestinoDeclarado'))
            .appendTo($('#pnLinha_' + idx));

        retornaDiv('Partida', novaHora('hrPartida', 'Linhas/' + i + '/Partida'))
            .appendTo($('#pnLinha_' + idx));

        retornaDiv('Decolagem', novaHora('hrDecolagem', 'Linhas/' + i + '/Decolagem'))
            .appendTo($('#pnLinha_' + idx));

        retornaDiv('Pouso', novaHora('hrPouso', 'Linhas/' + i + '/Pouso'))
            .appendTo($('#pnLinha_' + idx));

        retornaDiv('Corte', novaHora('hrCorte', 'Linhas/' + i + '/Corte'))
            .appendTo($('#pnLinha_' + idx));

        retornaDiv('Diurno', novaHora('hrDiurno', '', true).addClass('hrDiurno'))
            .appendTo($('#pnLinha_' + idx));

        retornaDiv('Noturno', novaHora('hrNoturno', 'Linhas/' + i + '/Noturno').addClass('hrNoturno'))
            .appendTo($('#pnLinha_' + idx));

        retornaDiv('IFR Capota', novaHora('hrIFRC', 'Linhas/' + i + '/IFRC').addClass('hrIFRC'))
            .appendTo($('#pnLinha_' + idx));

        retornaDiv('IFR Real', novaHora('hrIFRR', 'Linhas/' + i + '/IFRR').addClass('hrIFRR'))
            .appendTo($('#pnLinha_' + idx));

        retornaDiv('VFR', novaHora('hrVFR', '', true))
            .appendTo($('#pnLinha_' + idx));

        retornaDiv('Total', novaHora('hrTotal', '', true).addClass('hrTotal'))
            .appendTo($('#pnLinha_' + idx));

        retornaDiv('Pousos', novoInteiro('nrPousos', 'Linhas/' + i + '/Pousos').addClass('nrPousos'))
            .appendTo($('#pnLinha_' + idx));

        retornaDiv('Ciclos', novoInteiro('nrCiclos', 'Linhas/' + i + '/Ciclos').addClass('nrCiclos'))
            .appendTo($('#pnLinha_' + idx));

        retornaDiv('Pax (Número)', novoInteiro('nrPax', 'Linhas/' + i + '/Pax'))
            .appendTo($('#pnLinha_' + idx));

        retornaDiv('Carga (Kg)', novoInteiro('nrCarga', 'Linhas/' + i + '/Carga'))
            .appendTo($('#pnLinha_' + idx));

        retornaDiv('Natureza', novaComboEspecial('cmbNatureza', 'Linhas/' + i + '/Natureza', JSON.parse(localStorage.getItem("Natureza")), 'Id', 'Nome', 'Natureza'))
            .appendTo($('#pnLinha_' + idx));

        retornaDiv('Cliente', novaCombo('cmbCliente', 'Linhas/' + i + '/Cliente', JSON.parse(localStorage.getItem("Cliente")), 'Id', 'Nome', 'Cliente'))
            .appendTo($('#pnLinha_' + idx));

        retornaDiv('Tripulante 1', novaCombo('cmbComandante', 'Linhas/' + i + '/Comandante', JSON.parse(localStorage.getItem("Tripulante")), 'Id', 'Trato', 'Tripulante 1'))
            .appendTo($('#pnLinha_' + idx));

        retornaDiv('Tripulante 2', novaCombo('cmbPrimeiroOficial', 'Linhas/' + i + '/PrimeiroOficial', JSON.parse(localStorage.getItem("Tripulante")), 'Id', 'Trato', 'Tripulante 2'))
            .appendTo($('#pnLinha_' + idx));

        retornaDiv('Função 1', novaCombo('FuncaoTrip1', 'Linhas/' + i + '/Funcao1', JSON.parse(localStorage.getItem("FuncaoBordo")), 'Id', 'Nome', 'Função 1'))
            .appendTo($('#pnLinha_' + idx));

        retornaDiv('Função 2', novaCombo('FuncaoTrip2', 'Linhas/' + i + '/Funcao2', JSON.parse(localStorage.getItem("FuncaoBordo")), 'Id', 'Nome', 'Função 2'))
            .appendTo($('#pnLinha_' + idx));

        retornaDiv('Comb. na Decolagem(Lb)', novoInteiro('nrFuelDec', 'Linhas/' + i + '/FuelDec'))
            .appendTo($('#pnLinha_' + idx));

        retornaDiv('Comb. no Pouso(Lb)', novoInteiro('nrFuelPou', 'Linhas/' + i + '/FuelPou'))
            .appendTo($('#pnLinha_' + idx));

        retornaDiv('Consumo de Combustível', novoInteiro('nrConsumoCombustivel', '', true).addClass('nrConsumoCombustivel'))
            .appendTo($('#pnLinha_' + idx));

        retornaDiv('Comb. Abastecido (Litros)', novoInteiro('nrQuantidadeAbastecida', 'Linhas/' + i + '/QuantidadeAbastecida'))
            .appendTo($('#pnLinha_' + idx));


        retornaDiv('Nota de Abastecimento', novoTexto('nrNotaDeAbastecimento', 'Linhas/' + i + '/NotaDeAbastecimento'))
            .appendTo($('#pnLinha_' + idx));

        retornaDiv('Abastecedora', novaCombo('cmbAbastecedora', 'Linhas/' + i + '/Abastecedora', JSON.parse(localStorage.getItem("Abastecedora")), 'Id', 'Nome', 'Abastecedora'))
            .appendTo($('#pnLinha_' + idx));


        retornaDiv('Decolagem Noturna', novaCheckbox('chkDecolagemNoturna', $diario, 'Linhas/' + i + '/DecolagemNoturna', 'readonly'))
            .appendTo($('#pnLinha_' + idx));

        retornaDiv('Pouso Noturno', novaCheckbox('chkPousoNoturno', $diario, 'Linhas/' + i + '/PousoNoturno', 'readonly'))
            .appendTo($('#pnLinha_' + idx));

        retornaDiv('Pouso Offshore', novaCheckbox('chkPousoOffshore', $diario, 'Linhas/' + i + '/PousoOffshore', 'readonly'))
            .appendTo($('#pnLinha_' + idx));

        retornaDiv('Voo Ifr', novaCheckbox('chkVooIfr', $diario, 'Linhas/' + i + '/VooIFR', 'readonly'))
            .appendTo($('#pnLinha_' + idx));
    });


    $('<div />')
        .addClass('titulo_pagina')
        .text('Ocorrências')
        .appendTo(("#primeira_pagina"));


    retornaDiv('Ocorrências', novaTextArea('nrOcorrencias', 'Ocorrencias', 5).addClass("ocorrencia"))
        .appendTo($('#primeira_pagina'));

    $('<div />')
        .addClass('titulo_pagina')
        .text('Totais')
        .appendTo(("#primeira_pagina"));


    $('<div />')
        .addClass('duas_colunas')
        .attr('id', 'pnTotais')
        .appendTo("#primeira_pagina");

    retornaDiv('Diurno', novaHora('TotalDiurno', '', true))
        .appendTo($('#pnTotais'));

    retornaDiv('Noturno', novaHora('TotalNoturno', '', true))
        .appendTo($('#pnTotais'));

    retornaDiv('IFR Capota', novaHora('TotalIFRC', '', true))
        .appendTo($('#pnTotais'));

    retornaDiv('IFR Real', novaHora('TotalIFRR', '', true))
        .appendTo($('#pnTotais'));

    retornaDiv('Total', novaHora('TotalHorasGeral', '', true))
        .appendTo($('#pnTotais'));

    retornaDiv('Pousos', novoInteiro('TotalPousos', '', true))
        .appendTo($('#pnTotais'));

    retornaDiv('Ciclos', novoInteiro('TotalCiclos', '', true))
        .appendTo($('#pnTotais'));

    retornaDiv('Consumo Combustível', novoInteiro('TotalConsumoCombustivel', '', true))
        .appendTo($('#pnTotais'));
};

var setarCombo = function (obj) {

    //$databind = obj.attr('data-bind')
    //console.log($databind);
    //console.log('antes:' + $diario[$databind].Id);

    var res = obj.attr('data-bind').split('/');

    if (res.length === 3) {
        if (obj[0].id === 'cmbNatureza') {
            $diario[res[0]][res[1]][res[2]] = obj.val();
            console.log('ficou: ' + $diario[res[0]][res[1]][res[2]]);
            return;
        }
        $diario[res[0]][res[1]][res[2]] = { Id: obj.val() };
        console.log('ficou: ' + $diario[res[0]][res[1]][res[2]].Id);
    }
    else {
        $diario[obj.attr('data-bind')] = { Id: obj.val() };
        console.log('ficou: ' + $diario[obj.attr('data-bind')].Id);
    }
};

var setarCheckbox = function (obj) {
    $databind = obj.attr('data-bind');
    console.log($databind);
    console.log('antes:' + $diario[$databind]);
    $diario[$databind] = obj.prop('checked');
    console.log('ficou: ' + $diario[$databind]);
};

var setarInput = function (obj) {
    $databind = obj.attr('data-bind');
    console.log($databind);
    console.log('antes:' + getValor($databind));
    setValor($databind, obj.val());
    console.log('ficou: ' + getValor($databind));
};

var setarHora = function (obj) {
    var valorDigitado = '0000' + obj.val().replace(':', '');
    var valorCortado = valorDigitado.substr(valorDigitado.length - 4);
    var valorFormatado = '';
    var horas = valorCortado.substr(0, 2);
    if (horas > 23) {
        horas = 23;
    }
    var minutos = valorCortado.substr(2, 4);
    if (minutos > 59) {
        minutos = 59;
    }
    obj.val(horas + ':' + minutos);
    $databind = obj.attr('data-bind');
    console.log($databind);
    console.log('antes:' + getValor($databind));
    setValor($databind, obj.val());
    console.log('ficou: ' + getValor($databind));
};

var mudouValor = function (obj) {
    if (obj.attr('type') === 'checkbox') {
        setarCheckbox(obj);
        return;
    }

    if (obj.hasClass('hora')) {
        setarHora(obj);
        return;
    }

    setarInput(obj);
};

var salvar = function () {
    $('#loading').show();
    $.ajax({
        method: "POST",
        url: URL + "/api/novodiario",
        headers: {
            token: localStorage.getItem("token"),
        },
        data: $diario
    })
        .done(
            function (msg) {
                alert("Diário Salvo");
                $('#loading').hide();
            })
        .fail(function (e) {
            console.log("URL: ", URL + "/api/novodiario");
            console.log("e: ", e.message);
            // alert("Erro ao salvar. Se o problema persistir entre em contato com o Suporte. \n contato@sistemasol.com.br");
        });
};

function somarHoras(a, b) {
    var r = hourObject(DEF_HOUR);
    if (validHours(a, b)) {
        a = hourObject(a);
        b = hourObject(b);
        r.hours = a.hours + b.hours;
        r.minutes = a.minutes + b.minutes;
        r.hours += (r.minutes > 60) ? 1 : 0;
        r.minutes -= (r.minutes > 60) ? 60 : 0;
        r.hours -= (r.hours > 24) ? 24 : 0;
    }
    return hourString(r);
}

var stringParaData = function (string) {
    var hora = string.substr(0, 2);
    var minuto = string.substr(3, 4);
    return new Date(0, 0, 0, hora, minuto, 0);
};

var stringParaMinutos = function (str) {
    if (str === '') {
        return parseInt(0);
    }

    if (str === '00:00') {
        return parseInt(0);
    }

    var hora = parseInt(str.substr(0, 2));
    var minuto = parseInt(str.substr(3, 4));
    return parseInt((60 * hora) + minuto);
};

var minutosParaHoras = function (valor) {
    if (isNaN(parseInt(valor))) {
        return '00:00';
    }

    var minutos = '0' + valor % 60;
    var horas = '0' + (valor - minutos) / 60;
    return horas.substr(horas.length - 2) + ':' + minutos.substr(minutos.length - 2);
};


var calcularDatas = function () {
    var vNascerDoSol = stringParaMinutos($('#txtNascer').val());
    var vPorDoSol = stringParaMinutos($('#txtPor').val());

    $.each($('.sessao'), function () {
        //$(this)
        var combDec = parseInt($(this).find('#nrFuelDec').val());
        var combPou = parseInt($(this).find('#nrFuelPou').val());

        if (!isNaN(combDec) && !isNaN(combPou)) {
            $(this).find('#nrConsumoCombustivel').val(combDec - combPou);
        } else {
            $(this).find('#nrConsumoCombustivel').val(0);
        }

        var vPartida = stringParaMinutos($(this).find('#hrPartida').val());
        var vDecolagem = stringParaMinutos($(this).find('#hrDecolagem').val());
        var vPouso = stringParaMinutos($(this).find('#hrPouso').val());
        var vCorte = stringParaMinutos($(this).find('#hrCorte').val());

        if (vPartida === 0) {
            vPartida = vDecolagem;
        }

        if (vCorte === 0) {
            vCorte = vPouso;
        }

        var vooDeManutencao = ((vPartida !== 0 && vDecolagem === 0) && (vPouso === 0 && vCorte !== 0));

        if (vDecolagem === 0 && !vooDeManutencao) return;

        if (!vooDeManutencao) {
            if (vDecolagem - vPartida > 20) {
                alert('O tempo entre PARTIDA e DECOLAGEM superou 20 minutos, confira se os valores estão corretos.');
            }

            if (vCorte - vPouso > 20) {
                alert('O tempo entre POUSO e CORTE superou 20 minutos, confira se os valores estão corretos.');
            }

            if (vPartida > vDecolagem) {
                alert('Horário de DECOLAGEM mais cedo que PARTIDA');
                return;
            }

            if (vPouso === 0) return;

            if (vDecolagem > vPouso) {
                alert('Horário de POUSO mais cedo que DECOLAGEM');
                return;
            }

            if (vPouso > vCorte) {
                alert('Horário de CORTE mais cedo que POUSO');
                return;
            }
        }

        var vIFRR = stringParaMinutos($(this).find('#hrIFRR').val());
        var vIFRC = stringParaMinutos($(this).find('#hrIFRC').val());
        var Total = (vDecolagem - vPartida) + (vPouso - vDecolagem) + (vCorte - vPouso);
        var vNoturno = 0;
        if (vPartida < vNascerDoSol) {
            vNoturno = vNascerDoSol - vPartida;
        }

        if (vCorte > vPorDoSol) {
            vNoturno = vNoturno + (vCorte - vPorDoSol);
        }
        vNoturno = stringParaMinutos($(this).find('#hrNoturno').val());
        var obj = $(this).find('#hrTotal');
        obj.val(minutosParaHoras(Total));
        setarHora(obj);

        obj = $(this).find('#hrVFR');
        obj.val(minutosParaHoras(Total - vIFRR - vIFRC));
        setarHora(obj);

        obj = $(this).find('#hrDiurno');
        obj.val(minutosParaHoras(Total - vNoturno));
        setarHora(obj);

        obj = $(this).find('#hrNoturno');
        obj.val(minutosParaHoras(vNoturno));
        //setarHora(obj)

        obj = $(this).find('#chkVooIfr');
        obj[0].checked = vIFRR + vIFRC > 0;

        vTotalGeral += Total;
    });


    var vTotalNoturno = 0;
    var vTotalIFRR = 0;
    var vTotalIFRC = 0;
    var vTotalGeral = 0;
    var vTotalDiurno = 0;
    var vTotalPousos = 0;
    var vTotalCiclos = 0;
    var vTotalConsumo = 0;

    $('.nrPousos').each(function (index, valor) { vTotalPousos += buscarValorNumerico($(valor).val()); });
    $('.nrCiclos').each(function (index, valor) { vTotalCiclos += buscarValorNumerico($(valor).val()); });
    $('.nrConsumoCombustivel').each(function (index, valor) { vTotalConsumo += buscarValorNumerico($(valor).val()); });

    $('.hrIFRR').each(function (index, valor) { vTotalIFRR += stringParaMinutos($(valor).val()); });
    $('.hrIFRC').each(function (index, valor) { vTotalIFRC += stringParaMinutos($(valor).val()); });
    $('.hrTotal').each(function (index, valor) { vTotalGeral += stringParaMinutos($(valor).val()); });
    $('.hrDiurno').each(function (index, valor) { vTotalDiurno += stringParaMinutos($(valor).val()); });
    $('.hrNoturno').each(function (index, valor) { vTotalNoturno += stringParaMinutos($(valor).val()); });

    $('#TotalIFRR').val(minutosParaHoras(vTotalIFRR));
    $('#TotalIFRC').val(minutosParaHoras(vTotalIFRC));
    $('#TotalHorasGeral').val(minutosParaHoras(vTotalGeral));
    $('#TotalDiurno').val(minutosParaHoras(vTotalDiurno));
    $('#TotalNoturno').val(minutosParaHoras(vTotalNoturno));
    $('#TotalPousos').val(vTotalPousos);
    $('#TotalCiclos').val(vTotalCiclos);
    $('#TotalConsumoCombustivel').val(vTotalConsumo);

    /*
    TotalDiurno', '', true) )
            .appendTo($('#pnTotais'))
    
            retornaDiv('Noturno', novaHora('TotalNoturno', '', true) )
            .appendTo($('#pnTotais'))
    
            retornaDiv('IFR Capota', novaHora('TotalIFRC', '', true) )
            .appendTo($('#pnTotais'))
    
            retornaDiv('IFR Real', novaHora('TotalIFRR', '', true) )
            .appendTo($('#pnTotais'))
    
            retornaDiv('Total', novaHora('TotalHorasGeral', '', true) )
            .appendTo($('#pnTotais'))
    
            retornaDiv('Pousos', novoInteiro('TotalPousos', '', true) )
            .appendTo($('#pnTotais'))
    
            retornaDiv('Ciclos', novoInteiro('TotalCiclos', '', true) )
            .appendTo($('#pnTotais'))
    
            retornaDiv('Consumo Combustível', novoInteiro('TotalConsumoCombustivel
    */
};

var buscarValorNumerico = function (valor) {
    var retorno = 0;
    if (!isNaN(parseInt(valor))) {
        retorno = parseInt(valor);
    }
    return retorno;
};

var buscarBaseDeOperacao = function () {
    $.ajax({
        method: "GET",
        url: "/api/basedeoperacao/" + $('#cmbPrefixo').val() + '/' + $('#dtData').val()
    })
        .done(
            function (msg) {
                $('#txtBaseDeOperacao').val(msg.Localidade.Nome);
                $('#txtNascer').val($.format.date(new Date(msg.NascerDoSol + 'Z'), "HH:mm"));
                $('#txtPor').val($.format.date(new Date(msg.PorDoSol + 'Z'), "HH:mm"));
            });
};

var setarBaseDeOperacao = function (base) {
    $.ajax({
        method: "POST",
        url: "/api/basedeoperacao/" + $('#cmbPrefixo').val() + '/' + $('#dtData').val() + '/' + $('#txtBaseDeOperacao').val()
    })
        .done(
            function (msg) {
                $('#txtNascer').val($.format.date(new Date(msg.NascerDoSol + 'Z'), "HH:mm"));
                $('#txtPor').val($.format.date(new Date(msg.PorDoSol + 'Z'), "HH:mm"));
                //alert( "Data Saved: " + msg );
                //$('#loading').hide()    
            });
};

$(document).ready(function () {
    $('#voltar').on('click', function () { history.back(); });
    var id = getUrlParameter('id');

    try {
        $diario = JSON.parse(localStorage.getItem("diarios")).find(function (x) { return x.Id === id; });
        carregarDiario($diario);
        calcularDatas();
    }
    catch (err) {
        alert(err);
    }

    $('input').on('change', function () { mudouValor($(this)); calcularDatas($(this)); });
    $('select').on('change', function () { setarCombo($(this)); });
    $('textarea').on('change', function () { mudouValor($(this)); });

    $('#txtBaseDeOperacao').on('change', function () { setarBaseDeOperacao($(this)); });

    $("input").on("click", function () {
        this.setSelectionRange(0, 9999);
        //$(this).select();
    });

    var $div = $('<div />', { class: 'fixed_bottom' });
    $tabela = $('<tr />').appendTo($('<table />').addClass('tabelinea').appendTo($div));

    $tabela.append($("<td />").addClass('pnLinha_1').text("1"));
    $tabela.append($("<td />").addClass('pnLinha_2').text("2"));
    $tabela.append($("<td />").addClass('pnLinha_3').text("3"));
    $tabela.append($("<td />").addClass('pnLinha_4').text("4"));
    $tabela.append($("<td />").addClass('pnLinha_5').text("5"));
    $tabela.append($("<td />").addClass('pnLinha_6').text("6"));
    $tabela.append($("<td />").addClass('pnLinha_7').text("7"));
    $tabela.append($("<td />").addClass('pnLinha_8').text("8"));

    $('body').append($div);

    $('.tabelinea td').on('click', function () {
        var caminho = $(this).attr('class');
        $(document).scrollTop($('#' + caminho).offset().top - 90);
    });

    $('#subir').on('click', function () { $(document).scrollTop(0); });
    $('#descer').on('click', function () { $(document).scrollTop($('#nrOcorrencias').offset().top - 70); });
    $('#salvar').on('click', salvar);
    $('#loading').hide();
});
