var tablePessoa = document.querySelector('table#pessoas');
var divCursos = document.querySelector('div#cursos');
var url = 'https://novosol.sistemasol.com.br/';
var btnSalvarValidacao = document.querySelector('#salvar');
var vencimentoList = [];
var vencimentoSaveList = [];
fetch(url + 'api/login', {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        username: 'valtim',
        password: 'fodase'
    })
}).then(function (res) {
    return res.json();
}).then(function (response) {
    localStorage.setItem("token", response);
    getCertificado(response);
    getTripulante(response);
}).catch(function (error) {
    console.log(error);
});
function getCertificado(token) {
    fetch(url + 'api/certificado', {
        cache: 'default',
        headers: {
            'content-type': 'application/json',
            'token': token
        },
        method: 'GET',
        mode: 'cors',
    })
        .then(function (response) { return response.json(); })
        .then(function (response) {
        if (!response.length) {
            throw new SyntaxError('Erro ao recuperar os certificados do servidor.\n Tente novamento mais tarde.');
        }
        var increment = 0;
        response.forEach(function (resp, index) {
            var table = isElementExist(resp.Grupo.Id);
            var tableHead = null;
            if (table === null) {
                table = create({ tagName: 'table', id: stringValida(resp.Grupo.Id), className: 'table' }, document.getElementById('cursos'));
                tableHead = create({ tagName: 'thead' }, table);
                create({ tagName: 'tbody' }, table);
                var row = tableHead.insertRow(0);
                var cell = row.insertCell(0);
                cell.innerText = resp.Grupo.Nome;
                cell = row.insertCell(1);
                cell.innerText = resp.DiasAntesDoVencimento + ' (Dias)';
                increment = 1;
                row = tableHead.insertRow(1);
                cell = row.insertCell(0);
                cell.id = stringValida(resp.Id);
                cell.innerText = resp.Nome;
            }
            else {
                if (isElementExist(resp.Id) === null) {
                    var cell = null;
                    tableHead = table.childNodes[0];
                    tableHead.childNodes[0].childNodes[0].colSpan += 1 - increment;
                    increment = 0;
                    var rowGrupo = tableHead.childNodes[1];
                    var contadorGrupo = rowGrupo.childNodes.length;
                    cell = rowGrupo.insertCell(contadorGrupo++);
                    cell.id = stringValida(resp.Id);
                    cell.innerText = resp.Nome;
                }
            }
        });
    }).catch(function (error) {
        alert(error.message);
    });
}
function getTripulante(token) {
    fetch(url + 'api/tripulante', {
        headers: {
            'content-type': 'application/json',
            'token': token
        },
        method: 'GET'
    })
        .then(function (response) { return response.json(); })
        .then(function (response) {
        getVencimento(token, response);
    }).catch(function (error) {
        alert(error.message);
    });
}
function getVencimento(token, Tripulantes) {
    fetch(url + 'api/vencimento', {
        headers: {
            'content-type': 'application/json',
            'token': token
        },
        method: 'GET'
    })
        .then(function (response) { return response.json(); })
        .then(function (response) {
        vencimentoList = response;
        if (!Tripulantes.length) {
            throw new SyntaxError('Erro ao carregar as informações dos tripulantes. \nTente novamento mais tarde.');
        }
        Tripulantes.forEach(function (Tripulante) {
            if (Tripulante.Ativo) {
                var rowBody = tablePessoa.querySelector('tbody').insertRow();
                rowBody.id = stringValida(Tripulante.Id);
                rowBody.insertCell(0).innerText = Tripulante.NomeCompleto;
                rowBody.insertCell(1).innerText = Tripulante.Trato;
                rowBody.insertCell(2).innerText = Tripulante.CodigoANAC;
                rowBody.insertCell(3).innerText = Tripulante.OperacaoStr;
                rowBody.insertCell(4).innerText = Tripulante.CargoStr;
            }
        });
        vencimentoList.forEach(function (vencimento) {
            var tabela = isElementExist(vencimento.Certificado.Grupo.Id);
            var colCertificado = isElementExist(vencimento.Certificado.Id);
            var userRow = isElementExist(vencimento.Tripulante.Id);
            var row = null;
            if (tabela.childNodes[1].childNodes.length !== userRow.rowIndex - 1) {
                row = tabela.childNodes[1].insertRow();
                for (var index = 0; index < tabela.childNodes[0].childNodes[1].cells.length; index++) {
                    row.insertCell(index).innerText = 'n/a';
                }
            }
            else {
                row = tabela.childNodes[1].childNodes[userRow.rowIndex - 2];
            }
            var cell = Array.prototype.slice.call(row.childNodes).filter(function (row) {
                return row.cellIndex === colCertificado.cellIndex;
            })[0];
            if (cell && !cell.getAttribute('data-vencimento-id') && vencimento.Id) {
                if (vencimento.hasOwnProperty('DataDeVencimento') && vencimento.DataDeVencimento && vencimento.Ativo) {
                    cell.innerText = formatData(vencimento.DataDeVencimento);
                    cell.style.backgroundColor = colorBackgroundVencimento(new Date(vencimento.DataDeVencimento), parseInt(vencimento.Certificado.DiasAntesDoVencimento));
                    if (vencimento.UltimosVoos) {
                        var div_1 = create({ tagName: 'div', className: 'popup hide' }, cell);
                        vencimento.UltimosVoos.forEach(function (ultimoVoo) {
                            div_1.innerHTML += 'Data do Voo: ' + formatData(ultimoVoo.Data) + '</br>';
                            div_1.innerHTML += 'Prefixo: ' + ultimoVoo.Prefixo + '</br>';
                            div_1.innerHTML += 'Número do DB: ' + ultimoVoo.NumeroDoDiario + '</br>';
                            div_1.innerHTML += 'Folha do DB: ' + ultimoVoo.NumeroDaFolha + '</br>';
                            div_1.innerHTML += '<hr>';
                        });
                        proficienciaOnClick(cell);
                    }
                }
                else {
                    cell.innerText = 'n/a';
                }
                cell.setAttribute('data-vencimento-id', vencimento.Id);
            }
        });
        cellsOnClick();
    }).catch(function (error) {
        alert(error.message);
    });
}
function create(element, pai) {
    var el = document.createElement(element.tagName);
    delete element.tagName;
    Object.keys(element).forEach(function (prop) {
        el[prop] = element[prop];
    });
    pai.appendChild(el);
    return el;
}
function stringValida(nome) {
    var regex = /[a-zA-z][\w]*/g;
    return nome.match(regex).join('').toLowerCase();
}
function isElementExist(element) {
    return document.querySelector('#' + stringValida(element));
}
function formatData(data) {
    var result = new Date(data);
    var days = result.getDate() < 10 ? '0' + result.getDate() : result.getDate();
    var month = (result.getMonth() + 1) < 10 ? '0' + (result.getMonth() + 1) : (result.getMonth() + 1);
    return days + '/' + month + '/' + result.getFullYear();
}
function diffDaysDate(data1, data2) {
    var timeDiff = Math.abs(data1.getTime() - data2.getTime());
    var dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return dayDiff;
}
function filterCellEditables() {
    var tbodys = divCursos.querySelectorAll('tbody');
    var result = [];
    Array.prototype.slice.call(tbodys).forEach(function (tbody, index) {
        if (index !== (tbodys.length - 1)) {
            tbody.querySelectorAll('td').forEach(function (td) {
                result.push(td);
            });
        }
    });
    return result;
}
function cellsOnClick() {
    var cells = filterCellEditables();
    cells.forEach(function (cell) {
        cell["placeholder"] = "";
        calendarioOnCelula(cell);
    });
}
function calendarioOnCelula(cell) {
    flatpickr(cell, {
        onChange: function (selectedDates, dateStr, instance) {
            cell.innerText = formatData(dateStr + 'T00:00:00');
            var vencimentoSelected = vencimentoList.filter(function (vencimento) {
                return vencimento.Id === cell.getAttribute('data-vencimento-id');
            })[0];
            vencimentoSelected.DataDeVencimento = selectedDates[0];
            vencimentoSaveList.push(vencimentoSelected);
            btnSalvarValidacao.classList.add('salvar');
            cell.style.backgroundColor = colorBackgroundVencimento(new Date(dateStr + 'T00:00:00'), parseInt(cell.parentNode.parentNode.parentNode.firstChild.firstChild.lastChild.innerHTML.split(' ')[0]));
            calendarioOnCelula(instance._input);
        },
        disableMobile: "true",
        appendTo: cell,
        onOpen: function (selectedDates, dateStr, instance) {
            var calendario = instance.calendarContainer;
            if (!calendario.querySelector('button')) {
                create({
                    tagName: 'button',
                    innerText: 'Cancelar',
                    className: 'cancelar',
                    onclick: function () {
                        var vencimentoSelected = vencimentoList.filter(function (vencimento) {
                            return vencimento.Id === cell.getAttribute('data-vencimento-id');
                        })[0];
                        cell.innerText = 'n/a';
                        vencimentoSelected.NaoControlado = true;
                        vencimentoSelected.DataDeVencimento = null;
                        vencimentoSaveList.push(vencimentoSelected);
                        if (vencimentoList.length) {
                            btnSalvarValidacao.classList.add('salvar');
                        }
                        else {
                            btnSalvarValidacao.classList.remove('salvar');
                        }
                        instance._input.style.backgroundColor = colorBackgroundVencimento(new Date(dateStr + 'T00:00:00'), parseInt(cell.parentNode.parentNode.parentNode.firstChild.firstChild.lastChild.innerHTML.split(' ')[0]));
                        calendarioOnCelula(instance._input);
                    }
                }, calendario);
            }
        }
    });
}
function proficienciaOnClick(cell) {
    cell.onclick = function () {
        var div = this.querySelector('div');
        if (div.classList.contains('hide')) {
            div.classList.remove('hide');
        }
    };
}
btnSalvarValidacao.addEventListener('click', function () {
    if (vencimentoSaveList.length) {
        fetch(url + 'api/vencimento', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'token': localStorage.getItem("token")
            },
            body: JSON.stringify(vencimentoSaveList)
        }).then(function (res) {
            if (res.status === 200) {
                vencimentoSaveList = [];
                btnSalvarValidacao.classList.remove('salvar');
            }
        }).catch(function (error) {
            alert(error.message);
        });
    }
});
document.getElementsByTagName('body')[0].onmousedown = function () {
    var popups = document.querySelectorAll('.popup');
    var popup = Array.prototype.slice.call(popups).filter(function (popup) {
        return !popup.classList.contains('hide');
    })[0];
    if (popup) {
        popup.classList.add('hide');
    }
};
function colorBackgroundVencimento(data, vencimento) {
    var hoje = new Date();
    var diasVencimento = diffDaysDate(hoje, data);
    if (diasVencimento >= 90 && diasVencimento < 120 && vencimento >= 120) {
        return "#e2efd9";
    }
    if (diasVencimento >= 60 && diasVencimento < 90 && vencimento >= 90) {
        return "#bdd6ee";
    }
    if (diasVencimento >= 30 && diasVencimento < 60 && vencimento >= 60) {
        return '#ffff00';
    }
    if (diasVencimento <= 30 && diasVencimento > 15 && vencimento >= 30) {
        return '#f7caac';
    }
    if (diasVencimento <= 15 && vencimento >= 15) {
        return '#ff0000';
    }
    return '';
}
