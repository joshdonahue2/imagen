# Integration Guide: AI Image Generator

This guide provides step-by-step instructions for integrating the AI Image Generator module into your existing Node.js application.

## 1. Add Dependencies

Your project needs the following npm packages. Add them to your `package.json` and run `npm install`:

```json
"dependencies": {
  "axios": "^1.6.0",
  "cors": "^2.8.5",
  "express": "^4.18.2",
  "uuid": "^9.0.1"
}
```

If you are using a different version of Express, it should still be compatible.

## 2. Configure Environment Variables

The image generator requires the following environment variables. You can add them to a `.env` file or set them in your deployment environment.

```
# The full URL of your n8n webhook for image generation
N8N_WEBHOOK_URL=http://your-n8n-instance:5678/webhook/generate-image

# The public-facing base URL of your application.
# This is used to construct the callback URL that n8n will use to send the generated image back to your server.
CALLBACK_BASE_URL=https://your-app-domain.com
```

**Note:** The `CALLBACK_BASE_URL` must be reachable from your n8n instance.

## 3. Integrate Backend

The backend logic is contained in a modular Express router. You can easily integrate it into your existing Express server.

### a. Copy Files

Copy the following files into your project:

- `image-generator.router.js`
- `public/style.css`
- `public/script.js`

Place `image-generator.router.js` in a suitable location, for example, in a `routes` or `modules` directory. Place the `public` files in your static assets directory.

### b. Mount the Router

In your main server file (e.g., `server.js` or `app.js`), import the router and mount it on a specific path. The frontend expects the API to be available at `/api`.

```javascript
const express = require('express');
const { router: imageGeneratorRouter } = require('./path/to/image-generator.router.js');

const app = express();

// ... your other middleware (cors, bodyParser, etc.)

// Mount the image generator API router
app.use('/api/image-generator', imageGeneratorRouter);

// ... your other routes and server setup
```

**Important:** If you mount the router on a different path (e.g., `/api/images`), you will need to update the API endpoints in `public/script.js` to match. For example, change `/api/generate` to `/api/images/generate`.

## 4. Integrate Frontend

The frontend is composed of three files: `index.html`, `style.css`, and `script.js`.

### a. Copy HTML

Copy the HTML content from `public/index.html` into the appropriate view or component in your application. You will need to create a new page for the image generator.

The core HTML structure is inside the `<body>` tag. You can copy the `<div class="container">...</div>` and all its contents.

### b. Link CSS and JavaScript

Make sure the page where you've added the HTML also includes the CSS and JavaScript files.

In the `<head>` of your HTML, add the stylesheet:
```html
<link rel="stylesheet" href="/path/to/your/assets/style.css">
```

At the end of your `<body>`, add the script:
```html
<script src="/path/to/your/assets/script.js"></script>
```

Ensure the paths are correct based on how your application serves static assets.

## 5. Verification

Once you have integrated the files and configured the environment:
1. Start your application.
2. Navigate to the page where you added the image generator frontend.
3. Open your browser's developer console to check for any errors.
4. Try generating an image. You should see status updates and, eventually, the generated image.

If you encounter issues, check the following:
- Your application server logs for any errors.
- Your browser's console for frontend errors.
- Your n8n instance to see if the webhook is being triggered.
- Network connectivity between your application and n8n.
