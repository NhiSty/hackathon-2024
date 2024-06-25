import express from "express";
//import { prisma } from '../database/index.js';

const app = express();

app.post('/', async (req, res) => {
    //const { messages } = req.body;

    const response = await fetch(`${process.env.OLLAMA_URL}/api/generate`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            model: 'mistral',
            prompt: 'Coucou, comment ça va ?',
            stream: false,
        }),
    });

    const data = await response.json();

    console.log(data['response']);

    res.send(data).status(200);
});

export default app;
