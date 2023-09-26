const html = document.querySelector('html');
const focoBtn = document.querySelector('.app__card-button--foco');
const curtoBtn = document.querySelector('.app__card-button--curto');
const longoBtn = document.querySelector('.app__card-button--longo');
const titulo = document.querySelector('.app__title');
const startPauseBtn = document.getElementById('start-pause'); // já é por Id, logo não precisa do #
const startPauseLabel = document.querySelector('#start-pause span'); 
const startPauseImagem = document.querySelector('#start-pause img'); 
const tempoNaTela = document.getElementById('timer');

const botoes = document.querySelectorAll('.app__card-button');

const banner = document.querySelector('.app__image'); // .classe

const musicaFocoInput = document.querySelector('#alternar-musica'); // #id

const musica = new Audio('./sons/luna-rise-part-one.mp3');
const audioPlay = new Audio('./sons/play.wav');
const audioPause = new Audio('./sons/pause.mp3');
const audioBeep = new Audio('./sons/beep.mp3');
musica.loop = true;

let tempoDecorridoEmSegundo = 1500; // variável que será alterada, por isso é let
let intervaloId = null;

musicaFocoInput.addEventListener('change', () => {
    if (musica.paused) {
        musica.play();        
    } else{
        musica.pause();
    }
});

focoBtn.addEventListener('click', () => {
    alterarContexto('foco');
});

curtoBtn.addEventListener('click', () => {
    alterarContexto('descanso-curto');
});

longoBtn.addEventListener('click', () => {
    alterarContexto('descanso-longo');
});

function alterarContexto(contexto){
    html.setAttribute('data-contexto',`${contexto}`);
    banner.setAttribute('src', `./imagens/${contexto}.png`);

    // removo a class active de todos os botões. Lá no switch case eu adiciono no botão desejado
    botoes.forEach(function(contexto){
        contexto.classList.remove('active');
    });

    switch (contexto) {
        case "foco":
            titulo.innerHTML = `Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>`;   
            focoBtn.classList.add('active');
            tempoDecorridoEmSegundo = 1500;
            break;
        case "descanso-curto":
            titulo.innerHTML = `Que tal dá uma respirada?<br>
            <strong class="app__title-strong">faça uma pausa curta!</strong>`;
            curtoBtn.classList.add('active');
            tempoDecorridoEmSegundo = 300;
            break;
        case "descanso-longo":
            titulo.innerHTML = `Hora de voltar a superfície<br>
            <strong class="app__title-strong">faça uma pausa longa!</strong>`;            
            longoBtn.classList.add('active');      
            tempoDecorridoEmSegundo = 900;
            break;
        default:
            break;
    }
    mostrarTempo()
}

const contagemRegressiva = () => {
    if (tempoDecorridoEmSegundo <= 0) {
        audioBeep.play();
        alert('Tempo finalizado!');
        zerar();
        return;
    }
    tempoDecorridoEmSegundo -= 1;
    //console.log('Temporizador: ' + tempoDecorridoEmSegundo);
    mostrarTempo();
}

startPauseBtn.addEventListener('click', iniciarOuPausar);

function iniciarOuPausar(){
    if (intervaloId) {
        audioPause.play();
        zerar();
        return;
    }
    audioPlay.play();
    startPauseImagem.setAttribute('src', './imagens/pause.png');
    intervaloId = setInterval(contagemRegressiva, 1000); // é em milisegundos, 1 seg
    startPauseLabel.textContent = 'Pausar';
}

function zerar(){
    clearInterval(intervaloId);
    intervaloId = null;
    startPauseLabel.textContent = 'Começar';
    startPauseImagem.setAttribute('src', './imagens/play_arrow.png');
}

function mostrarTempo(){
    const tempo = new Date(tempoDecorridoEmSegundo * 1000); //multiplicando por 1.000, já que em JavaScript trabalhamos com milissegundos
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'});
    tempoNaTela.innerHTML = `${tempoFormatado}`;
}

mostrarTempo();