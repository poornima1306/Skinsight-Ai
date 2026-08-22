import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { analyzeSkinImageWithGemini, chatWithSkinAssistantWithGemini } from './server/geminiService';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

// High body limit to support high-res dermatological photographs in base64
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Skin Analysis Endpoint
app.post('/api/analyze-skin', async (req, res) => {
  try {
    const { imageBase64, mimeType, datasetKey } = req.body;
    if (!imageBase64) {
      return res.status(400).json({ error: 'Image data is required.' });
    }

    const result = await analyzeSkinImageWithGemini({
      imageBase64,
      mimeType,
      datasetKey
    });

    res.json(result);
  } catch (error: any) {
    console.error('Error in /api/analyze-skin:', error);
    res.status(500).json({
      error: error?.message || 'Failed to analyze skin image with AI model.'
    });
  }
});

// Chat Assistant Endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { prompt, analysisContext, chatHistory, imageBase64 } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required.' });
    }

    const answer = await chatWithSkinAssistantWithGemini({
      prompt,
      analysisContext,
      chatHistory,
      imageBase64
    });

    res.json({ answer });
  } catch (error: any) {
    console.error('Error in /api/chat:', error);
    res.status(500).json({
      error: error?.message || 'Failed to generate chat response.'
    });
  }
});

// Serve static frontend in production
const distPath = path.resolve(__dirname, 'dist');
app.use(express.static(distPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`SkinSight AI Server running on port ${PORT}`);
});
