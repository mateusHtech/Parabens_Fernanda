 const colors = ['#FFD700', '#8B0000', '#FFFFFF', '#FF69B4', '#00E6E6', '#ADFF2F'];
    const confettiCount = 100;
    const confetti = [];
    const canvas = document.querySelector('.confetti-canvas');
    const ctx = canvas.getContext('2d');
    let W = window.innerWidth;
    let H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;

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
