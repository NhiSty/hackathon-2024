import express from "express";
import { Ollama } from 'ollama'
//import { prisma } from '../database/index.js';

const app = express();
const ollama = new Ollama({ host: 'http://localhost:11434' })

app.post('/', async (req, res) => {
    const { model, messages } = req.body;

    if (!model || !messages) {
        return res.status(400).json({ error: 'Missing required parameters' });
    }

    const response = await ollama.chat({ model, messages });

    return res.json(response).status(200);
});

export default app;