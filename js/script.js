
// Elementos do DOM
const playBtn = document.getElementById('playPause');
const audio = document.getElementById('audioPlayer');
const track = document.getElementById('track');
const listeners = document.getElementById('listeners');
const status = document.getElementById('status');
const relogio = document.getElementById('relogio');
const particles = document.getElementById('particles');
const audioVisualizer = document.getElementById('audioVisualizer');

// Estado do player
let isPlaying = false;
let currentTrack = '';
let audioBars = [];
let animationFrame = null;

// Criar partículas de fundo
function createParticles() {
  for (let i = 0; i < 50; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 6 + 's';
    particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
    particles.appendChild(particle);
  }
}

// Criar barras gráficas de áudio
function createAudioBars() {
  const barCount = window.innerWidth < 768 ? 20 : 30; // Menos barras no mobile
  
  for (let i = 0; i < barCount; i++) {
    const bar = document.createElement('div');
    bar.className = 'audio-bar';
    bar.style.setProperty('--base-height', Math.random() * 30 + 10 + 'px');
    bar.style.height = bar.style.getPropertyValue('--base-height');
    audioVisualizer.appendChild(bar);
    audioBars.push(bar);
  }
}

// Animar barras de áudio
function animateAudioBars() {
  if (!isPlaying) return;
  
  audioBars.forEach((bar, index) => {
    const baseHeight = parseInt(bar.style.getPropertyValue('--base-height'));
    const randomFactor = Math.random() * 0.5 + 0.5;
    const newHeight = baseHeight * randomFactor;
    
    bar.style.height = newHeight + 'px';
    
    // Adicionar classe playing para efeito visual
    if (Math.random() > 0.7) {
      bar.classList.add('playing');
      setTimeout(() => bar.classList.remove('playing'), 200);
    }
  });
  
  animationFrame = requestAnimationFrame(animateAudioBars);
}

// Parar animação das barras
function stopAudioBars() {
  if (animationFrame) {
    cancelAnimationFrame(animationFrame);
    animationFrame = null;
  }
  
  audioBars.forEach(bar => {
    bar.style.height = bar.style.getPropertyValue('--base-height');
    bar.classList.remove('playing');
  });
}

// Atualizar relógio
function atualizarRelogio() {
  const agora = new Date();
  const data = agora.toLocaleDateString('pt-BR');
  const hora = agora.toLocaleTimeString('pt-BR');
  relogio.innerHTML = `<i class="fas fa-clock"></i> ${data} - ${hora}`;
}

// Ler música atual do arquivo NowPlaying.txt
async function lerMusicaAtual() {
  try {
    console.log('Buscando música atual...');
    const response = await fetch('api/nowplaying.php');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Resposta da API:', data);
    
    if (data.success && data.track) {
      currentTrack = data.track;
      track.textContent = currentTrack;
      track.classList.remove('loading');
      console.log('Música atual:', currentTrack);
    } else {
      track.textContent = 'Música não disponível';
      track.classList.remove('loading');
      console.log('Música não disponível');
    }
  } catch (error) {
    console.error('Erro ao ler música atual:', error);
    track.textContent = 'Erro ao carregar música';
    track.classList.remove('loading');
  }
}

// Atualizar status do Icecast
async function atualizarStatus() {
  try {
    console.log('Buscando status do Icecast...');
    const res = await fetch('api/status.php');
    
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    
    const data = await res.json();
    console.log('Status do Icecast:', data);
    
    if (data.success && data.title && data.title !== 'Desconhecida') {
      track.textContent = data.title;
      currentTrack = data.title;
    }
    
    listeners.textContent = data.listeners || 0;
    
    if (data.listeners > 0) {
      status.textContent = 'Online';
      status.style.color = '#00ff00';
    } else {
      status.textContent = 'Offline';
      status.style.color = '#ff6666';
    }
    
  } catch (err) {
    console.error('Erro ao atualizar status:', err);
    status.textContent = 'Erro';
    status.style.color = '#ff6666';
    listeners.textContent = '--';
  }
}

// Controles do player
playBtn.addEventListener('click', () => {
  console.log('Botão play clicado');
  if (isPlaying) {
    audio.pause();
  } else {
    audio.play().catch(error => {
      console.error('Erro ao reproduzir áudio:', error);
      track.textContent = 'Erro ao conectar com o stream';
    });
  }
});

audio.addEventListener('play', () => {
  console.log('Áudio iniciado');
  isPlaying = true;
  playBtn.classList.add('playing');
  playBtn.querySelector('i').className = 'fas fa-pause';
  status.textContent = 'Reproduzindo';
  status.style.color = '#00ff00';
  
  // Iniciar animação das barras
  animateAudioBars();
});

audio.addEventListener('pause', () => {
  console.log('Áudio pausado');
  isPlaying = false;
  playBtn.classList.remove('playing');
  playBtn.querySelector('i').className = 'fas fa-play';
  status.textContent = 'Pausado';
  status.style.color = '#ffaa00';
  
  // Parar animação das barras
  stopAudioBars();
});

audio.addEventListener('error', () => {
  console.error('Erro no áudio:', audio.error);
  track.textContent = 'Erro na conexão com o stream';
  status.textContent = 'Erro';
  status.style.color = '#ff6666';
  
  // Parar animação das barras
  stopAudioBars();
});

// Efeitos visuais
function addGlowEffect() {
  if (isPlaying) {
    document.body.style.setProperty('--glow-intensity', '0.8');
  } else {
    document.body.style.setProperty('--glow-intensity', '0.3');
  }
}

// Detectar orientação do dispositivo
function handleOrientation() {
  if (window.innerWidth < 768) {
    // Mobile - ajustar layout
    document.body.classList.add('mobile');
  } else {
    document.body.classList.remove('mobile');
  }
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
  console.log('Página carregada, inicializando...');
  createParticles();
  createAudioBars();
  atualizarRelogio();
  atualizarStatus();
  lerMusicaAtual();
  handleOrientation();
  
  // Atualizações periódicas
  setInterval(atualizarRelogio, 1000);
  setInterval(atualizarStatus, 10000); // A cada 10 segundos
  setInterval(lerMusicaAtual, 5000);   // A cada 5 segundos
  setInterval(addGlowEffect, 100);
  
  // Adicionar classe loading inicialmente
  track.classList.add('loading');
  
  console.log('Sistema inicializado com sucesso!');
});

// Efeitos de hover no botão
playBtn.addEventListener('mouseenter', () => {
  if (!isPlaying) {
    playBtn.style.transform = 'scale(1.05)';
  }
});

playBtn.addEventListener('mouseleave', () => {
  if (!isPlaying) {
    playBtn.style.transform = 'scale(1)';
  }
});

// Detectar quando a página fica visível/invisível
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    // Pausar áudio quando a página não está visível
    if (isPlaying) {
      audio.pause();
    }
  }
});

// Detectar mudanças de tamanho da tela
window.addEventListener('resize', () => {
  handleOrientation();
  
  // Recriar barras se necessário
  if (audioBars.length === 0) {
    createAudioBars();
  }
});

// Detectar toque no mobile
if ('ontouchstart' in window) {
  // Adicionar classe para estilos específicos de touch
  document.body.classList.add('touch-device');
  
  // Melhorar feedback tátil
  playBtn.addEventListener('touchstart', () => {
    playBtn.style.transform = 'scale(0.95)';
  });
  
  playBtn.addEventListener('touchend', () => {
    playBtn.style.transform = 'scale(1)';
  });
}

// Funções de compartilhamento
const shareBtn = document.getElementById('shareBtn');
const shareOptions = document.getElementById('shareOptions');

// Toggle do menu de compartilhamento
shareBtn.addEventListener('click', () => {
  shareOptions.classList.toggle('show');
});

// Fechar menu ao clicar fora
document.addEventListener('click', (e) => {
  if (!shareBtn.contains(e.target) && !shareOptions.contains(e.target)) {
    shareOptions.classList.remove('show');
  }
});

// Funções de compartilhamento
function shareOnWhatsApp() {
  const url = encodeURIComponent(window.location.href);
  const text = encodeURIComponent('🎸 Ouça Toca Rock - Rádio online de rock clássico! 🤘');
  window.open(`https://wa.me/?text=${text}%20${url}`, '_blank');
  shareOptions.classList.remove('show');
}

function shareOnFacebook() {
  const url = encodeURIComponent(window.location.href);
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
  shareOptions.classList.remove('show');
}

function shareOnTwitter() {
  const url = encodeURIComponent(window.location.href);
  const text = encodeURIComponent('🎸 Ouça Toca Rock - Rádio online de rock clássico! 🤘');
  window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
  shareOptions.classList.remove('show');
}

function copyLink() {
  const url = window.location.href;
  
  if (navigator.clipboard) {
    navigator.clipboard.writeText(url).then(() => {
      showNotification('Link copiado!');
    });
  } else {
    // Fallback para navegadores mais antigos
    const textArea = document.createElement('textarea');
    textArea.value = url;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    showNotification('Link copiado!');
  }
  
  shareOptions.classList.remove('show');
}

// Função para mostrar notificação
function showNotification(message) {
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: linear-gradient(145deg, #333, #222);
    color: #fff;
    padding: 15px 20px;
    border-radius: 10px;
    border: 2px solid #ff6666;
    box-shadow: 0 0 20px rgba(255, 0, 0, 0.3);
    z-index: 10000;
    font-family: 'Rajdhani', sans-serif;
    font-weight: 600;
    animation: slideIn 0.3s ease;
  `;
  notification.textContent = message;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 2000);
}

// Adicionar animações CSS para notificação
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  
  @keyframes slideOut {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(100%); opacity: 0; }
  }
`;
document.head.appendChild(style);
