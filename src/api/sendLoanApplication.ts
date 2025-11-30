// src/api/sendLoanApplication.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const data = req.body;

  try {
    // Configure ton SMTP
    const transporter = nodemailer.createTransport({
      host: 'smtp.example.com', // remplace par ton SMTP
      port: 587,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Loan App" <${process.env.SMTP_USER}>`,
      to: 'destinataire@example.com', // email de réception
      subject: 'Nouvelle demande de prêt',
      html: `<pre>${JSON.stringify(data, null, 2)}</pre>`,
    });

    res.status(200).json({ success: true });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
}
