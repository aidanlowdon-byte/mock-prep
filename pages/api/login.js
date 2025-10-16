export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const { passcode } = req.body || {};
  const expected = (process.env.PASSCODE || '').trim();
  if (!expected) return res.status(500).json({ error: 'PASSCODE not set on server' });
  if (passcode && passcode === expected) {
    res.setHeader('Set-Cookie', `passcode=ok; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${7*24*60*60}`);
    return res.status(200).json({ ok: true });
  }
  return res.status(401).json({ error: 'Invalid passcode' });
}