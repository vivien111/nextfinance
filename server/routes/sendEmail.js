import { Router } from "express";
import nodemailer from "nodemailer";

const router = Router();

router.post("/", async (req, res) => {
  const data = req.body;

  // Validation des champs requis
  if (!data.email || !data.first_name || !data.last_name) {
    return res.status(400).json({ 
      success: false, 
      message: "Données manquantes: email, prénom et nom sont requis" 
    });
  }

  try {
    // Configuration du transporteur SMTP
   const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 465,
    secure: true, // ✅ Important pour port 465
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
    });


    // Vérification de la connexion SMTP
    await transporter.verify();

    const mailOptions = {
      from: `"Loan App" <${process.env.SMTP_USER}>`,
      to: process.env.RECEIVER_EMAIL || "admin@example.com",
      subject: "Nouvelle demande de prêt",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">Nouvelle demande de prêt</h2>
          
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 15px 0;">
            <h3 style="color: #374151; margin-top: 0;">Informations personnelles</h3>
            <p><strong>Nom:</strong> ${data.first_name} ${data.last_name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Téléphone:</strong> ${data.phone || "Non renseigné"}</p>
          </div>

          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 15px 0;">
            <h3 style="color: #374151; margin-top: 0;">Détails du prêt</h3>
            <p><strong>Montant:</strong> ${data.loan_amount ? data.loan_amount.toLocaleString() + ' €' : "N/A"}</p>
            <p><strong>Durée:</strong> ${data.loan_duration || "N/A"} mois</p>
            <p><strong>Objectif:</strong> ${data.loan_purpose || "Non spécifié"}</p>
          </div>

          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 15px 0;">
            <h3 style="color: #374151; margin-top: 0;">Situation professionnelle</h3>
            <p><strong>Situation:</strong> ${data.employment_status || "Non renseigné"}</p>
            <p><strong>Revenu mensuel:</strong> ${data.monthly_income ? data.monthly_income.toLocaleString() + ' €' : "N/A"}</p>
          </div>

          ${data.simulation ? `
          <div style="background: #e0f2fe; padding: 20px; border-radius: 8px; margin: 15px 0;">
            <h3 style="color: #0369a1; margin-top: 0;">Simulation</h3>
            <p><strong>Mensualité:</strong> ${data.simulation.monthlyPayment?.toLocaleString() || 'N/A'} €</p>
            <p><strong>Intérêts totaux:</strong> ${data.simulation.totalInterest?.toLocaleString() || 'N/A'} €</p>
            <p><strong>Éligibilité:</strong> ${data.simulation.eligibility || 'N/A'}</p>
            <p><strong>Ratio dette/revenu:</strong> ${data.simulation.debtToIncomeRatio || 'N/A'}%</p>
          </div>
          ` : ''}

          <p style="color: #6b7280; font-size: 12px; margin-top: 20px;">
            Ce message a été généré automatiquement depuis le formulaire de demande de prêt.
          </p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    
    res.status(200).json({ 
      success: true, 
      message: "Demande de prêt envoyée avec succès !" 
    });
    
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email :", error);
    
    let errorMessage = "Erreur lors de l'envoi de la demande";
    if (error.code === 'EAUTH') {
      errorMessage = "Erreur d'authentification SMTP";
    } else if (error.code === 'ECONNECTION') {
      errorMessage = "Impossible de se connecter au serveur SMTP";
    }
    
    res.status(500).json({ 
      success: false, 
      message: errorMessage,
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

export default router;