import { Router } from "express";
import nodemailer from "nodemailer";

const router = Router();

router.post("/", async (req, res) => {
  const data = req.body;

  if (!data.email || !data.first_name || !data.last_name) {
    return res.status(400).json({ success: false, message: "Données manquantes" });
  }

  try {
    // Crée le transporteur SMTP
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,     // ex: smtp.gmail.com
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,                    // true pour port 465
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Contenu de l’email
    const mailOptions = {
      from: `"Loan App" <${process.env.SMTP_USER}>`,
      to: process.env.RECEIVER_EMAIL || "destinataire@example.com",
      subject: "Nouvelle demande de prêt",
      html: `
        <h2>Nouvelle demande de prêt</h2>
        <p><strong>Nom:</strong> ${data.first_name} ${data.last_name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Téléphone:</strong> ${data.phone}</p>
        <p><strong>Montant du prêt:</strong> ${data.loan_amount}</p>
        <p><strong>Durée du prêt:</strong> ${data.loan_duration} mois</p>
        <p><strong>Revenu mensuel:</strong> ${data.monthly_income}</p>
        <p><strong>Situation professionnelle:</strong> ${data.employment_status}</p>
        <p><strong>But du prêt:</strong> ${data.loan_purpose}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ success: true, message: "Email envoyé avec succès !" });
  } catch (error: any) {
    console.error("Erreur lors de l'envoi de l'email :", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
