<?php
// Forçar encoding UTF-8
mb_internal_encoding('UTF-8');
mb_http_output('UTF-8');

// Verificar se o PHP está funcionando
if (!function_exists('file_get_contents')) {
    die(json_encode(['success' => false, 'error' => 'PHP não está funcionando']));
}

// Headers corretos para UTF-8
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Cache-Control: no-cache, must-revalidate');

// Caminho do arquivo
$nowPlayingFile = 'C:\\RadioDJv2\\NowPlaying.txt';

try {
    // Verificar se o arquivo existe
    if (!file_exists($nowPlayingFile)) {
        echo json_encode([
            'success' => false,
            'error' => 'Arquivo não encontrado: ' . $nowPlayingFile,
            'track' => 'Música não disponível',
            'timestamp' => date('Y-m-d H:i:s')
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }
    
    // Ler o arquivo
    $content = file_get_contents($nowPlayingFile);
    
    if ($content === false) {
        throw new Exception('Não foi possível ler o arquivo');
    }
    
    // Verificar e corrigir encoding
    if (!mb_check_encoding($content, 'UTF-8')) {
        $content = mb_convert_encoding($content, 'UTF-8', 'ISO-8859-1');
    }
    
    // Limpar o conteúdo
    $track = trim($content);
    
    if (!empty($track)) {
        echo json_encode([
            'success' => true,
            'track' => $track,
            'timestamp' => date('Y-m-d H:i:s')
        ], JSON_UNESCAPED_UNICODE);
    } else {
        echo json_encode([
            'success' => false,
            'error' => 'Arquivo vazio',
            'track' => 'Música não disponível',
            'timestamp' => date('Y-m-d H:i:s')
        ], JSON_UNESCAPED_UNICODE);
    }
    
} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'error' => 'Erro ao ler arquivo: ' . $e->getMessage(),
        'track' => 'Erro ao carregar música',
        'timestamp' => date('Y-m-d H:i:s')
    ], JSON_UNESCAPED_UNICODE);
}
?> 