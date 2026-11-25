'use client';

import { useRef, useState, type FormEvent } from 'react';
import { Icon } from '@/components/Icon';
import { guestSizes, quoteEventTypes, site } from '@/lib/data';

type Status = { kind: 'idle' | 'sending' | 'ok' | 'err'; message?: string };
type Errors = Partial<Record<'mobile' | 'email' | 'guests', string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const digits = (s: string) => s.replace(/\D/g, '');

/* Quote request form. Posts JSON to /api/contact. On error the inputs keep
   what the visitor typed (the form is never reset unless it was sent). */
export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>({ kind: 'idle' });
  const [errors, setErrors] = useState<Errors>({});

  const validate = (data: Record<string, string>): Errors => {
    const e: Errors = {};
    const d = digits(data.mobile || '');
    if (d.length < 10 || d.length > 11) e.mobile = 'Enter a mobile number with area code, like 317 555 0123.';
    if (!EMAIL.test(data.email || '')) e.email = 'Enter an email address, like name@example.com.';
    if (!data.guests) e.guests = 'Choose roughly how many guests you expect.';
    return e;
  };

  const onSubmit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const form = ev.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    const e = validate(data);
    setErrors(e);
    if (Object.keys(e).length) {
      setStatus({ kind: 'err', message: 'Check the highlighted fields and send again.' });
      const first = Object.keys(e)[0];
      form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setStatus({ kind: 'sending' });
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string; errors?: Errors };
      if (res.ok && json.ok) {
        form.reset();
        setErrors({});
        setStatus({ kind: 'ok', message: 'Your quote request is in. We will get back to you with a plan for the night.' });
        return;
      }
      if (json.errors) setErrors(json.errors);
      setStatus({ kind: 'err', message: json.error || 'Your request could not be sent. Try again in a minute.' });
    } catch {
      setStatus({ kind: 'err', message: 'Your request could not be sent. Check your connection and try again.' });
    }
  };

  const err = (k: keyof Errors) =>
    errors[k] ? (
      <p className="field__error" id={`${k}-error`}>
        {errors[k]}
      </p>
    ) : null;
  const aria = (k: keyof Errors) => ({ 'aria-invalid': errors[k] ? true : undefined, 'aria-describedby': errors[k] ? `${k}-error` : undefined });

  return (
    <form ref={formRef} className="form" onSubmit={onSubmit} noValidate>
      <div className="form__row">
        <div className="field">
          <label htmlFor="firstName">First name</label>
          <input id="firstName" name="firstName" autoComplete="given-name" maxLength={80} />
        </div>
        <div className="field">
          <label htmlFor="lastName">Last name</label>
          <input id="lastName" name="lastName" autoComplete="family-name" maxLength={80} />
        </div>
      </div>
      <div className="form__row">
        <div className="field">
          <label htmlFor="mobile">
            Mobile number <span className="req">*</span>
          </label>
          <input id="mobile" name="mobile" type="tel" inputMode="tel" autoComplete="tel" required maxLength={20} {...aria('mobile')} />
          {err('mobile')}
        </div>
        <div className="field">
          <label htmlFor="email">
            Email <span className="req">*</span>
          </label>
          <input id="email" name="email" type="email" autoComplete="email" required maxLength={200} {...aria('email')} />
          {err('email')}
        </div>
      </div>
      <div className="form__row">
        <div className="field">
          <label htmlFor="eventType">Type of event</label>
          <select id="eventType" name="eventType" defaultValue="">
            <option value="">Choose one</option>
            {quoteEventTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="guests">
            Expected guests <span className="req">*</span>
          </label>
          <select id="guests" name="guests" defaultValue="" required {...aria('guests')}>
            <option value="">Choose a range</option>
            {guestSizes.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
          {err('guests')}
        </div>
      </div>
      <div className="form__row">
        <div className="field">
          <label htmlFor="date">Event date</label>
          <input id="date" name="date" type="date" />
        </div>
        <div className="field">
          <label htmlFor="venue">Venue or town</label>
          <input id="venue" name="venue" autoComplete="off" maxLength={160} />
        </div>
      </div>
      <div className="field">
        <label htmlFor="message">About the night</label>
        <textarea id="message" name="message" maxLength={4000} aria-describedby="message-hint" />
        <p className="field__hint" id="message-hint">
          How long it runs, the music you want, and whether the venue has its own sound system.
        </p>
      </div>
      <div className="hp" aria-hidden="true">
        <label htmlFor="website">Leave this empty</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      {status.message ? (
        <div className={`form__status ${status.kind === 'ok' ? 'form__status--ok' : 'form__status--err'}`} role={status.kind === 'ok' ? 'status' : 'alert'}>
          {status.message}
          {status.kind === 'err' ? (
            <>
              {' '}
              You can also message us on{' '}
              <a href={site.socials[0].href} target="_blank" rel="noopener noreferrer">
                Instagram
              </a>
              .
            </>
          ) : null}
        </div>
      ) : null}
      <div className="form__foot">
        <button className="btn btn--primary magnetic" type="submit" disabled={status.kind === 'sending'}>
          {status.kind === 'sending' ? 'Sending…' : 'Send quote request'} <Icon name="arrow" />
        </button>
        <p>
          <span className="req accent">*</span> Required
        </p>
      </div>
    </form>
  );
}
