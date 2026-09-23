import React from 'react';
import Section from '../../components/Section/Section';
import './About.css';

const STATS = [
  ['04', 'PAST EDITION EVENTS'],
  ['2026', 'CURRENT EDITION'],
  ['NIT', 'SILCHAR, ASSAM'],
  ['BOT', 'BUILD · TEST · COMPETE'],
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
        </div>

        <div className="about-body" data-reveal>
          <p className="about-lead">
            ROBOTRON is the robotics event by N.E.R.D.S., NIT Silchar.
            Its competitive spirit brings robot design, programming and practical
            engineering together. Explore its established events as we look ahead
            to the 2026 edition.
          </p>

          <div className="about-stats">
            {STATS.map(([n, label]) => (
              <div key={label} className="about-stat" data-reveal>
                <b>{n}</b>
                <span>{label.toUpperCase()}</span>
              </div>
            ))}
          </div>

          <figure className="about-side" aria-hidden="true">
            <i className="about-diag" />
            <figcaption>ROBOTRON — DESIGN IN MOTION</figcaption>
          </figure>
        </div>
      </div>
    </Section>
  );
}