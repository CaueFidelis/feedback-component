import express from 'express';
import { prisma } from './prisma';
import nodemailer from 'nodemailer';

const app = express();
app.use(express.json());

app.listen(3333, () => {
  console.log('HTTP server running!');
});

const transport = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: '72a4da3710c102',
    pass: 'd794d01fb87581',
  },
});

app.post('/feedbacks', async (req, res) => {
  const { type, comment, screenshot } = req.body;
  const feedback = await prisma.feedback.create({
    data: {
      type,
      comment,
      screenshot,
    },
  });

  await transport.sendMail({
    from: 'Equipe Feedget <oi@geedget.com>',
    to: 'Caue Fidelis <cauefidelis@live.com',
    subject: 'Novo Feedback',
    html: [
      `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
      `<p>Tipo do feedback: ${type}</p>`,
      `<p>Comentário: ${comment}</p>`,
      `</div>`,
    ].join('\n')
  });

  return res.status(201).json({ data: feedback });
});
