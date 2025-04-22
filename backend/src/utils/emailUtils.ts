import nodemailer from 'nodemailer';

export async function sendEmail(to: string, subject: string, text: string): Promise<void> {
  // Crie um transportador (exemplo com Gmail — você pode usar outro provedor)
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,        // Seu email
      pass: process.env.EMAIL_PASS,        // Sua senha ou app password
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email enviado para ${to}`);
  } catch (error) {
    console.error('Erro ao enviar email:', error);
    throw new Error('Falha no envio do email');
  }
}