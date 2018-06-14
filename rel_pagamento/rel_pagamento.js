var carregarDados = function (data) {
    $("#loading").show();

    $.get("/api/relatorio//pagamento/" + data, function (data, status) {


        $("#tbEscala").empty();

        var $head = $("<tr />").appendTo($("#tbEscala"));
        $("<th />").text("Trato").appendTo($head);
        $("<th />").text("ANAC").appendTo($head);
        $("<th />").text("Horas de Voo").appendTo($head);
        $("<th />").text("Dom ou Fer").appendTo($head);
        $("<th />").text("Função").appendTo($head);
        $("<th />").text("Voo Noturno").appendTo($head);
        $("<th />").text("Jornada Noturna").appendTo($head);

        $.each(data, function (k, v) {

            var $tr = $("<tr />").appendTo($("#tbEscala"));
            $("<td />").text(v.Trato).appendTo($tr);
            $("<td />").text(v.CodigoANAC).appendTo($tr);
            $("<td />").text(v.voo_tripulacao).appendTo($tr);
            $("<td />").text(v.feriado_ou_domingo).appendTo($tr);
            $("<td />").text(v.FUNCAO).appendTo($tr);
            $("<td />").text(v.voo_noturno).appendTo($tr);
            $("<td />").text(v.jornada_noturna).appendTo($tr);

        })
    })

    $("#loading").hide();
}


$(document).ready(function () {

    $('#voltar').on('click', function () { window.location.href = '/app' })

    $('#selData').on('change', function () { carregarDados(this.value) })


    $('<img />', { id: 'img_loading', src: '/app/img/loading.gif' })
        .appendTo($('<div />', { id: 'loading' })
            .appendTo($('body'))
    )

    carregarDados($("#selData").val())
})