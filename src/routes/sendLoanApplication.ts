import express, { Request, Response } from 'express';
import nodemailer from 'nodemailer';

const app = express();
app.use(express.json());

app.post('/sendLoanApplication', async (req: Request, res: Response) => {
  const data = req.body;

  try {
    // Crée le transporteur SMTP
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false, // true pour port 465, false pour 587
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Envoi de l'email
    await transporter.sendMail({
      from: `"Loan App" <${process.env.SMTP_USER}>`,
      to: process.env.RECIPIENT_EMAIL, // destinataire configurable via .env
      subject: 'Nouvelle demande de prêt',
      html: `<h2>Nouvelle demande de prêt</h2>
             <pre>${JSON.stringify(data, null, 2)}</pre>`,
    });

    return res.status(200).json({ success: true, message: 'Email envoyé avec succès.' });
  } catch (error: any) {
    console.error('Erreur en envoyant l’email:', error);
    return res.status(500).json({ success: false, error: error?.message || 'Erreur inconnue' });
  }
});

export default app;
