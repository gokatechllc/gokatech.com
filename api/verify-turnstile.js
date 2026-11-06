// Serverless API function for Cloudflare Turnstile token validation
// Compatible with Vercel Serverless Functions

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  const { token, ip } = req.body || {};

  if (!token) {
    return res.status(400).json({ success: false, error: 'Missing turnstile token' });
  }

  const SECRET_KEY =
    process.env.TURNSTILE_SECRET_KEY || '0x4AAAAAAFzeyCTZjGl6FrI_YHdoE2_B5h4';

  try {
    const formData = new URLSearchParams();
    formData.append('secret', SECRET_KEY);
    formData.append('response', token);
    if (ip) {
      formData.append('remoteip', ip);
    }

    const response = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString(),
      }
    );

    const outcome = await response.json();

    if (outcome.success) {
      return res.status(200).json({
        success: true,
        message: 'Turnstile verification successful',
        hostname: outcome.hostname,
        action: outcome.action,
        cdate: outcome.challenge_ts,
      });
    } else {
      return res.status(400).json({
        success: false,
        error: 'Turnstile verification failed',
        codes: outcome['error-codes'],
      });
    }
  } catch (err) {
    console.error('Turnstile verification error:', err);
    return res.status(500).json({ success: false, error: 'Internal verification error' });
  }
}

