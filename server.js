const http = require('http');
const fs = require('fs');
const path = require('path');

// КОНФІГУРАЦІЯ
const PORT = 3001;
const CONFIG = {
    price: '$10',
    webhookUrl: 'https://your-webhook-url.com/incoming'
};

const templatesDir = path.join(__dirname, 'templates');
const templates = {};

// Завантаження всіх HTML шаблонів з папки
try {
    const files = fs.readdirSync(templatesDir);
    files.forEach(file => {
        if (file.endsWith('.html')) {
            const templateName = file.replace('.html', '');
            templates[templateName] = fs.readFileSync(path.join(templatesDir, file), 'utf8');
        }
    });
} catch (error) {
    console.error('Помилка завантаження шаблонів:', error);
    process.exit(1);
}

const templateKeys = Object.keys(templates);

const server = http.createServer((req, res) => {
    const host = (req.headers.host || 'unknown-domain.com').split(':')[0].toLowerCase();

    // AI API Endpoint
    if (req.url === '/api/ai' && req.method === 'POST') {
        // ... (логіка AI залишається без змін)
        return;
    }

    // ВИПАДКОВИЙ ВИБІР ШАБЛОНУ ПРИ КОЖНОМУ ОНОВЛЕННІ
    const randomIndex = Math.floor(Math.random() * templateKeys.length);
    const selectedTemplate = templateKeys[randomIndex];
    
    let html = templates[selectedTemplate] || 'Template not found';

    // Підстановка динамічних параметрів
    html = html.replace(/{{DOMAIN}}/g, host);
    html = html.replace(/{{PRICE}}/g, CONFIG.price);
    html = html.replace(/{{WEBHOOK}}/g, CONFIG.webhookUrl);

    res.writeHead(200, { 
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'no-store, no-cache, must-revalidate' // Забороняємо кешування, щоб рандом працював завжди
    });
    res.end(html);
});

server.listen(PORT, () => {
    console.log(`🚀 Сервер запущено. Тепер шаблони змінюються випадково при оновленні!`);
});
