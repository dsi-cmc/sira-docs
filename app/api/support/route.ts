import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json();

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false, // para a porta 587 (Gmail/TLS)
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: `"${process.env.EMAIL_SENDER_NAME}" <${process.env.EMAIL_SENDER_ADDRESS}>`,
      to: process.env.TO,
      cc: email, // Copia para o remetente conforme solicitado
      subject: `[SIRA Suporte] ${subject}`,
      text: `Nome: ${name}\nEmail: ${email}\n\nMensagem:\n${message}`,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: 'Ticket enviado com sucesso' });
  } catch (error: any) {
    console.error('Erro ao enviar email:', error);
    return NextResponse.json({ success: false, error: 'Ocorreu um erro ao processar o seu pedido.' }, { status: 500 });
  }
}
