import { Phone, Mail, Linkedin } from 'lucide-react';
import Section from '../../components/Section/Section';
import teamData from '../../data/team.json';
import './Team.css';

export default function Team() {
  let serial = 0;

  return (
    <Section id="team" className="team" grid>
      <div className="container">
        <div className="team-head" data-reveal>
          <span className="kicker">THE CREW // 0x04</span>
          <h2 className="section-title">The <span className="hl">ROBOTRON</span> team</h2>
        </div>

        {teamData.groups.map((group) => (
          <div key={group.id} className="team-group">
            <h3 className="team-group-label" data-reveal>
              <span>{group.label}</span>
            </h3>
            <ul className="team-grid">
              {group.members.map((person) => {
                serial += 1;
                const serialId = String(serial).padStart(2, '0');

                return (
                  <li key={person.name} className="crew" data-reveal data-cursor="hover">
                    <div className="crew-photo-wrap">
                      <img
                        src={person.photo}
                        alt={person.name}
                        className="crew-photo"
                        loading="lazy"
                      />
                      <span className="crew-id">{serialId}</span>
                    </div>
                    <div className="crew-info">
                      <span className="crew-role">{group.label}</span>
                      <h4 className="crew-name">{person.name}</h4>
                      {person.phone && (
                        <span className="crew-phone">
                          <Phone size={11} />
                          {person.phone}
                        </span>
                      )}
                      {(person.email || person.linkedin) && (
                        <div className="crew-contact">
                          {person.email && (
                            <a
                              href={`mailto:${person.email}`}
                              className="crew-contact-link"
                              aria-label={`Email ${person.name}`}
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Mail size={14} />
                            </a>
                          )}
                          {person.linkedin && (
                            <a
                              href={person.linkedin}
                              target="_blank"
                              rel="noreferrer"
                              className="crew-contact-link"
                              aria-label={`${person.name} on LinkedIn`}
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Linkedin size={14} />
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
