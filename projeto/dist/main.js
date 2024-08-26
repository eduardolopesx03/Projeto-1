"use strict";
// Usando o método `$(document).ready()` para garantir que o DOM esteja completamente carregado
$(function () {
    // Função para alternar o modo noturno
    function toggleNightMode() {
        const body = $('body');
        const checkbox = $('#night-mode-checkbox');
        if (checkbox.prop('checked')) {
            body.addClass('night-mode navbar-night');
            $('.navbar-nav a').css('color', 'white'); // Muda a cor da classe
            $("#logopreta").attr("hidden", "hidden");
            $("#logobranca").removeAttr("hidden");
        }
        else {
            body.removeClass('night-mode navbar-night');
            $('.navbar-nav a').css('color', 'black'); // Muda a cor da classe
            $("#logobranca").attr("hidden", "hidden");
            $("#logopreta").removeAttr("hidden");
        }
    }
    // Manipulador de evento de clique para a checkbox
    $('#night-mode-checkbox').on('click', toggleNightMode);
    // Função que altera a cor do banner ativo
    $('.accordion .card-header').on('click', function () {
        const navbarColor = $('.navbar').css('background-color'); // Recupera a cor da navbar
        $('.accordion .card-header').css('background-color', ''); // Reseta a cor dos inativos
        $('.accordion .card-header .btn:after').css('content', '+');
        // Mudando a cor do ativo
        $(this).css('background-color', navbarColor);
        $(this).find('.btn:after').css('content', '-');
    });
    // Função que troca as divs
    $('#botaoCalcular').on('click', function () {
        // Remove atributo hidden de div2 e adiciona a div1
        $('#parte2').removeAttr('hidden').fadeIn("slow");
        $('#parte1').attr('hidden', 'hidden');
    });
    // Função que calcula o gasto calórico diário
    function calcularGastoCalorico() {
        // Tipos de variáveis
        const genero = $('input[name="genero"]:checked').val();
        const peso = parseInt($('#peso').val(), 10);
        const altura = parseInt($('#altura').val(), 10);
        const idade = parseInt($('#idade').val(), 10);
        const nivelAtividade = parseFloat($('#nivelAtividade').val());
        let gastoCalorico = 0;
        // Verifica se todos os campos foram preenchidos
        if (genero && peso && altura && idade && nivelAtividade) {
            if (genero === 'masculino') {
                gastoCalorico = (10 * peso) + (6.25 * altura) - (5 * idade) + 5;
            }
            else if (genero === 'feminino') {
                gastoCalorico = (10 * peso) + (6.25 * altura) - (5 * idade) - 161;
            }
            gastoCalorico *= nivelAtividade;
            // Atribui o valor calórico diário ao campo no final do formulário
            $('#gastoCalorico').val(gastoCalorico.toFixed(2));
        }
    }
    // Evento de mudança nos campos do formulário
    $('input, select').on('change', calcularGastoCalorico);
});
// Função que calcula os valores para a hipertrofia
function setValuesHipertrofia() {
    // Tipos de variáveis
    const gastoDiario = $('#gastoCalorico').val();
    const peso = $('#peso').val();
    const atividadeSelecionada = $('input[name="atividade"]:checked').val();
    let valor = 0;
    // Define o valor com base na atividade selecionada
    if (atividadeSelecionada === 'leve') {
        valor = 1.12;
    }
    else if (atividadeSelecionada === 'moderada') {
        valor = 1.2;
    }
    else if (atividadeSelecionada === 'intensa') {
        valor = 1.3;
    }
    // Converte gastoDiario para número
    const gastoDiarioNum = parseFloat(gastoDiario || '0');
    // Calcula e atribui valores aos campos
    $('#caloriasDiarias').val((gastoDiarioNum * valor).toFixed(2));
    // Calcula macros para hipertrofia
    const proteina = (gastoDiarioNum * 35 / 100) / 4;
    $('#proteinaHipertrofia').val(proteina.toFixed(2));
    const carboidratos = (gastoDiarioNum * 50 / 100) / 4;
    $('#carboidratoHipertrofia').val(carboidratos.toFixed(2));
    const gorduras = (gastoDiarioNum * 15 / 100) / 9;
    $('#gorduraHipertrofia').val(gorduras.toFixed(2));
}
// Função que calcula os valores para o emagrecimento
function setValuesEmagrecimento() {
    // Tipos de variáveis
    const gastoDiario = $('#gastoCalorico').val();
    const peso = $('#peso').val();
    const atividadeSelecionada = $('input[name="atividade"]:checked').val();
    let valor = 0;
    // Define o valor com base na atividade selecionada
    if (atividadeSelecionada === 'leve') {
        valor = 1.12;
    }
    else if (atividadeSelecionada === 'moderada') {
        valor = 1.2;
    }
    else if (atividadeSelecionada === 'intensa') {
        valor = 1.3;
    }
    // Converte gastoDiario para número
    const gastoDiarioNum = parseFloat(gastoDiario || '0');
    // Calcula e atribui valores aos campos
    $('#caloriasDiariasEmagrecimento').val((gastoDiarioNum / valor).toFixed(2));
    // Calcula macros para emagrecimento
    const proteina = (gastoDiarioNum * 35 / 100) / 4;
    $('#proteinaEmagrecimento').val(proteina.toFixed(2));
    const carboidratos = (gastoDiarioNum * 50 / 100) / 4;
    $('#carboidratoEmagrecimento').val(carboidratos.toFixed(2));
    const gorduras = (gastoDiarioNum * 15 / 100) / 9;
    $('#gorduraEmagrecimento').val(gorduras.toFixed(2));
}
function mostraModalCalculadora() {
    $('#modalCalculadora').modal('show');
}
function mostraModalRedes() {
    $('#modalRedes').modal('show');
}
