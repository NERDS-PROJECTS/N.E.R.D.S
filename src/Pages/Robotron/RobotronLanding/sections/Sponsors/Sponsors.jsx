import React from 'react';
import Section from '../../components/Section/Section';
import './Sponsors.css';

const SPONSORS = ['TBC // 01', 'TBC // 02', 'TBC // 03', 'TBC // 04', 'TBC // 05', 'TBC // 06' ];

export default function Sponsors() {
  return (
    <Section id="sponsors" className="sponsors" grid={false}>
      <div className="container">
        <div className="sponsors-head" data-reveal>
          <span className="kicker">SPONSORS PENDING // 0x04</span>
          <h2 className="section-title">2026 <span className="hl">partners</span></h2>
        </div>

        <ul className="sponsors-row">
          {SPONSORS.map((s, i) => (
            <li key={s} className="sponsor" data-reveal data-cursor="hover">
              <a href="#sponsors" onClick={(e) => e.preventDefault()} className="sponsor-link">
                <span className="sponsor-n">/0{i + 1}</span>
                <span className="sponsor-name">{s}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}