import express from "express";
import { prisma } from '../database/index.js';

const app = express();


app.post('/', async (req, res) => {
    const { qst, answer } = req.body;

    if (!qst || !answer) {
        res.status(400).send('Missing parameters');
        return;
    }

    /*const response = await fetch(`${process.env.OLLAMA_URL}/api/generate`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            model: 'mistral',
            prompt: 'Tu es un outils de catégorisation de messages en milieu hospitalier. ' +
                'Dans le cadre de tes fonctions tu recevra un contexte médical du patient ' +
                'avec une question posé qu\'on a prefixé par \'-QP-\' et un la réponse du ' +
                'patient préfixé par \'-RD-\'. Ton rôle est de catégoriser les messages en ' +
                `prenant en compte la réponse du patient ainsi que la question posée -QP-` +
                'dans l\'une de ces quatres catégories: \'TVB\' pour tout va bien ou que le' +
                ' patient écris TVB ou tvb ou Tvb, \'ATTENTION REQUISE\' lorsque le patient ' +
                'présente des troubles phyisque ou psychique léger, \'URGENCE\' lorsque le' +
                ' patient présente des troubles phyisque ou psychique grave ou lorsqu\'il sagit' +
                ' d\'une situation grave ou que le message présente un caractère d\'urgence ou ' +
                'que le patient donne une annulation ou un retard à un rendez-vous, \'N/A\' lorsque' +
                ` le message ne répond pas à la -QP- ou n'appartient à aucune autre catégorie. ` +
                'Si la réponse du patient est courte et répond à la question posée, renvoies ' +
                `une chaine vide. Tu ne dois pas donner d'explications. -QP- correspond à la ` +
                `question posé et -RD- à la réponse que tu dois classifier.` +
                `QP : ${qst}` +
                `RD : ${answer}`,
            stream: false,
        }),
    });*/

    // const data = await response.json();


    const user = await prisma.user.findUnique({
        where: {
            email: "test@test.com",
        }
    })

    if (!user) {
        res.send("error").status(404)
    }

    const question = await prisma.question.create({
        data: {
            content: qst,
        }
    })

    if (!question) {
        res.send("error").status(422)
    }



    const answerReq = await prisma.answer.create({
        data: {
            content: answer,
            question: {
                connect: {
                    id: question.id
                }
            },
            author: {
                connect: {
                    id: user.id
                }
            }
        }
    })

    if (!answerReq) {
        res.send("error").status(422)
    }

    res.send("data").status(200);
});

export default app;
