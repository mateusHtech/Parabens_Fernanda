 const colors = ['#FFD700', '#8B0000', '#FFFFFF', '#FF69B4', '#00E6E6', '#ADFF2F'];
    const confettiCount = 100;
    const confetti = [];
    const canvas = document.querySelector('.confetti-canvas');
    const ctx = canvas.getContext('2d');
    let W = window.innerWidth;
    let H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;
const imagemb = document.getElementById('escolha');
const bolo = document.querySelectorAll('#options button');
const vela = document.getElementById('vela');
const musica = document.getElementById('musica');
const btnParabens = document.getElementById('btnParabens');
const chama = document.getElementById('chama');
let acesa = false;

btnParabens.addEventListener('click', () => {
  if (!acesa) {
    musica.currentTime = 0;
    musica.play();
    vela.src = 'assets/mateus/vela/vela1_acesa.png'; 
    chama.style.opacity = 1;
    acesa = true;
    soltarConfetes();

    musica.onended = () => {
      apagarVela();
    };
  }
});

vela.addEventListener('click', () => {
  if (acesa) {
    apagarVela();
  }
});

function apagarVela() {
  vela.src = 'assets/mateus/vela/vela1_apagada.png';
  chama.style.opacity = 0;
  musica.pause();
  musica.currentTime = 0;
  acesa = false;
  soltarConfetes();
}




function soltarConfetes() {
  for (let i = 0; i < 100; i++) {
    const confete = document.createElement('div');
    confete.className = 'confete';
    confete.style.left = `${Math.random() * 100}%`;
    confete.style.animationDelay = `${Math.random()}s`;
    confete.style.setProperty('--hue', Math.floor(Math.random() * 360));
    document.body.appendChild(confete);
    setTimeout(() => confete.remove(), 3000);
  }
}


if (bolo.length > 0) {
  for (let i = 0; i < bolo.length; i++) {
    const bolin = bolo[i];
    bolin.addEventListener('click', function () {
      let saborselecionado = bolin.getAttribute('sabor');
      marcarsabor(saborselecionado);
      imagemb.setAttribute('src', `assets/mateus/bolos/${saborselecionado}.png`);
    });
  }
}

// Destacar bolo selecionado
function marcarsabor(qualsaborselecionado) {
  for (let tiposabor = 0; tiposabor < bolo.length; tiposabor++) {
    const bolin = bolo[tiposabor];
    if (bolin.getAttribute('sabor') === qualsaborselecionado)
      bolin.classList.add('selecionado');
    else
      bolin.classList.remove('selecionado');
  }
}

    function Confetto() {
      this.x = Math.random() * W;
      this.y = Math.random() * H - H;
      this.size = Math.random() * 8 + 4;
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.speed = Math.random() * 3 + 2;
      this.angle = Math.random() * 10;
      this.active = true;
    }

    Confetto.prototype.update = function() {
      this.y += this.speed;
      this.x += Math.sin(this.angle);
      this.angle += 0.05;
      if (this.y > H) {
        this.active = false;
      }
    }

    Confetto.prototype.draw = function() {
      if (!this.active) return;
      ctx.beginPath();
      ctx.fillStyle = this.color;
      ctx.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2);
      ctx.fill();
    }

    for (let i = 0; i < confettiCount; i++) {
      confetti.push(new Confetto());
    }

    function animate() {
      ctx.clearRect(0, 0, W, H);
      confetti.forEach(c => {
        c.draw();
        c.update();
      });
      if (confetti.some(c => c.active)) {
        requestAnimationFrame(animate);
      }
    }

    animate();

    window.addEventListener('resize', () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W;
      canvas.height = H;
    });

const musicas = [
  {
    titulo: "Wind of Change",
    artista: "Scorpions",
    capa: "windofchange.jpg",
    arquivo: "assets/sibele/windofchange.mp3"
  },
  {
    titulo: "Aerials",
    artista: "System of a Down",
    capa: "aerials.jpg",
    arquivo: "assets/sibele/aerials.mp3"
  },
  {
    titulo: "Its My Life",
    artista: "Bon Jovi",
    capa: "itsmylife.jpg",
    arquivo: "assets/sibele/itsmylife.mp3"
  }
];

let indexAtual = 0;
let tocando = false;

const audio = document.getElementById("audioPlayer");
const titulo = document.getElementById("musicTitle");
const artista = document.getElementById("musicArtist");
const playBtn = document.getElementById("playPauseBtn");

function carregarMusica(index) {
  const musica = musicas[index];
  titulo.textContent = musica.titulo;
  artista.textContent = musica.artista;
  audio.src = musica.arquivo;
  playBtn.textContent = "▶️";
  tocando = false;
}

function togglePlay() {
  if (audio.paused) {
    audio.play();
    playBtn.textContent = "⏸️";
    tocando = true;
  } else {
    audio.pause();
    playBtn.textContent = "▶️";
    tocando = false;
  }
}

function nextMusic() {
  indexAtual = (indexAtual + 1) % musicas.length;
  carregarMusica(indexAtual);
  if (tocando) {
    audio.play();
    playBtn.textContent = "⏸️";
  }
}

audio.onended = () => {
  nextMusic();
};

window.onload = () => {
  carregarMusica(indexAtual);
};

const btnSim = document.getElementById('respostaSim');
const btnNao = document.getElementById('respostaNao');
const msg = document.getElementById('respostaFinal');

btnSim.addEventListener('click', () => {
  msg.innerHTML = '❤️ Exatamente!';
  msg.style.opacity = 1;
});

let posX = 0;
let posY = 0;

document.addEventListener('mousemove', (e) => {
  const distancia = 100; // distância de reação do botão
  const mouseX = e.clientX;
  const mouseY = e.clientY;

  const btnRect = btnNao.getBoundingClientRect();
  const centerX = btnRect.left + btnRect.width / 2;
  const centerY = btnRect.top + btnRect.height / 2;

  const dx = mouseX - centerX;
  const dy = mouseY - centerY;

  const distanciaMouse = Math.sqrt(dx * dx + dy * dy);

  if (distanciaMouse < distancia) {
    // fugir na direção oposta
    const moverX = (dx / distanciaMouse) * 80;
    const moverY = (dy / distanciaMouse) * 80;

    posX -= moverX;
    posY -= moverY;

    // limitar movimento dentro da área dos botões
    const limiteX = 150;
    const limiteY = 80;

    posX = Math.max(-limiteX, Math.min(limiteX, posX));
    posY = Math.max(-limiteY, Math.min(limiteY, posY));

    btnNao.style.transform = `translate(${posX}px, ${posY}px)`;
  }
});

