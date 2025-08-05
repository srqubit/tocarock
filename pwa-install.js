// PWA Install Manager
class PWAInstallManager {
  constructor() {
    this.deferredPrompt = null;
    this.installButton = null;
    this.installBanner = null;
    this.isInstalled = false;
    
    this.init();
  }
  
  init() {
    this.createInstallBanner();
    this.setupEventListeners();
    this.checkInstallationStatus();
  }
  
  createInstallBanner() {
    // Criar banner de instalação
    this.installBanner = document.createElement('div');
    this.installBanner.className = 'pwa-install-banner';
    this.installBanner.innerHTML = `
      <div class="pwa-banner-content">
        <div class="pwa-banner-icon">
          <i class="fas fa-download"></i>
        </div>
        <div class="pwa-banner-text">
          <h3>Instalar Toca Rock</h3>
          <p>Adicione à tela inicial para uma experiência melhor!</p>
        </div>
        <div class="pwa-banner-actions">
          <button class="pwa-install-btn" id="pwaInstallBtn">
            <i class="fas fa-plus"></i>
            Instalar
          </button>
          <button class="pwa-dismiss-btn" id="pwaDismissBtn">
            <i class="fas fa-times"></i>
          </button>
        </div>
      </div>
    `;
    
    document.body.appendChild(this.installBanner);
    
    this.installButton = document.getElementById('pwaInstallBtn');
    const dismissButton = document.getElementById('pwaDismissBtn');
    
    // Event listeners
    this.installButton.addEventListener('click', () => this.installPWA());
    dismissButton.addEventListener('click', () => this.dismissBanner());
  }
  
  setupEventListeners() {
    // Capturar evento beforeinstallprompt
    window.addEventListener('beforeinstallprompt', (e) => {
      console.log('beforeinstallprompt disparado');
      e.preventDefault();
      this.deferredPrompt = e;
      this.showInstallBanner();
    });
    
    // Detectar quando o app é instalado
    window.addEventListener('appinstalled', () => {
      console.log('PWA instalado com sucesso!');
      this.isInstalled = true;
      this.hideInstallBanner();
      this.showInstallationSuccess();
    });
    
    // Detectar mudanças na exibição
    window.addEventListener('display-mode-change', () => {
      this.checkInstallationStatus();
    });
  }
  
  checkInstallationStatus() {
    // Verificar se está em modo standalone (instalado)
    if (window.matchMedia('(display-mode: standalone)').matches || 
        window.navigator.standalone === true) {
      this.isInstalled = true;
      this.hideInstallBanner();
    }
    
    // Verificar se já foi instalado antes
    if (localStorage.getItem('pwa-installed')) {
      this.isInstalled = true;
      this.hideInstallBanner();
    }
  }
  
  showInstallBanner() {
    if (!this.isInstalled && this.deferredPrompt) {
      this.installBanner.classList.add('show');
      this.installButton.disabled = false;
    }
  }
  
  hideInstallBanner() {
    this.installBanner.classList.remove('show');
  }
  
  dismissBanner() {
    this.hideInstallBanner();
    // Salvar que o usuário dispensou
    localStorage.setItem('pwa-dismissed', Date.now().toString());
  }
  
  async installPWA() {
    if (!this.deferredPrompt) {
      console.log('Prompt de instalação não disponível');
      return;
    }
    
    try {
      this.installButton.disabled = true;
      this.installButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Instalando...';
      
      // Mostrar prompt de instalação
      this.deferredPrompt.prompt();
      
      // Aguardar resposta do usuário
      const { outcome } = await this.deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        console.log('Usuário aceitou a instalação');
        this.showInstallationSuccess();
      } else {
        console.log('Usuário recusou a instalação');
        this.installButton.disabled = false;
        this.installButton.innerHTML = '<i class="fas fa-plus"></i> Instalar';
      }
      
      this.deferredPrompt = null;
      
    } catch (error) {
      console.error('Erro na instalação:', error);
      this.installButton.disabled = false;
      this.installButton.innerHTML = '<i class="fas fa-plus"></i> Instalar';
    }
  }
  
  showInstallationSuccess() {
    const successMessage = document.createElement('div');
    successMessage.className = 'pwa-success-message';
    successMessage.innerHTML = `
      <div class="pwa-success-content">
        <i class="fas fa-check-circle"></i>
        <h3>Instalado com sucesso!</h3>
        <p>Toca Rock foi adicionado à sua tela inicial.</p>
      </div>
    `;
    
    document.body.appendChild(successMessage);
    
    // Remover após 3 segundos
    setTimeout(() => {
      if (successMessage.parentNode) {
        successMessage.parentNode.removeChild(successMessage);
      }
    }, 3000);
  }
  
  // Registrar service worker
  async registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js');
        console.log('Service Worker registrado:', registration);
        
        // Verificar atualizações
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              this.showUpdateAvailable();
            }
          });
        });
        
        return registration;
      } catch (error) {
        console.error('Erro ao registrar Service Worker:', error);
      }
    }
  }
  
  showUpdateAvailable() {
    const updateMessage = document.createElement('div');
    updateMessage.className = 'pwa-update-message';
    updateMessage.innerHTML = `
      <div class="pwa-update-content">
        <i class="fas fa-sync-alt"></i>
        <h3>Nova versão disponível!</h3>
        <p>Clique para atualizar o app.</p>
        <button class="pwa-update-btn" onclick="location.reload()">
          <i class="fas fa-download"></i>
          Atualizar
        </button>
      </div>
    `;
    
    document.body.appendChild(updateMessage);
    
    // Remover após 10 segundos
    setTimeout(() => {
      if (updateMessage.parentNode) {
        updateMessage.parentNode.removeChild(updateMessage);
      }
    }, 10000);
  }
}

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
  const pwaManager = new PWAInstallManager();
  
  // Registrar service worker
  pwaManager.registerServiceWorker();
  
  // Tornar global para acesso
  window.pwaManager = pwaManager;
}); 