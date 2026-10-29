'use client';

import { useState } from 'react';
import { AlertTriangle, ArrowUpRight, Check, Clipboard, LoaderCircle, ShieldAlert, ShieldCheck } from 'lucide-react';
import type { RiskReport } from '@/lib/risk';

const example = 'URGENT: Your bank account will be suspended today. Verify your KYC immediately at http://secure-bank-check.example and share the OTP to avoid blocking.';

export default function MessageChecker() {
  const [message, setMessage] = useState('');
  const [report, setReport] = useState<RiskReport | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function checkMessage() {
    setError(''); setReport(null);
    if (!message.trim()) { setError('Paste a message first so TRACE can check its wording.'); return; }
    setLoading(true);
    try {
      const response = await fetch('/api/analyze', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Unable to analyse this message.');
      setReport(data as RiskReport);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally { setLoading(false); }
  }

  return <div className="checker-card" id="checker">
    <div className="checker-topline"><span className="live-dot" /> LOCAL PATTERN CHECK <span className="checker-topline-right">NO ACCOUNT NEEDED</span></div>
    <label className="input-label" htmlFor="message-input">Paste the suspicious message</label>
    <textarea id="message-input" value={message} onChange={(event) => setMessage(event.target.value)} maxLength={5000} placeholder="Paste an SMS, email, DM or message here…" />
    <div className="input-footer"><span>{message.length.toLocaleString()} / 5,000 characters</span><button className="text-button" onClick={() => { setMessage(example); setReport(null); setError(''); }}><Clipboard size={14} /> Try a sample</button></div>
    {error && <p className="form-error" role="alert">{error}</p>}
    <button className="analyze-button" onClick={checkMessage} disabled={loading}>
      {loading ? <><LoaderCircle className="spin" size={17} /> Checking patterns…</> : <>Check this message <ArrowUpRight size={17} /></>}
    </button>
    <p className="privacy-note"><ShieldCheck size={14} /> Demo checks the wording only. The text is not saved.</p>
    {report && <div className={`report report-${report.level}`} aria-live="polite">
      <div className="report-heading">
        <div className="report-icon">{report.level === 'low' ? <ShieldCheck size={21} /> : <ShieldAlert size={21} />}</div>
        <div><span className="eyebrow">PRELIMINARY RESULT · {report.score}% SIGNAL SCORE</span><h3>{report.headline}</h3></div>
      </div>
      <div className="score-track"><span style={{ width: `${report.score}%` }} /></div>
      <p className="report-summary">{report.summary}</p>
      {report.signals.length > 0 ? <div className="signals-list"><h4>Signals we noticed</h4>{report.signals.map((signal) => <div className="signal-row" key={signal.title}><AlertTriangle size={16} /><div><strong>{signal.title}</strong><p>{signal.detail}</p></div></div>)}</div> : <div className="signal-row"><Check size={16} /><div><strong>No common pattern matched</strong><p>Scams can be subtle. Verify the sender even when no signals appear.</p></div></div>}
      <div className="next-steps"><h4>What to do next</h4>{report.nextSteps.map((step, index) => <p key={step}><span>{String(index + 1).padStart(2, '0')}</span>{step}</p>)}</div>
      <p className="disclaimer">This is an educational pattern checker, not a definitive fraud detector. It does not verify sender identity, domains, or live threat intelligence.</p>
    </div>}
  </div>;
}
