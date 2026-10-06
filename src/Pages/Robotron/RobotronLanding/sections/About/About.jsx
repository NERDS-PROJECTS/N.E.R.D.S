import React from 'react';
import Section from '../../components/Section/Section';
import './About.css';

const STATS = [
  ['04', 'PAST EDITIONS'],
  ['2026', 'CURRENT EDITION'],
  ['NIT', 'SILCHAR, ASSAM'],
  ['BOT', 'BUILD · TEST · COMPETE'],
];

/* Drop the real files in /public as these exact names and both panels
   below pick them up automatically — no code change needed. */
const ORGS = [
  {
    id: 'tecnoesis',
    tag: 'THE UMBRELLA FEST',
    name: 'Tecnoesis',
    logo: '/tecnoesis-logo.png',
    desc: "NIT Silchar's annual techno-management festival — the umbrella event ROBOTRON runs under, bringing thousands of participants from across the country onto one campus for a week of competitions, workshops and builds.",
  },
  {
    id: 'robotron',
    tag: 'THE ROBOTICS EVENT',
    name: 'Robotron',
    logo: '/nerds-logo.png',
    desc: "Robotron is N.E.R.D.S.'s flagship robotics event within Tecnoesis — where robot design, embedded programming and hands-on engineering meet in direct competition across Robowar, Robosoccer, Robosumo and Robodrift.",
  },
];

export default function About() {
  return (
    <Section id="about" className="about" grid>
      <div className="container about-inner">
        <div className="about-head" data-reveal>
          <span className="kicker">ABOUT // 0x01</span>
          <h2 className="section-title">
            The <span className="hl">competitive</span> side of robotics
          </h2>
          <p className="about-lead">
            ROBOTRON is the robotics event by N.E.R.D.S., NIT Silchar, run under Tecnoesis —
            the institute's annual techno-management festival. Its competitive spirit brings
            robot design, programming and practical engineering together, as we look ahead to
            the 2026 edition.
          </p>
        </div>

        <div className="about-orgs">
          {ORGS.map((org) => (
            <div key={org.id} className="org-card" data-reveal>
              <div className="org-logo-plate" aria-hidden="true">
                <span className="org-logo-glow" />
                <img src={org.logo} alt={`${org.name} logo`} className="org-logo" loading="lazy" />
              </div>
              <span className="org-tag">{org.tag}</span>
              <h3 className="org-name">{org.name}</h3>
              <p className="org-desc">{org.desc}</p>
            </div>
          ))}
        </div>

        <div className="about-stats" data-reveal>
          {STATS.map(([n, label]) => (
            <div key={label} className="about-stat">
              <b>{n}</b>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
