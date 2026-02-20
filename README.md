# 14KB Domain Landing Page

Ultra-lightweight domain landing page server that serves random design templates for domain sales. Optimized for super-fast loading with total size under 14KB.

## Features

- **Ultra-lightweight**: Total size under 14KB for instant loading
- **Random templates**: Serves different design templates on each page refresh
- **Environment configuration**: Configurable via environment variables
- **Multi-language support**: Ukrainian/English language switching
- **Responsive design**: Works on all devices
- **Form submissions**: Webhook integration for contact forms

## Quick Start

1. Copy environment configuration:
   ```bash
   cp .env.example .env
   ```

2. Configure your settings in `.env`:
   - `PORT`: Server port (default: 3000)
   - `PRICE`: Domain price (default: $2)
   - `WEBHOOK_URL`: Your webhook endpoint for form submissions

3. Install dependencies and run:
   ```bash
   npm install
   npm start
   ```

## Project Structure

```
├── server.js          # Main server file
├── templates/         # HTML templates
│   ├── design1.html   # Minimal design
│   ├── design2.html   # Terminal-style design
│   └── design3.html   # Gradient card design
├── .env.example       # Environment variables template
└── README.md          # This file
```

## Templates

The server randomly selects one of three templates on each page load:

1. **design1.html**: Clean, minimal design with modern UI
2. **design2.html**: Terminal/hacker-style interface
3. **design3.html**: Animated gradient with 3D card effects

All templates include:
- Domain name display
- Price information
- Contact form with webhook integration
- Ukrainian/English language switching

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `3000` |
| `PRICE` | Domain sale price | `$2` |
| `WEBHOOK_URL` | Webhook endpoint for form submissions | `https://your-webhook-url.com/incoming` |

## Webhook Format

Form submissions send POST requests to your webhook URL with JSON payload:

```json
{
  "domain": "example.com",
  "contact": "user@example.com",
  "message": "Interested in purchasing",
  "price": "$2"
}
```

## Performance Optimization

- Minimal CSS with inline styles
- No external dependencies
- Compressed HTML structure
- Efficient JavaScript
- Server-side template rendering
- No external fonts or images

## Deployment

The server is designed for easy deployment on any Node.js hosting platform:

1. Set environment variables in your hosting environment
2. Deploy the code
3. The server will start automatically

## License

MIT License - feel free to use and modify for your projects.
