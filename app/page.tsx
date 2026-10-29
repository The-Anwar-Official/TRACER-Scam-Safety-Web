import PrincipleCards from '@/components/PrincipleCards';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import {
ArrowDownRight,
ArrowRight,
ArrowUpRight,
CheckCircle2,
Fingerprint,
ScanLine,
ShieldCheck,
Sparkles,
Waves,
} from 'lucide-react';

import ScrollEffects from '@/components/ScrollEffects';
import MessageChecker from '@/components/MessageChecker';

const SignalScene = dynamic(
() => import('@/components/scene/SignalScene'),
{
ssr: false,
loading: () => ( <div className="scene-loading"> <span className="loading-orbit" /> </div>
),
}
);

export default function Home() {
const scrollToChecker = () => {
document.getElementById('checker')?.scrollIntoView({
behavior: 'smooth',
block: 'start',
});
};

return ( <main> <ScrollEffects />

```
  {/* HEADER */}
  <header className="site-header">
    <Link href="#top" className="brand" aria-label="TRACE home">
      <span className="brand-mark">
        <span />
      </span>
      <span>
        TRACE<span className="brand-period">.</span>
      </span>
    </Link>

    <nav className="desktop-nav" aria-label="Main navigation">
      <Link href="#how-it-works">How it works</Link>
      <Link href="#principles">The method</Link>
      <Link href="#limits">Our promise</Link>
    </nav>

    <Link className="header-cta" href="#checker">
      Check a message <ArrowUpRight size={15} />
    </Link>
  </header>

  {/* HERO */}
  <section className="hero" id="top">
    <div className="hero-grid-glow" />

    <div className="hero-copy">
      <div className="status-pill">
        <span className="live-dot" />
        A CLEARER SIGNAL IN A NOISY WORLD
      </div>

      <h1>
        Pause the panic.
        <br />
        <span>Trace the truth.</span>
      </h1>

      <p className="hero-description">
        Scams are designed to make you react before you think. TRACE helps
        you slow the moment down, spot warning signs, and choose a safer
        next step.
      </p>

      <div className="hero-actions">
        <Link className="primary-button" href="#checker">
          Check a message <ArrowUpRight size={17} />
        </Link>

        <Link className="secondary-button" href="#how-it-works">
          See how it works <ArrowDownRight size={16} />
        </Link>
      </div>

      <div className="hero-footnote">
        <span className="footnote-icon">
          <ShieldCheck size={16} />
        </span>
        <span>
          <strong>Private by design.</strong> Your pasted message is
          analysed in memory and not saved.
        </span>
      </div>
    </div>

    <div className="hero-art">
      <div className="art-ring ring-one" />
      <div className="art-ring ring-two" />

      <div className="art-label art-label-top">
        <span className="tiny-square" /> SIGNAL / 001
      </div>

      <SignalScene />

      <div className="art-label art-label-bottom">
        <span className="pulse-line" /> SCANNING FOR CONTEXT
        <span className="art-label-muted">LIVE VISUAL</span>
      </div>

      <div className="orbit-caption">
        LESS REACTION.
        <br />
        <span>MORE CLARITY.</span>
      </div>
    </div>

    <div className="hero-index">
      <span>01 / 04</span>
      <span className="index-line" />
      <span>THE FIRST CHECK</span>
    </div>
  </section>

  {/* TICKER */}
  <section className="ticker" aria-label="TRACE principles">
    <div className="ticker-track">
      {Array.from({ length: 4 }, (_, index) => (
        <span key={index}>
          THINK BEFORE YOU CLICK <i>✳</i> VERIFY BEFORE YOU TRUST <i>✳</i>{' '}
          PAUSE BEFORE YOU PAY <i>✳</i>
        </span>
      ))}
    </div>
  </section>

  {/* TRACE METHOD — THREE CLICKABLE CARDS */}
  <section className="method-section section-pad" id="how-it-works">
  <div className="method-heading" data-reveal>
    <span className="eyebrow">02 — A BETTER WAY TO RESPOND</span>

    <h2>
      Make room for
      <br />
      <span>a second thought.</span>
    </h2>

    <p>
      Scammers manufacture urgency. Our flow is designed to give you back
      a little time and perspective.
    </p>
  </div>

  <PrincipleCards />
</section>

  {/* MESSAGE CHECKER */}
  <section className="checker-section section-pad" id="checker">
    <div className="section-intro" data-reveal>
      <span className="eyebrow">01 — PUT IT TO THE TEST</span>

      <h2>
        That message feels off.
        <br />
        <span>Let’s look closer.</span>
      </h2>

      <p>
        Paste a suspicious text, email, or DM. TRACE checks for common
        pressure tactics and gives you a practical next step.
      </p>

      <div className="mini-note">
        <span className="mini-note-dot" />
        No login. No judgement. Just a first check.
      </div>
    </div>

    <MessageChecker />
  </section>

  {/* QUOTE */}
  <section className="quote-section section-pad">
    <div data-reveal>
      <div className="quote-mark">“</div>

      <p>
        The safest click is sometimes
        <br />
        the one <span>you don’t make yet.</span>
      </p>

      <div className="quote-caption">
        <Waves size={15} /> TAKE A BEAT. CHECK THE SIGNAL.
      </div>
    </div>
  </section>

  {/* OUR PROMISE */}
  <section className="promise-section section-pad" id="limits">
    <div className="promise-visual" data-reveal>
      <div className="promise-circle">
        <div className="promise-circle-inner">
          <Sparkles size={24} />
          <span>
            CLARITY
            <br />
            OVER FEAR
          </span>
        </div>
      </div>

      <div className="promise-orbit promise-orbit-a" />
      <div className="promise-orbit promise-orbit-b" />

      <span className="promise-coordinate">TRC / 26.001</span>
    </div>

    <div className="promise-copy" data-reveal>
      <span className="eyebrow">03 — OUR PROMISE</span>

      <h2>
        Useful by design.
        <br />
        <span>Honest by default.</span>
      </h2>

      <p>
        TRACE is a first-pass educational tool, not a magic shield. It
        checks text for common patterns; it cannot confirm who sent a
        message or guarantee that something is safe.
      </p>

      <ul>
        <li>
          <CheckCircle2 size={17} /> No account required
        </li>
        <li>
          <CheckCircle2 size={17} /> Message is not stored by this demo
        </li>
        <li>
          <CheckCircle2 size={17} /> Clear limits, practical next steps
        </li>
      </ul>

      <Link className="text-link" href="#checker">
        Run a check <ArrowRight size={16} />
      </Link>
    </div>
  </section>

  {/* FOOTER */}
  <footer className="site-footer">
    <Link href="#top" className="brand">
      <span className="brand-mark">
        <span />
      </span>
      <span>
        TRACE<span className="brand-period">.</span>
      </span>
    </Link>

    <p>Make the moment yours again.</p>

    <div className="footer-right">
      <span>BUILT FOR A MORE THOUGHTFUL INTERNET</span>
      <span>© 2026 TRACE · EDUCATIONAL DEMO</span>
    </div>
  </footer>
</main>
);
}
