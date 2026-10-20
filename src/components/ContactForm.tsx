'use client';
import { useEffect, useRef, useState } from 'react';
import { contact, site } from '@/data/site';

// Posts to NEXT_PUBLIC_FORM_ENDPOINT (Formspree or any form webhook that accepts FormData).
// Without one, the request opens as an email to the agency, so no lead is ever lost.
const ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT || '';

export function ContactForm() {
  const plan = useRef<HTMLSelectElement>(null);
  const [state, setState] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle');

  useEffect(() => {
    const p = new URLSearchParams(location.search).get('plan');
    const match = p && contact.plans.find((o) => o.toLowerCase().startsWith(p.toLowerCase()));
    if (match && plan.current) plan.current.value = match;
  }, []);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    if (!ENDPOINT) {
      const body = [...data.entries()].map(([k, v]) => `${k}: ${v}`).join('\n');
      location.href = `mailto:${site.email}?subject=${encodeURIComponent('Free ranking check')}&body=${encodeURIComponent(body)}`;
      return;
    }
    setState('sending');
    try {
      const res = await fetch(ENDPOINT, { method: 'POST', body: data, headers: { Accept: 'application/json' } });
      setState(res.ok ? 'ok' : 'error');
      if (res.ok) e.currentTarget?.reset();
    } catch {
      setState('error');
    }
  }

  return (
    <form className="form" onSubmit={submit} action={ENDPOINT || `mailto:${site.email}`} method="post" encType={ENDPOINT ? undefined : 'text/plain'}>
      <div className="form__row">
        <div className="field-g">
          <label htmlFor="f-name">Name</label>
          <input className="input" id="f-name" name="name" autoComplete="name" required />
        </div>
        <div className="field-g">
          <label htmlFor="f-business">Business name or website</label>
          <input className="input" id="f-business" name="business" autoComplete="organization" placeholder="yourbusiness.com" required />
        </div>
      </div>
      <div className="form__row">
        <div className="field-g">
          <label htmlFor="f-email">Email</label>
          <input className="input" id="f-email" name="email" type="email" autoComplete="email" required />
        </div>
        <div className="field-g">
          <label htmlFor="f-phone">Phone <span className="hint">(optional)</span></label>
          <input className="input" id="f-phone" name="phone" type="tel" autoComplete="tel" />
        </div>
      </div>
      <div className="field-g">
        <label htmlFor="f-keyword">What should people search to find you? <span className="hint">(optional)</span></label>
        <input className="input" id="f-keyword" name="keyword" placeholder="plumber Antwerp" />
      </div>
      <div className="field-g">
        <label htmlFor="f-plan">Plan you are interested in</label>
        <select className="input" id="f-plan" name="plan" ref={plan} defaultValue="Not sure yet">
          {contact.plans.map((p) => <option key={p}>{p}</option>)}
        </select>
      </div>
      <div className="field-g">
        <label htmlFor="f-msg">Anything we should know? <span className="hint">(optional)</span></label>
        <textarea className="input" id="f-msg" name="message" placeholder="Your services, the area you serve, your goals" />
      </div>
      <div className="form__actions">
        <button type="submit" className="btn" data-fill disabled={state === 'sending'}>
          <span className="btn__fill" aria-hidden="true" />
          <span className="btn__pin" aria-hidden="true"><span>3</span><span>1</span></span>
          <span className="roll"><span>Send my request</span><span aria-hidden="true">Send my request</span></span>
        </button>
        <p className="form__status" role="status" data-state={state}>
          {state === 'sending' && 'Sending…'}
          {state === 'ok' && 'Thanks. Your request is in, and we will get back to you soon.'}
          {state === 'error' && <>Something went wrong. Please call <a className="link" href={site.phoneHref}>{site.phone}</a> instead.</>}
        </p>
      </div>
    </form>
  );
}
