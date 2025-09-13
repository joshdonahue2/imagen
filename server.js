const express = require('express');
const cors = require('cors');
const path = require('path');
const { router: imageGeneratorRouter, getActiveTasks } = require('./image-generator.router');

const app = express();
const PORT = process.env.PORT || 3000;
const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL || 'https://n8n.donahuenet.xyz/webhook/image';

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.static('public'));

// API Router
app.use('/api', imageGeneratorRouter);

// Serve the frontend
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'healthy',
        timestamp: new Date().toISOString(),
        activeTasks: getActiveTasks()
    });
});

// Error handling middleware
app.use((error, req, res, next) => {
    console.error('Unhandled error:', error);
    res.status(500).json({ 
        error: 'Internal server error' 
    });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({ 
        error: 'Endpoint not found' 
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Frontend available at: https://imagen.donahuenet.xyz`);
    console.log(`API health check: https://imagen.donahuenet.xyz/api/health`);
    console.log(`n8n webhook URL: ${N8N_WEBHOOK_URL}`);
});

module.exports = app;