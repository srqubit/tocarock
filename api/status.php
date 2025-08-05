<?php
// Forçar encoding UTF-8
mb_internal_encoding('UTF-8');
mb_http_output('UTF-8');

// Verificar se o PHP está funcionando
if (!function_exists('file_get_contents')) {
    die(json_encode(['success' => false, 'error' => 'PHP não está funcionando'], JSON_UNESCAPED_UNICODE));
}

// Headers corretos para UTF-8
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Cache-Control: no-cache, must-revalidate');

$icecastUrl = 'https://stream.tocarock.com.br/status-json.xsl';

try {
    // Configurar contexto para timeout
    $context = stream_context_create([
        'http' => [
            'timeout' => 3,
            'user_agent' => 'TocaRadio/1.0',
            'ignore_errors' => true
        ]
    ]);
    
    // Tentar conectar ao Icecast
    $data = file_get_contents($icecastUrl, false, $context);
    
    if ($data === false) {
        // Se não conseguir conectar, retornar status offline
        echo json_encode([
            'success' => false,
            'error' => 'Não foi possível conectar ao Icecast',
            'title' => 'Desconhecida',
            'listeners' => 0,
            'status' => 'Offline',
            'timestamp' => date('Y-m-d H:i:s')
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }
    
    // Decodificar JSON
    $icecastData = json_decode($data, true);
    
    if (json_last_error() !== JSON_ERROR_NONE) {
        throw new Exception('Erro ao decodificar JSON do Icecast: ' . json_last_error_msg());
    }
    
    $source = $icecastData['icestats']['source'] ?? [];
    
    // Informações básicas
    $title = $source['title'] ?? 'Desconhecida';
    $listeners = $source['listeners'] ?? 0;
    $bitrate = $source['bitrate'] ?? 0;
    $genre = $source['genre'] ?? 'Rock';
    
    // Status baseado nos ouvintes
    $status = $listeners > 0 ? 'Online' : 'Offline';
    
    // Informações adicionais
    $uptime = $source['stream_start'] ?? '';
    $peak = $source['listener_peak'] ?? 0;
    
    echo json_encode([
        'success' => true,
        'title' => $title,
        'listeners' => $listeners,
        'bitrate' => $bitrate,
        'genre' => $genre,
        'status' => $status,
        'peak_listeners' => $peak,
        'uptime' => $uptime,
        'timestamp' => date('Y-m-d H:i:s')
    ], JSON_UNESCAPED_UNICODE);
    
} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage(),
        'title' => 'Desconhecida',
        'listeners' => 0,
        'status' => 'Offline',
        'timestamp' => date('Y-m-d H:i:s')
    ], JSON_UNESCAPED_UNICODE);
}
?>
