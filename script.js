const qtd = perguntarQtdCartas();
const papagaios = gerarPapagaiosEmbaralhados(qtd);

renderizarCartasNaTela(papagaios);

function perguntarQtdCartas() {
  let qtdCartas = parseInt(prompt("Com quantas cartas você quer jogar?"));

  while (
    isNaN(qtdCartas) ||
    qtdCartas < 4 ||
    qtdCartas > 14 ||
    qtdCartas % 2 === 1
  ) {
    qtdCartas = parseInt(prompt("Com quantas cartas você quer jogar?"));
  }

  return qtdCartas;
}

function gerarPapagaiosEmbaralhados(qtdCartas) {
  const tiposCartas = [
    "bobross",
    "explody",
    "fiesta",
    "metal",
    "revertit",
    "triplets",
    "unicorn"
  ];
  const cartas = [];

  for (let i = 0; i < qtdCartas / 2; i++) {
    const papagaio = tiposCartas[i];
    cartas.push(papagaio);
    cartas.push(papagaio);
  }

  cartas.sort(comparador);

  return cartas;
}

function renderizarCartasNaTela(cartas) {
  const deck = document.querySelector(".deck");

  for (let i = 0; i < cartas.length; i++) {
    deck.innerHTML += `
            <li data-test="card" class="carta" onclick="virarCarta(this)">
                <div class="front-face face">
                    <img data-test="face-down-image" src="imagem/front.png">
                </div>
                <div class="back-face face">
                    <img data-test="face-up-image" src="imagem/${cartas[i]}parrot.gif" data-test="face-up-image">
                </div>
            </li>`;
  }
}

let primeiraCarta = null;
let segundaCarta = null;
let cartasCorretas = 0;
let jogadas = 0;

function virarCarta(cartaSelecionada) {
  if (cartaSelecionada.classList.contains("virada") || segundaCarta !== null) {
    return;
  }
  jogadas++;
  cartaSelecionada.classList.add("virada");

  if (primeiraCarta === null) {
    primeiraCarta = cartaSelecionada;
  } else {
    segundaCarta = cartaSelecionada;

    if (primeiraCarta.innerHTML === segundaCarta.innerHTML) {
      cartasCorretas += 2;
      verificarFimDoJogo();
      resetarJogada();
    } else {
      setTimeout(desvirarCartas, 1000);
    }
  }
}

function desvirarCartas() {
  primeiraCarta.classList.remove("virada");
  segundaCarta.classList.remove("virada");

  resetarJogada();
}

function resetarJogada() {
  primeiraCarta = null;
  segundaCarta = null;
}

function verificarFimDoJogo() {
  if (cartasCorretas === qtd) {
    alert(`Você venceu em ${jogadas} jogadas!`);
  }
}

function comparador() {
  return Math.random() - 0.5;
}
