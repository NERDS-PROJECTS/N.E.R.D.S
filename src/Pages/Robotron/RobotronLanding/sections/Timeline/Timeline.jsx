import React from 'react';
import Section from '../../components/Section/Section';
import './Timeline.css';

const PHASES = [
  ['DATE TBC', 'EVENT ANNOUNCEMENT', 'The dates for ROBOTRON 2026 have not yet been confirmed.'],
  ['REG. TBC', 'TEAM REGISTRATION', 'Registration dates and entry requirements are still pending.'],
  ['RULE TBC', 'COMPETITION DETAILS', 'The 2026 lineup and official rules are not yet confirmed.'],
  ['PLAN TBC', 'EVENT SCHEDULE', 'Competition timings and venue details are still pending.'],
  ['INFO TBC', 'FURTHER UPDATES', 'For ROBOTRON enquiries, contact N.E.R.D.S., NIT Silchar.'],
];

export default function Timeline() {
  return (
    <Section id="timeline" className="timeline" grid>
      <div className="container">
        <div className="timeline-head" data-reveal>
          <span className="kicker">SCHEDULE // 0x03</span>
          <h2 className="section-title">2026 <span className="hl">schedule</span> updates</h2>
        </div>

        <ol className="timeline-list">
          {PHASES.map(([year, name, desc], i) => (
            <li key={year} className="timeline-item" data-reveal>
              <span className="tl-node">
                <i />
              </span>
              <div className="tl-body">
                <span className="tl-year">{year}</span>
                <h3 className="tl-title">{name}</h3>
                <p className="tl-desc">{desc}</p>
              </div>
              <span className="tl-idx">/{String(i).padStart(2, '0')}</span>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}