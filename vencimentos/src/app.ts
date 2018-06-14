const tablePessoa = document.querySelector('table#pessoas');
const divCursos = document.querySelector('div#cursos');
const url = 'https://teste.sistemasol.com.br/';
const btnSalvarValidacao = document.querySelector('#salvar');
var vencimentoList = [];
var vencimentoSaveList = [];

interface Tripulante {
    Ativo: Boolean,
    Trato: string,
    NomeCompleto: string,
    CodigoANAC: string,
    Id: string,
    OperacaoStr: string,
    CargoStr: string
}

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
}).then((res) => {
    return res.json();
}).then((response) => {
    localStorage.setItem("token", response);
    getCertificado(response);
    getTripulante(response);
}).catch(error => {
    console.log(error);
});

function getCertificado(token: string) {
    fetch(url + 'api/certificado', {
        // body: JSON.stringify(data), // must match 'Content-Type' header
        cache: 'default', // *default, no-cache, reload, force-cache, only-if-cached
        // credentials: 'same-origin', // include, same-origin, *omit
        headers: {
            'content-type': 'application/json',
            'token': token
        },
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, cors, *same-origin
        // redirect: 'follow', // *manual, follow, error
        // referrer: 'no-referrer', // *client, no-referrer
    })
        .then(response => { return response.json() })
        .then(response => {
            if (!response.length) {
                throw new SyntaxError('Erro ao recuperar os certificados do servidor.\n Tente novamento mais tarde.')
            }

            let increment = 0;

            response.forEach((resp, index) => {
                let table = isElementExist(resp.Grupo.Id);
                let tableHead = null;
                if (table === null) {
                    table = create({ tagName: 'table', id: stringValida(resp.Grupo.Id), className: 'table' }, document.getElementById('cursos'));
                    tableHead = create({ tagName: 'thead' }, table);
                    create({ tagName: 'tbody' }, table);

                    let row = tableHead.insertRow(0);
                    let cell = row.insertCell(0);
                    cell.innerText = resp.Grupo.Nome;
                    cell = row.insertCell(1);
                    cell.innerText = resp.DiasAntesDoVencimento + ' (Dias)';
                    increment = 1;

                    row = tableHead.insertRow(1);
                    cell = row.insertCell(0);
                    cell.id = stringValida(resp.Id);
                    cell.innerText = resp.Nome;
                } else {
                    if (isElementExist(resp.Id) === null) {
                        let cell = null;
                        tableHead = table.childNodes[0];
                        tableHead.childNodes[0].childNodes[0].colSpan += 1 - increment;
                        increment = 0;
                        let rowGrupo = tableHead.childNodes[1];
                        let contadorGrupo = rowGrupo.childNodes.length;
                        cell = rowGrupo.insertCell(contadorGrupo++);
                        cell.id = stringValida(resp.Id);
                        cell.innerText = resp.Nome;
                    }
                }
            });
        }).catch(error => {
            alert(error.message);
        })
}

function getTripulante(token: string) {
    fetch(url + 'api/tripulante', {
        // cache: 'no-cache',
        headers: {
            'content-type': 'application/json',
            'token': token
        },
        method: 'GET'//,
        // mode: 'cors',
    })
        .then(response => { return response.json() })
        .then(response => {
            getVencimento(token, response);
        }).catch(error => {
            alert(error.message);
        });
}

function getVencimento(token: string, Tripulantes: Array<Tripulante>) {
    fetch(url + 'api/vencimento', {
        // cache: 'no-cache',
        headers: {
            'content-type': 'application/json',
            'token': token
        },
        method: 'GET'
    })
        .then(response => { return response.json() })
        .then(response => {
            vencimentoList = response;

            if (!Tripulantes.length) {
                throw new SyntaxError('Erro ao carregar as informações dos tripulantes. \nTente novamento mais tarde.')
            }

            Tripulantes.forEach((Tripulante) => {
                if (Tripulante.Ativo) {
                    var rowBody = tablePessoa.querySelector('tbody').insertRow();
                    rowBody.id = stringValida(Tripulante.Id);
                    rowBody.insertCell(0).innerText = Tripulante.NomeCompleto;
                    rowBody.insertCell(1).innerText = Tripulante.Trato;
                    rowBody.insertCell(2).innerText = Tripulante.CodigoANAC;
                    rowBody.insertCell(3).innerText = Tripulante.OperacaoStr;
                    rowBody.insertCell(4).innerText = Tripulante.CargoStr;
                }
            })

            vencimentoList.forEach((vencimento) => {
                let tabela = isElementExist(vencimento.Certificado.Grupo.Id);
                let colCertificado = isElementExist(vencimento.Certificado.Id) as HTMLTableDataCellElement;
                let userRow = isElementExist(vencimento.Tripulante.Id) as HTMLTableRowElement;
                let row = null;

                if (tabela.childNodes[1].childNodes.length !== userRow.rowIndex - 1) {
                    row = (tabela.childNodes[1] as HTMLTableElement).insertRow();
                    for (let index = 0; index < (tabela.childNodes[0].childNodes[1] as HTMLTableRowElement).cells.length; index++) {
                        row.insertCell(index).innerText = 'n/a';
                    }
                } else {
                    row = tabela.childNodes[1].childNodes[userRow.rowIndex - 2];
                }

                let cell = Array.prototype.slice.call(row.childNodes).filter((row) => {
                    return row.cellIndex === colCertificado.cellIndex;
                })[0];
                if (cell && !cell.getAttribute('data-vencimento-id') && vencimento.Id) {
                    if (vencimento.hasOwnProperty('DataDeVencimento') && vencimento.DataDeVencimento && vencimento.Ativo) {
                        cell.innerText = formatData(vencimento.DataDeVencimento);
                        cell.style.backgroundColor = colorBackgroundVencimento(new Date(vencimento.DataDeVencimento), parseInt(vencimento.Certificado.DiasAntesDoVencimento));
                        if (vencimento.UltimosVoos) {
                            let div = create({ tagName: 'div', className: 'popup hide' }, cell);
                            vencimento.UltimosVoos.forEach(ultimoVoo => {
                                div.innerHTML += 'Data do Voo: ' + formatData(ultimoVoo.Data) + '</br>';
                                div.innerHTML += 'Prefixo: ' + ultimoVoo.Prefixo + '</br>';
                                div.innerHTML += 'Número do DB: ' + ultimoVoo.NumeroDoDiario + '</br>';
                                div.innerHTML += 'Folha do DB: ' + ultimoVoo.NumeroDaFolha + '</br>';
                                div.innerHTML += '<hr>';
                            });
                            proficienciaOnClick(cell);
                        }
                    } else {
                        cell.innerText = 'n/a';
                    }
                    cell.setAttribute('data-vencimento-id', vencimento.Id);
                }
            })

            cellsOnClick();
        }).catch(error => {
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

function stringValida(nome: string) {
    var regex = /[a-zA-z][\w]*/g;
    return nome.match(regex).join('').toLowerCase();
}

function isElementExist(element: string) {
    return document.querySelector('#' + stringValida(element));
}

function formatData(data: string) {
    var result = new Date(data);
    let days = result.getDate() < 10 ? '0' + result.getDate() : result.getDate();
    let month = (result.getMonth() + 1) < 10 ? '0' + (result.getMonth() + 1) : (result.getMonth() + 1);
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
    Array.prototype.slice.call(tbodys).forEach((tbody, index) => {
        if (index !== (tbodys.length - 1)) {
            tbody.querySelectorAll('td').forEach((td) => {
                result.push(td);
            });
        }
    });
    return result;
}

function cellsOnClick() {
    let cells = filterCellEditables();
    cells.forEach(function (cell) {
        cell["placeholder"] = "";
        calendarioOnCelula(cell);
    });
}

function calendarioOnCelula(cell: HTMLTableCellElement) {
    flatpickr(cell, {
        onChange: (selectedDates, dateStr, instance) => {
            cell.innerText = formatData(dateStr + 'T00:00:00');
            let vencimentoSelected = vencimentoList.filter((vencimento) => {
                return vencimento.Id === cell.getAttribute('data-vencimento-id')
            })[0];
            vencimentoSelected.DataDeVencimento = selectedDates[0];
            vencimentoSaveList.push(vencimentoSelected);
            btnSalvarValidacao.classList.add('salvar');
            cell.style.backgroundColor = colorBackgroundVencimento(new Date(dateStr + 'T00:00:00'), parseInt((cell.parentNode.parentNode.parentNode.firstChild.firstChild.lastChild as HTMLElement).innerHTML.split(' ')[0]));
            calendarioOnCelula(instance._input);
        },

        disableMobile: "true",
        appendTo: cell,

        onOpen: (selectedDates, dateStr, instance) => {
            const calendario = instance.calendarContainer;
            if (!calendario.querySelector('button')) {
                create({
                    tagName: 'button',
                    innerText: 'Cancelar',
                    className: 'cancelar',
                    onclick: () => {
                        let vencimentoSelected = vencimentoList.filter((vencimento) => {
                            return vencimento.Id === cell.getAttribute('data-vencimento-id')
                        })[0];
                        cell.innerText = 'n/a';
                        // vencimentoSelected.Ativo = false;
                        vencimentoSelected.NaoControlado = true;
                        vencimentoSelected.DataDeVencimento = null;
                        vencimentoSaveList.push(vencimentoSelected);
                        if (vencimentoList.length) {
                            btnSalvarValidacao.classList.add('salvar');
                        } else {
                            btnSalvarValidacao.classList.remove('salvar');
                        }
                        instance._input.style.backgroundColor = colorBackgroundVencimento(new Date(dateStr + 'T00:00:00'), parseInt((cell.parentNode.parentNode.parentNode.firstChild.firstChild.lastChild as HTMLElement).innerHTML.split(' ')[0]));
                        calendarioOnCelula(instance._input);
                    }
                }, calendario)
            }
        }
    });
}

function proficienciaOnClick(cell: HTMLTableCellElement) {

    cell.onclick = function () {
        let div = this.querySelector('div');
        if (div.classList.contains('hide')) {
            div.classList.remove('hide');
        }
    };
}

btnSalvarValidacao.addEventListener('click', () => {
    if (vencimentoSaveList.length) {
        fetch(url + 'api/vencimento', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'token': localStorage.getItem("token")
            },
            body: JSON.stringify(vencimentoSaveList)
        }).then((res) => {
            if (res.status === 200) {
                vencimentoSaveList = [];
                btnSalvarValidacao.classList.remove('salvar');
            }
        }).catch(error => {
            alert(error.message);
        });
    }
});

document.getElementsByTagName('body')[0].onmousedown = function () {
    let popups = document.querySelectorAll('.popup');
    let popup = Array.prototype.slice.call(popups).filter((popup) => {
        return !popup.classList.contains('hide');
    })[0];

    if (popup) {
        popup.classList.add('hide');
    }
};

function colorBackgroundVencimento(data: Date, vencimento: number) {
    let hoje = new Date();
    let diasVencimento = diffDaysDate(hoje, data);

    if (diasVencimento >= 90 && diasVencimento < 120 && vencimento >= 120) {
        return "#e2efd9"
    }

    if (diasVencimento >= 60 && diasVencimento < 90 && vencimento >= 90) {
        return "#bdd6ee"
    }

    if (diasVencimento >= 30 && diasVencimento < 60 && vencimento >= 60) {
        return '#ffff00'
    }

    if (diasVencimento <= 30 && diasVencimento > 15 && vencimento >= 30) {
        return '#f7caac'
    }

    if (diasVencimento <= 15 && vencimento >= 15) {
        return '#ff0000'
    }

    return ''
}