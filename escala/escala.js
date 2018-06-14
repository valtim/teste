


$(document).ready(function () {

    $('#voltar').on('click', function () { window.location.href = '/app' });

    $('<img />', { id: 'img_loading', src: '/app/img/loading.gif' })
        .appendTo($('<div />', { id: 'loading' })
            .appendTo($('body'))
        )

    //$("#botao").click(function(){
    $("#carregando").remove()

    $.get("/api/escala", function (data, status) {

        var primeiraLinha = true

        $.each(data.EscalasDeTrabalho, function (k, v) {


            var tripulante = '';
            if (v.Tripulante !== null) { tripulante = v.Tripulante.Trato }

            var vHora = $.format.date(v.HoraDaApresentacao, "HH:mm");
            if (vHora === "00:00") { vHora = "---" }
            if (v.Observacao !== null) vHora = v.Observacao


            if (primeiraLinha) {
                primeiraLinha = false
                $('#tbEscala > tbody:last-child').append(
                    '<tr>'// need to change closing tag to an opening `<tr>` tag.
                    + '<td>' + $.format.date(v.Data, "dd/MM/yy") + '</td>'
                    + '<td>' + tripulante + '</td>'
                    + '<td>' + v.Localidade.Nome + '</td>'
                    + '<td>' + v.Prefixo.PrefixoCompleto + '</td>'
                    + '<td>' + vHora + '</td>'
                    + '<td rowspan="' + data.EscalasDeTrabalho.length +1  + '">' + data.Comentario + '</td>'

                    + '</tr>');
            }
            else {


                $('#tbEscala > tbody:last-child').append(
                    '<tr>'// need to change closing tag to an opening `<tr>` tag.
                    + '<td>' + $.format.date(v.Data, "dd/MM/yy") + '</td>'
                    + '<td>' + tripulante + '</td>'
                    + '<td>' + v.Localidade.Nome + '</td>'
                    + '<td>' + v.Prefixo.PrefixoCompleto + '</td>'
                    + '<td>' + vHora + '</td>'
                    + '</tr>');
            }

        });

        $('#tbEscala > tbody:last-child').append(
            '<tr>'// need to change closing tag to an opening `<tr>` tag.
            + '<td colspan="5"><b>Coordenador:</b> ' + data.Coordenador + '</td>'
            + '</tr>');

        /*
        $('#tbEscala > tbody:last-child').append(
        '<tr>'// need to change closing tag to an opening `<tr>` tag.
        +'<td rowspan="25"><b>Observações:</b><br/> '+data.Comentario.replace("\n", "<br />", "g")+'</td>'
        +'</tr>');

*/


        //$('<div />').text("Observa��es:" + data.Comentario).appendTo("body")

        $('#loading').remove();

    });






    //});
});