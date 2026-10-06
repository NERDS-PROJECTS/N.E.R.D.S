import { useNavigate } from 'react-router-dom';
import { Swords, Goal, Disc, Gauge, ChevronRight, Trophy, MapPin } from 'lucide-react';
import Section from '../../components/Section/Section';
import './Events.css';

const EVENTS = [
  {
    code: '01',
    tone: 'war',
    title: 'ROBOWAR',
    Icon: Swords,
    image: '/robotron/war_.png',
    desc: 'Combat bots enter the arena — last machine standing wins.',
    prize: '₹ 30,000',
    venue: 'Football Ground',
    path: '/robowar',
  },
  {
    code: '02',
    tone: 'soccer',
    title: 'ROBOSOCCER',
    Icon: Goal,
    image: '/robotron/soccer.png',
    desc: 'Build and pilot a bot team that can out-play the opposition.',
    prize: '₹ 30,000',
    venue: 'Football Ground',
    path: '/robosoccer',
  },
  {
    code: '03',
    tone: 'sumo',
    title: 'ROBOSUMO',
    Icon: Disc,
    image: '/robotron/mouse.png',
    desc: 'Push, block, survive — shove the rival bot out of the ring.',
    prize: '₹ 25,000',
    venue: 'Football Ground',
    path: '/robosumo',
  },
  {
    code: '04',
    tone: 'drift',
    title: 'ROBODRIFT',
    Icon: Gauge,
    image: '/robotron/car.png',
    desc: 'Precision RC drift racing against the clock and the track.',
    prize: '₹ 25,000',
    venue: 'Football Ground',
    path: '/robodrift',
  },
];

export default function Events() {
  const navigate = useNavigate();

  return (
    <Section id="events" className="events" grid>
      <div className="container">
        <div className="events-head" data-reveal>
          <span className="kicker">MODULES // 0x02</span>
          <h2 className="section-title">ROBOTRON <span className="hl">2026</span> lineup</h2>
        </div>

        <div className="events-grid">
          {EVENTS.map(({ code, tone, title, Icon, image, desc, prize, venue, path }) => (
            <article
              key={code}
              className={`event-card tone-${tone}`}
              data-reveal
              data-cursor={path ? 'view' : undefined}
              onClick={path ? () => navigate(path) : undefined}
              role={path ? 'button' : undefined}
              tabIndex={path ? 0 : undefined}
              onKeyDown={path ? (e) => { if (e.key === 'Enter') navigate(path); } : undefined}
            >
              <div className="event-card-frame">
                <span className="event-card-bracket tl" aria-hidden="true" />
                <span className="event-card-bracket br" aria-hidden="true" />
                <div className="event-card-inner">
                  <div className="event-card-top">
                    <span className="event-num">{code}</span>
                    <span className="event-chevron"><ChevronRight size={16} /></span>
                  </div>

                  <div className="event-visual" aria-hidden="true">
                    <span className="event-visual-glow" />
                    <span className="event-visual-rings" />
                    <img className="event-visual-img" src={image} alt="" />
                  </div>

                  <div className="event-icon-badge" aria-hidden="true">
                    <Icon size={18} strokeWidth={1.75} />
                  </div>
                  <h3 className="event-title">{title}</h3>
                  <p className="event-desc">{desc}</p>

                  <div className="event-meta-row">
                    <div className="event-meta-item">
                      <Trophy size={13} />
                      <span>Prize Pool</span>
                      <b>{prize}</b>
                    </div>
                    <div className="event-meta-item">
                      <MapPin size={13} />
                      <span>Venue</span>
                      <b>{venue}</b>
                    </div>
                  </div>

                  <div className="event-dots" aria-hidden="true">
                    {Array.from({ length: 8 }).map((_, i) => <i key={i} />)}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </Section>
  );
}
