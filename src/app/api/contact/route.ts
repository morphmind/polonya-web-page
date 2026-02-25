import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const TO_EMAIL = process.env.CONTACT_EMAIL ?? 'info@smileandholiday.com';
const FROM_EMAIL = process.env.RESEND_FROM ?? 'Smile&Holiday <onboarding@resend.dev>';

export async function POST(request: NextRequest) {
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json(
      { error: 'E-posta servisi yapılandırılmamış (RESEND_API_KEY eksik)' },
      { status: 500 }
    );
  }

  try {
    const body = await request.json();
    const { name, email, phone, treatment, dates, message } = body;

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: 'Ad, e-posta ve mesaj zorunludur' },
        { status: 400 }
      );
    }

    const subject = `[Smile&Holiday] Yeni mesaj: ${String(name).trim()}`;
    const html = `
      <h2>Yeni İletişim Formu Mesajı</h2>
      <p><strong>Ad:</strong> ${escapeHtml(String(name).trim())}</p>
      <p><strong>E-posta:</strong> ${escapeHtml(String(email).trim())}</p>
      <p><strong>Telefon:</strong> ${escapeHtml(String(phone || '-').trim())}</p>
      <p><strong>Tedavi:</strong> ${escapeHtml(String(treatment || '-').trim())}</p>
      <p><strong>Tarihler:</strong> ${escapeHtml(String(dates || '-').trim())}</p>
      <p><strong>Mesaj:</strong></p>
      <p>${escapeHtml(String(message).trim()).replace(/\n/g, '<br>')}</p>
    `;

    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [TO_EMAIL],
      replyTo: String(email).trim(),
      subject,
      html,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: error.message ?? 'E-posta gönderilemedi' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (err) {
    console.error('Contact API error:', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Beklenmeyen hata' },
      { status: 500 }
    );
  }
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
