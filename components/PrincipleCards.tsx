'use client';

import {
ArrowUpRight,
Fingerprint,
ScanLine,
ShieldCheck,
} from 'lucide-react';

const principles = [
{
number: '01',
icon: ScanLine,
title: 'Read the signals',
text: 'Spot urgency, impersonation language, suspicious links, and requests for money or codes.',
},
{
number: '02',
icon: Fingerprint,
title: 'Verify independently',
text: 'Use a trusted app, saved contact, or official website — never the link in the message.',
},
{
number: '03',
icon: ShieldCheck,
title: 'Choose your next move',
text: 'Get calm, practical steps that put distance between you and a pressured decision.',
},
];

export default function PrincipleCards() {
function scrollToChecker() {
document.getElementById('checker')?.scrollIntoView({
behavior: 'smooth',
block: 'start',
});
}

return (
<div className="principles-grid" id="principles">
{principles.map(({ number, icon: PrincipleIcon, title, text }) => (
<button
className="principle-card"
key={number}
type="button"
onClick={scrollToChecker}
aria-label={"${title}: go to message checker"}
>
<div className="principle-top">
<span>{number}</span>
<PrincipleIcon size={20} strokeWidth={1.5} />
</div>

      <div className="principle-icon">
        <PrincipleIcon size={25} strokeWidth={1.3} />
      </div>

      <h3>{title}</h3>
      <p>{text}</p>

      <div className="principle-bottom">
        <span>TRACE METHOD</span>
        <ArrowUpRight size={15} />
      </div>
    </button>
  ))}
</div>

);
}