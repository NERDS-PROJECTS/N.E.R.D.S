import React from 'react';
import Section from '../../components/Section/Section';
import './Team.css';

const CREW = [
  ['TEAM TBC', 'DETAILS PENDING', '/01'],
  ['TEAM TBC', 'DETAILS PENDING', '/02'],
  ['TEAM TBC', 'DETAILS PENDING', '/03'],
  ['TEAM TBC', 'DETAILS PENDING', '/04'],
  ['TEAM TBC', 'DETAILS PENDING', '/05'],
  ['TEAM TBC', 'DETAILS PENDING', '/06'],
  ['TEAM TBC', 'DETAILS PENDING', '/07'],
  ['TEAM TBC', 'DETAILS PENDING', '/08'],
];

export default function Team() {
  return (
    <Section id="team" className="team" grid>
      <div className="container">
        <div className="team-head" data-reveal>
          <span className="kicker">TEAM DETAILS PENDING // 0x05</span>
          <h2 className="section-title">The <span className="hl">ROBOTRON</span> team</h2>
        </div>

        <ul className="team-grid">
          {CREW.map(([name, role, id]) => (
            <li key={id} className="crew" data-reveal data-cursor="hover">
              <div className="crew-glyph" aria-hidden="true">
                <i>{name[0]}</i>
              </div>
              <div className="crew-info">
                <span className="crew-id">{id}</span>
                <h3 className="crew-name">{name}</h3>
                <span className="crew-role">{role.toUpperCase()}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}