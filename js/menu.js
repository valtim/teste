// var _baseURL_ = 'http://localhost:60376/api/'; //KILLME
// var _baseURL_ = 'http://teste.sistemasol.com.br/api/'; //KILLME


var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};

function newGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,
        function (c) {
            var r = Math.random() * 16 | 0;
            var v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        }
    );
}


$(document).ready(function () {

    $('<img />', { id: 'img_loading', src: '/app/img/loading.gif' })
        .appendTo($('<div />', { id: 'loading' })
            .appendTo($('body'))
        );

    var $div = $('<div />', { class: 'fixed_top' });
    $div.append($("<h1 />", { id: 'titulo' }));

    $('body').append($div);

});