import type { Metadata } from 'next';
import { ContactForm } from '@/components/ContactForm';
import { contact, site } from '@/data/site';

export const metadata: Metadata = {
  title: { absolute: contact.title },
  description: contact.description,
};

// Order in the markup is the phone order: intro, form, then what happens next.
// On desktop the form takes the right column beside both.
export default function Contact() {
  return (
    <section className="grid contact" aria-labelledby="c-h">
      <div className="contact__intro">
        <h1 id="c-h" className="shero__h1 display" data-split="lines" data-intro>{contact.h1}</h1>
        <p className="lead">{contact.lead}</p>
        <p className="muted">
          Prefer to talk? Call <a className="link num" href={site.phoneHref}>{site.phone}</a> ({site.hours.toLowerCase()}) or email <a className="link" href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
      </div>
      <div className="contact__form">
        <ContactForm />
      </div>
      <div className="contact__next">
        <h2 className="label muted">What happens next</h2>
        <ol className="next">
          {contact.next.map((n, i) => (
            <li key={n.title}>
              <span className="pin" aria-hidden="true">{i + 1}</span>
              <strong>{n.title}</strong>
              <p>{n.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
