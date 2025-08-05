<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  
  <!-- SEO Meta Tags -->
  <title>Toca Rock - Rádio Online de Rock 70s, 80s e 90s | Ouça Rock Clássico</title>
  <meta name="description" content="Toca Rock - Rádio online especializada em rock clássico dos anos 70, 80 e 90. Ouça Metallica, Led Zeppelin, Pink Floyd, AC/DC e muito mais. Stream 24h de rock pesado.">
  <meta name="keywords" content="rádio online, rock, rock clássico, 70s, 80s, 90s, metallica, led zeppelin, pink floyd, ac/dc, rock pesado, música rock">
  <meta name="author" content="Toca Rock">
  <meta name="robots" content="index, follow">
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="http://localhost/tocarock/">
  <meta property="og:title" content="Toca Rock - Rádio Online de Rock Clássico">
  <meta property="og:description" content="Ouça rock clássico dos anos 70, 80 e 90. 24h de rock pesado online.">
  <meta property="og:image" content="http://localhost/tocarock/assets/logo.png">
  
  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image">
  <meta property="twitter:url" content="http://localhost/tocarock/">
  <meta property="twitter:title" content="Toca Rock - Rádio Online de Rock Clássico">
  <meta property="twitter:description" content="Ouça rock clássico dos anos 70, 80 e 90. 24h de rock pesado online.">
  <meta property="twitter:image" content="http://localhost/tocarock/assets/logo.png">
  
  <!-- Favicon -->
  <link rel="icon" type="image/png" href="assets/logo.png">
  <link rel="apple-touch-icon" href="assets/logo.png">
  
  <!-- Canonical URL -->
  <link rel="canonical" href="http://localhost/tocarock/">
  
  <!-- PWA Meta Tags -->
  <link rel="manifest" href="manifest.json">
  <meta name="theme-color" content="#ff0000">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
  <meta name="apple-mobile-web-app-title" content="Toca Rock">
  <link rel="apple-touch-startup-image" href="assets/logo.png">
  
  <!-- Stylesheets -->
  <link rel="stylesheet" href="css/style.css" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
</head>
<body>
  <div class="particles" id="particles"></div>
  
  <div class="container">
    <div class="header">
      <div class="logo-container">
        <img src="assets/logo.png" alt="Toca Rock" class="logo-image">
      </div>
      <p class="slogan">SINTA O PESO DA HISTÓRIA... EM ACORDES</p>
      <p class="subtitle">Rock 70s • 80s • 90s</p>
    </div>

    <div class="player-container">
      <button class="play-button" id="playPause">
        <i class="fas fa-play"></i>
      </button>
      
      <!-- Barras gráficas de áudio -->
      <div class="audio-visualizer" id="audioVisualizer">
        <!-- As barras serão criadas via JavaScript -->
      </div>
      
      <audio id="audioPlayer" src="http://localhost:8000/stream"></audio>
      
      <div class="track-info">
        <div class="track-title" id="track">Carregando música atual...</div>
      </div>
      
      <div class="stats">
        <div class="stat">
          <div class="stat-label">Ouvintes</div>
          <div class="stat-value" id="listeners">--</div>
        </div>
        <div class="stat">
          <div class="stat-label">Status</div>
          <div class="stat-value" id="status">Offline</div>
        </div>
      </div>
      
      <div class="clock" id="relogio"></div>
    </div>

    <!-- Botões de compartilhamento -->
    <div class="share-buttons">
      <button class="share-btn" id="shareBtn" title="Compartilhar rádio">
        <i class="fas fa-share-alt"></i>
        <span>Compartilhar</span>
      </button>
      
      <div class="share-options" id="shareOptions">
        <button class="share-option" onclick="shareOnWhatsApp()">
          <i class="fab fa-whatsapp"></i>
          WhatsApp
        </button>
        <button class="share-option" onclick="shareOnFacebook()">
          <i class="fab fa-facebook"></i>
          Facebook
        </button>
        <button class="share-option" onclick="shareOnTwitter()">
          <i class="fab fa-twitter"></i>
          Twitter
        </button>
        <button class="share-option" onclick="copyLink()">
          <i class="fas fa-link"></i>
          Copiar Link
        </button>
      </div>
    </div>

    <div class="footer">
      &copy; 2025 <strong>Toca Rock</strong> · Rock 70s, 80s e 90s · Feito com 🤘 por Gustavo
    </div>
  </div>

  <script src="js/script.js"></script>
  <script src="pwa-install.js"></script>
</body>
</html>
