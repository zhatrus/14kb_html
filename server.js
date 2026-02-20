const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;

// ЦЕНТРАЛЬНИЙ КОНФІГ (змінюйте тут, і воно оновиться всюди)
const CONFIG = {
    email: 'your-email@example.com',
    price: '$10',
    webhookUrl: 'https://your-webhook-url.com/incoming' // Вставте свій URL тут
};

const templatesDir = path.join(__dirname, 'templates');
const templates = {};

try {
    const files = fs.readdirSync(templatesDir);
    files.forEach(file => {
        if (file.endsWith('.html')) {
            const templateName = file.replace('.html', '');
            templates[templateName] = fs.readFileSync(path.join(templatesDir, file), 'utf8');
        }
    });
    console.log(`✅ Завантажено шаблонів: ${Object.keys(templates).length}`);
} catch (error) {
    console.error('❌ Помилка завантаження шаблонів.', error);
    process.exit(1);
}

const templateKeys = Object.keys(templates);

function getTemplateIndex(str, count) {
    let hash = 5381;
    for (let i = 0; i < str.length; i++) {
        hash = (hash * 33) ^ str.charCodeAt(i);
    }
    return Math.abs(hash) % count;
}

const server = http.createServer((req, res) => {
    const host = (req.headers.host || 'unknown-domain.com').split(':')[0].toLowerCase();
    const templateIndex = getTemplateIndex(host, templateKeys.length);
    const selectedTemplate = templateKeys[templateIndex];
    
    let html = templates[selectedTemplate];

    // Підстановка глобальних параметрів
    html = html.replace(/{{DOMAIN}}/g, host);
    html = html.replace(/{{EMAIL}}/g, CONFIG.email);
    html = html.replace(/{{PRICE}}/g, CONFIG.price);
    html = html.replace(/{{WEBHOOK}}/g, CONFIG.webhookUrl);

    res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, max-age=3600'
    });
    
    res.end(html);
});

server.listen(PORT, () => {
    console.log(`🚀 Сервер на порту ${PORT}. Конфіг винесено в server.js`);
});