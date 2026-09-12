import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

const app = express();
const PORT = process.env.PORT || 4000;
const RECIPIENT_EMAIL = process.env.RSVP_RECIPIENT_EMAIL || 'princefootball020@gmail.com';

// FRONTEND_ORIGIN can be a single URL or a comma-separated list
// (e.g. "https://your-site.vercel.app,https://www.your-site.com").
// In production this should NEVER be left as "*" — that would let any
// website on the internet call your email-sending endpoint.
const rawOrigins = (process.env.FRONTEND_ORIGIN || '*').split(',').map((o) => o.trim());
const allowAnyOrigin = rawOrigins.includes('*');

// --- Security middleware -------------------------------------------------
app.set('trust proxy', 1); // needed so rate limiting sees the real client IP behind Vercel/Render/etc.
app.use(helmet());
app.use(
  cors({
    origin: allowAnyOrigin
      ? true
      : (origin, callback) => {
          // Allow server-to-server / curl requests with no Origin header (e.g. health checks)
          if (!origin || rawOrigins.includes(origin)) return callback(null, true);
          callback(new Error('Not allowed by CORS'));
        },
  })
);
app.use(express.json({ limit: '10kb' }));

// Protect the RSVP endpoint from abuse: 5 submissions per IP every 10 minutes.
const rsvpLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Trop de tentatives. Merci de réessayer dans quelques minutes." },
});

// --- Mail sending (Resend HTTP API) --------------------------------------
// Uses Resend (https://resend.com) over plain HTTPS instead of SMTP.
// Many free hosts (including Render's free tier) block outbound SMTP ports
// (25/465/587) to prevent spam abuse, which breaks Gmail-SMTP-based mailers.
// Resend avoids that entirely since it's a normal HTTPS API call.
// See backend/README.md (or the main README) for setup instructions.
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const RESEND_FROM = process.env.RESEND_FROM || 'RSVP L&H <onboarding@resend.dev>';

async function sendRsvpEmail({ subject, text, html }) {
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: RESEND_FROM,
      to: RECIPIENT_EMAIL,
      subject,
      text,
      html,
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text().catch(() => '');
    throw new Error(`Resend API error (${response.status}): ${errorBody}`);
  }
}

// --- Helpers -------------------------------------------------------------
function escapeHtml(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

const CEREMONY_LABELS = {
  traditionnel: 'Mariage Traditionnel — Vendredi 11 Décembre 2026',
  religieux: 'Mariage Religieux — Samedi 12 Décembre 2026',
};

const MAX_LENGTHS = { fullName: 100, phone: 30, message: 1000 };

// Strips CR/LF characters. Without this, a field placed into an email
// header (like the subject line) could be used to inject extra headers
// or additional recipients — a classic "email header injection" attack.
function stripNewlines(str = '') {
  return String(str).replace(/[\r\n]+/g, ' ').trim();
}

function validateRsvp(body) {
  const errors = {};
  const { fullName, phone, ceremonies, guests, message, wantsPagne } = body || {};

  if (!fullName || typeof fullName !== 'string' || !fullName.trim()) {
    errors.fullName = 'Le nom complet est requis.';
  } else if (fullName.trim().length > MAX_LENGTHS.fullName) {
    errors.fullName = `Le nom complet doit faire moins de ${MAX_LENGTHS.fullName} caractères.`;
  }

  if (!phone || typeof phone !== 'string' || !phone.trim()) {
    errors.phone = 'Le numéro de téléphone est requis.';
  } else if (phone.trim().length > MAX_LENGTHS.phone) {
    errors.phone = `Le numéro de téléphone doit faire moins de ${MAX_LENGTHS.phone} caractères.`;
  }

  if (!Array.isArray(ceremonies) || ceremonies.length === 0) {
    errors.ceremonies = 'Sélectionnez au moins une cérémonie.';
  } else if (!ceremonies.every((c) => Object.keys(CEREMONY_LABELS).includes(c))) {
    errors.ceremonies = 'Cérémonie invalide.';
  }

  if (guests === undefined || guests === null || Number.isNaN(Number(guests)) || Number(guests) < 1 || Number(guests) > 20) {
    errors.guests = 'Le nombre d\u2019invités doit être entre 1 et 20.';
  }

  if (message && typeof message === 'string' && message.length > MAX_LENGTHS.message) {
    errors.message = `Le message doit faire moins de ${MAX_LENGTHS.message} caractères.`;
  }

  // Only required when the traditional ceremony is among the selected ones.
  if (Array.isArray(ceremonies) && ceremonies.includes('traditionnel')) {
    if (wantsPagne !== 'oui' && wantsPagne !== 'non') {
      errors.wantsPagne = 'Merci de préciser si vous souhaitez porter le pagne.';
    }
  }

  return errors;
}

// --- Routes ----------------------------------------------------------
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.post('/api/rsvp', rsvpLimiter, async (req, res) => {
  const errors = validateRsvp(req.body);
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ message: 'Certains champs sont invalides.', errors });
  }

  const { ceremonies, guests } = req.body;
  const fullName = stripNewlines(req.body.fullName).slice(0, MAX_LENGTHS.fullName);
  const phone = stripNewlines(req.body.phone).slice(0, MAX_LENGTHS.phone);
  const message = req.body.message ? String(req.body.message).slice(0, MAX_LENGTHS.message) : '';
  const wantsPagne = ceremonies.includes('traditionnel') ? req.body.wantsPagne : null;
  const pagneLabel = wantsPagne === 'oui' ? 'Oui' : wantsPagne === 'non' ? 'Non' : null;

  const ceremonyList = ceremonies.map((c) => CEREMONY_LABELS[c]).join(', ');

  const html = `
    <div style="font-family: Georgia, serif; max-width: 560px; margin: 0 auto; color: #2e2013;">
      <div style="background: linear-gradient(100deg, #a8761f, #e8c874); padding: 24px; text-align: center; border-radius: 12px 12px 0 0;">
        <h1 style="margin: 0; color: #1b120c; font-size: 22px; letter-spacing: 1px;">Nouvelle confirmation RSVP</h1>
      </div>
      <div style="background: #fdf6ec; padding: 28px; border: 1px solid #e8c874; border-top: none; border-radius: 0 0 12px 12px;">
        <table style="width: 100%; border-collapse: collapse; font-size: 15px;">
          <tr>
            <td style="padding: 8px 0; color: #a8761f; font-weight: bold; width: 160px;">Nom complet</td>
            <td style="padding: 8px 0;">${escapeHtml(fullName)}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #a8761f; font-weight: bold;">Téléphone</td>
            <td style="padding: 8px 0;">${escapeHtml(phone)}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #a8761f; font-weight: bold;">Cérémonie(s)</td>
            <td style="padding: 8px 0;">${escapeHtml(ceremonyList)}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #a8761f; font-weight: bold;">Invités</td>
            <td style="padding: 8px 0;">${escapeHtml(String(guests))}</td>
          </tr>
          ${pagneLabel ? `<tr>
            <td style="padding: 8px 0; color: #a8761f; font-weight: bold;">Souhaite le pagne</td>
            <td style="padding: 8px 0;">${escapeHtml(pagneLabel)}</td>
          </tr>` : ''}
          ${message ? `<tr>
            <td style="padding: 8px 0; color: #a8761f; font-weight: bold; vertical-align: top;">Message</td>
            <td style="padding: 8px 0;">${escapeHtml(message)}</td>
          </tr>` : ''}
        </table>
        <p style="margin-top: 24px; font-size: 12px; color: #8a7357;">
          Reçu le ${new Date().toLocaleString('fr-FR', { dateStyle: 'long', timeStyle: 'short' })}
        </p>
      </div>
    </div>
  `;

  const text = `Nouvelle confirmation RSVP
Nom complet: ${fullName}
Téléphone: ${phone}
Cérémonie(s): ${ceremonyList}
Invités: ${guests}
${pagneLabel ? `Souhaite le pagne: ${pagneLabel}\n` : ''}${message ? `Message: ${message}` : ''}`;

  try {
    await sendRsvpEmail({
      subject: `Nouvelle confirmation RSVP — ${fullName}`,
      text,
      html,
    });

    res.status(200).json({ message: 'Confirmation envoyée avec succès.' });
  } catch (err) {
    console.error('Failed to send RSVP email:', err.message);
    res.status(502).json({
      message: "Impossible d'envoyer votre confirmation pour le moment. Merci de réessayer ou de nous contacter directement.",
    });
  }
});

// Fallback for unknown routes
app.use((_req, res) => {
  res.status(404).json({ message: 'Route introuvable.' });
});

app.listen(PORT, () => {
  console.log(`RSVP backend running on http://localhost:${PORT}`);
  if (!RESEND_API_KEY) {
    console.warn(
      '⚠️  RESEND_API_KEY is not set. Copy backend/.env.example to backend/.env and fill it in.'
    );
  }
});
