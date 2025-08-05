# Toca Rock - Sistema de Rádio Online

## Como usar o sistema:

### 1. Iniciar o servidor
- Abra o **XAMPP Control Panel**
- Clique em **"Start"** ao lado de **Apache**
- Aguarde até aparecer "Running" em verde

### 2. Acessar o site
- Abra seu navegador
- Digite: `http://localhost/tocarock/`
- **NÃO abra o arquivo index.php diretamente**

### 3. PWA (Progressive Web App)
O sistema funciona como um PWA completo:

**Funcionalidades PWA:**
- ✅ **Instalação nativa** - Adicione à tela inicial
- ✅ **Modo standalone** - Funciona como app nativo
- ✅ **Cache offline** - Funciona sem internet
- ✅ **Notificações push** - Receba atualizações
- ✅ **Atualizações automáticas** - Sempre a versão mais recente
- ✅ **Compatibilidade iOS** - Funciona em iPhones

**Como instalar:**
1. **Android/Chrome**: Aparecerá banner de instalação
2. **iOS/Safari**: Toque em "Compartilhar" → "Adicionar à Tela Inicial"
3. **Desktop**: Clique no ícone de instalação na barra de endereços

### 4. Se aparecer erro de JSON com "<?php"
**Isso indica que o PHP não está sendo processado pelo servidor.**

**Soluções:**
1. **Verifique se o Apache está rodando** no XAMPP Control Panel
2. **Acesse através do servidor web:** `http://localhost/tocarock/`
3. **Teste o PHP:** `http://localhost/tocarock/teste-php.php`
4. **Teste encoding:** `http://localhost/tocarock/teste-encoding.php`
5. **Teste simples:** `http://localhost/tocarock/teste-simples.php`
6. **Fix encoding:** `http://localhost/tocarock/fix-encoding.php`
7. **Diagnóstico completo:** `http://localhost/tocarock/diagnostico.php`

### 5. Problemas de Encoding UTF-8
**Se aparecer caracteres estranhos como "Ã£", "Ã³":**

**Soluções:**
1. **Todos os arquivos PHP foram corrigidos** com encoding UTF-8
2. **Teste o encoding:** `http://localhost/tocarock/teste-encoding.php`
3. **Teste simples:** `http://localhost/tocarock/teste-simples.php`
4. **Fix encoding:** `http://localhost/tocarock/fix-encoding.php`
5. **Verifique se o navegador está em UTF-8**

### 6. Configuração do Icecast
- O sistema está configurado para conectar no Icecast na porta 8000
- Se seu Icecast estiver em outra porta, edite o arquivo `js/script.js`

### 7. Arquivo de música atual
- O sistema lê a música atual do arquivo: `C:\RadioDJv2\NowPlaying.txt`
- Este arquivo deve estar em UTF-8
- O sistema atualiza a cada 5 segundos

### 8. Funcionalidades
- **Botão Play/Pause**: Controla a reprodução do stream
- **Barras gráficas de áudio**: Animações visuais quando tocando
- **Música atual**: Mostra a música que está tocando
- **Ouvintes online**: Número de pessoas ouvindo
- **Status**: Se o stream está online/offline
- **Relógio**: Data e hora atual
- **Compartilhamento**: Botão para compartilhar nas redes sociais
- **Instalação PWA**: Banner para instalar como app

### 9. Efeitos visuais
- **Logo animado**: Imagem com efeitos de brilho
- **Barras gráficas de áudio**: Simulam o som tocando
- Partículas animadas no fundo
- Botão com brilho e animações
- Design responsivo para mobile
- **Banner de instalação PWA**: Elegante e não intrusivo

### 10. Experiência Mobile
- **Design responsivo**: Otimizado para smartphones
- **Área de toque aumentada**: Botões maiores para touch
- **Feedback tátil**: Resposta visual ao toque
- **Layout adaptativo**: Ajusta automaticamente ao tamanho da tela
- **Barras de áudio otimizadas**: Menos barras no mobile para melhor performance
- **Logo responsivo**: Tamanho adaptado para cada dispositivo
- **PWA nativo**: Funciona como app instalado

### 11. Troubleshooting

**Erro: "Unexpected token '<', "<?php"**
- ✅ Verifique se está acessando via `http://localhost/tocarock/`
- ✅ Verifique se o Apache está rodando
- ✅ Teste: `http://localhost/tocarock/teste-php.php`

**Erro: Caracteres estranhos (Ã£, Ã³)**
- ✅ Teste encoding: `http://localhost/tocarock/teste-encoding.php`
- ✅ Teste simples: `http://localhost/tocarock/teste-simples.php`
- ✅ Fix encoding: `http://localhost/tocarock/fix-encoding.php`
- ✅ Verifique se o navegador está em UTF-8
- ✅ Todos os arquivos PHP foram corrigidos

**Erro: "Arquivo não encontrado"**
- ✅ Verifique se o arquivo `C:\RadioDJv2\NowPlaying.txt` existe
- ✅ Crie o arquivo se necessário

**Erro: "Não foi possível conectar ao Icecast"**
- ✅ Verifique se o Icecast está rodando na porta 8000
- ✅ Teste: `http://localhost:8000/status-json.xsl`

**Logo não aparece**
- ✅ Verifique se o arquivo `assets/logo.png` existe
- ✅ Verifique se o caminho está correto

**PWA não instala**
- ✅ Verifique se está usando HTTPS ou localhost
- ✅ Verifique se o manifest.json está acessível
- ✅ Verifique se o service worker está registrado
- ✅ No iOS, use Safari e "Adicionar à Tela Inicial"

### 12. Arquivos de teste
- `teste-php.php` - Teste básico do PHP
- `teste-encoding.php` - Teste de encoding UTF-8
- `teste-simples.php` - Teste muito simples
- `fix-encoding.php` - Fix completo de encoding
- `diagnostico.php` - Diagnóstico completo do sistema

### 13. Personalização
- Cores e efeitos podem ser alterados no arquivo `css/style.css`
- Comportamento do JavaScript no arquivo `js/script.js`
- APIs no diretório `api/`
- Logo pode ser alterado substituindo `assets/logo.png`
- Configurações PWA no arquivo `manifest.json`

### 14. Correções aplicadas
- ✅ **Encoding UTF-8** em todos os arquivos PHP
- ✅ **Headers corretos** para UTF-8
- ✅ **JSON_UNESCAPED_UNICODE** em todos os json_encode
- ✅ **mb_internal_encoding** e **mb_http_output** configurados
- ✅ **Tratamento de erros** melhorado
- ✅ **Múltiplos arquivos de teste** para diagnóstico
- ✅ **Barras gráficas de áudio** animadas
- ✅ **Design responsivo** otimizado para mobile
- ✅ **Experiência touch** melhorada
- ✅ **Nome corrigido** para "Toca Rock"
- ✅ **Logo personalizado** com imagem em vez de texto
- ✅ **Favicon atualizado** com o logo
- ✅ **SEO otimizado** com meta tags completas
- ✅ **Compartilhamento** nas redes sociais
- ✅ **PWA completo** com instalação nativa
- ✅ **Service Worker** para cache offline
- ✅ **Compatibilidade iOS** para iPhones
- ✅ **Banner de instalação** elegante
- ✅ **Notificações push** para atualizações 