export type RiskLevel = 'high' | 'medium' | 'low';
export type RiskSignal = { title: string; detail: string };
export type RiskReport = {
  level: RiskLevel;
  score: number;
  headline: string;
  summary: string;
  signals: RiskSignal[];
  nextSteps: string[];
};

const rules: { pattern: RegExp; title: string; detail: string; points: number }[] = [
  { pattern: /\b(urgent|immediately|act now|final warning|within \d+ hours?)\b/i, title: 'Urgency pressure', detail: 'The message pushes you to act before you have time to verify it.', points: 22 },
  { pattern: /\b(otp|one[- ]time password|verification code|pin number|password)\b/i, title: 'Credential or code request', detail: 'Never share passwords, PINs, or one-time codes with someone who contacts you.', points: 32 },
  { pattern: /\b(bank account|account suspended|blocked account|kyc|re-?verify|update your account)\b/i, title: 'Account-threat language', detail: 'Scammers often imitate banks and services to make you panic.', points: 24 },
  { pattern: /\b(prize|winner|won|lottery|free gift|claim reward|giveaway)\b/i, title: 'Unexpected reward', detail: 'A reward you did not enter for can be bait to collect information or money.', points: 18 },
  { pattern: /\b(send money|transfer|pay now|processing fee|gift card|crypto|upi|refund fee)\b/i, title: 'Payment pressure', detail: 'Be cautious when a message requests money, a fee, or an unusual payment method.', points: 28 },
  { pattern: /https?:\/\/|www\.|\b(bit\.ly|tinyurl|t\.co|cutt\.ly)\b/i, title: 'Link to inspect', detail: 'A link is not automatically malicious, but check the exact domain independently before opening it.', points: 12 },
  { pattern: /\b(police|arrest|legal action|warrant|fine|penalty)\b/i, title: 'Threat or intimidation', detail: 'Fear-based threats are a common tactic. Contact the organisation through an official channel.', points: 20 },
  { pattern: /\b(keep this secret|do not tell|don't tell|confidential)\b/i, title: 'Secrecy request', detail: 'Pressure to keep a transaction secret is a warning sign worth checking.', points: 16 },
];

export function assessMessage(message: string): RiskReport {
  const signals = rules.filter((rule) => rule.pattern.test(message)).map(({ title, detail }) => ({ title, detail }));
  const raw = rules.filter((rule) => rule.pattern.test(message)).reduce((sum, rule) => sum + rule.points, 0);
  const score = Math.min(98, raw);
  const level: RiskLevel = score >= 45 ? 'high' : score >= 18 ? 'medium' : 'low';
  const headline = level === 'high' ? 'Pause. This has multiple warning signs.' : level === 'medium' ? 'Worth checking before you act.' : 'No obvious red flags found.';
  const summary = level === 'high'
    ? 'Several common scam tactics may be present. Do not click, pay, or share a code until you independently verify the sender.'
    : level === 'medium'
      ? 'We found a few patterns that deserve a closer look. A clean-looking message can still be fraudulent.'
      : 'This quick pattern check did not find many common warning signs. That is not proof the message is safe.';
  const nextSteps = level === 'high'
    ? ['Do not reply, click the link, or share a code.', 'Open the official app or type the organisation’s website yourself.', 'If you already paid or shared details, contact your bank or service provider immediately.']
    : ['Verify the sender using a separate, official channel.', 'Inspect the full domain before opening any link.', 'Never share passwords, PINs, or one-time codes.'];
  return { level, score, headline, summary, signals, nextSteps };
}
