const CACHE_NAME = 'toca-rock-v1.0.0';
const urlsToCache = [
  '/',
  '/index.php',
  '/css/style.css',
  '/js/script.js',
  '/assets/logo.png',
  '/api/nowplaying.php',
  '/api/status.php',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css',
  'https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@300;400;600;700&display=swap'
];

// Instalação do Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Cache aberto');
        return cache.addAll(urlsToCache);
      })
      .catch((error) => {
        console.log('Erro ao fazer cache:', error);
      })
  );
});

// Ativação do Service Worker
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Removendo cache antigo:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Interceptação de requisições
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Retorna do cache se disponível
        if (response) {
          return response;
        }

        // Se não estiver no cache, busca da rede
        return fetch(event.request)
          .then((response) => {
            // Verifica se a resposta é válida
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clona a resposta para não consumir o stream
            const responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });

            return response;
          })
          .catch(() => {
                      // Fallback para páginas offline
          if (event.request.destination === 'document') {
            return caches.match('/');
          }
          });
      })
  );
});

// Mensagem para sincronização em background
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

// Função para sincronização em background
function doBackgroundSync() {
  return fetch('/api/nowplaying.php')
    .then((response) => response.json())
    .then((data) => {
      // Envia notificação se houver nova música
      if (data.success && data.track) {
        self.registration.showNotification('Toca Rock', {
          body: `Tocando agora: ${data.track}`,
          icon: '/assets/logo.png',
          badge: '/assets/logo.png',
          tag: 'now-playing',
          requireInteraction: false,
          silent: true
        });
      }
    })
    .catch((error) => {
      console.log('Erro na sincronização:', error);
    });
}

// Notificações push
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'Nova música no Toca Rock!',
    icon: '/assets/logo.png',
    badge: '/assets/logo.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'play',
        title: 'Tocar',
        icon: '/assets/logo.png'
      },
      {
        action: 'close',
        title: 'Fechar',
        icon: '/assets/logo.png'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('Toca Rock', options)
  );
});

// Clique em notificação
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'play') {
    event.waitUntil(
      clients.openWindow('/')
    );
  } else if (event.action === 'close') {
    // Apenas fecha a notificação
  } else {
    // Clique na notificação principal
    event.waitUntil(
      clients.openWindow('/')
    );
  }
}); 