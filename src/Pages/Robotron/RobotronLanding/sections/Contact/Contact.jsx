import React, { useState } from 'react';
import Section from '../../components/Section/Section';
import './Contact.css';

export default function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <Section id="contact" className="contact" grid>
      <div className="container">
        <div className="contact-inner">
          <div className="contact-head" data-reveal>
            <span className="kicker">CONTACT // 0x06</span>
            <h2 className="section-title">Contact <span className="hl">N.E.R.D.S.</span></h2>
            <p className="contact-lede">
              Questions about ROBOTRON? Email nerds@nits.ac.in.
              This form is a preview only and does not send messages.
            </p>
          </div>

          <form
            className="contact-form"
            data-reveal
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
          >
            <label className="c-field">
              <span>YOUR NAME</span>
              <input type="text" name="name" placeholder="FULL NAME" required />
            </label>

            <label className="c-field">
              <span>EMAIL ADDRESS</span>
              <input type="email" name="email" placeholder="you@example.com" required />
            </label>

            <label className="c-field c-field--full">
              <span>YOUR MESSAGE</span>
              <textarea name="message" rows={4} placeholder="Your ROBOTRON enquiry…" required />
            </label>

            <button type="submit" className="c-submit" data-cursor="hover">
              <span>CHECK FORM</span>
              <i aria-hidden="true">↗</i>
            </button>

            {sent && <p className="c-ack" role="status">▸ Not sent. Please email nerds@nits.ac.in.</p>}
          </form>
        </div>
      </div>
    </Section>
  );
}