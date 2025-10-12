import Hyperspeed, { hyperspeedPresets } from './Hyperspeed';
import { useNavigate } from 'react-router-dom';
import './Robotron.css';

const Robotron = () => {
    const navigate = useNavigate();

    const events = [
        {
            name: 'ROBOWAR',
            path: '/robowar',
            gradient: 'linear-gradient(135deg, #D856BF, #6750A2)',
            glowColor: '#e80101',
            svgBg: '/robotron/button.svg'
        },
        {
            name: 'ROBOSOCCER',
            path: '/robosoccer',
            gradient: 'linear-gradient(135deg, #03B3C3, #0E5EA5)',
            glowColor: '#03B3C3',
            svgBg: '/robotron/button_blue.svg'
        },
        {
            name: 'ALGOMAZE',
            path: '/algomaze',
            gradient: 'linear-gradient(135deg, #FFFF00, #FFA500)',
            glowColor: '#FFFF00',
            svgBg: '/robotron/button_yellow.svg'
        },
        {
            name: 'ROBODRIFT',
            path: '/robodrift',
            gradient: 'linear-gradient(135deg, #00FF00, #00AA00)',
            glowColor: '#00FF00',
            svgBg: '/robotron/button_green.svg'
        }
    ];

    return (
        <div style={{ width: '100%', height: '100vh', position: 'relative', overflow: 'hidden' }}>
            <Hyperspeed
                effectOptions={hyperspeedPresets.one}
            />
            
            <div className="robotron-overlay mt-[-4rem]">
                <h1 className="robotron-title">ROBOTRON</h1>
                <p className="robotron-subtitle">Choose Your Battle</p>
                
                <div className="robotron-buttons-grid">
                    {events.map((event, index) => (
                        <button
                            key={index}
                            className="robotron-button"
                            style={{
                                backgroundImage: `url(${event.svgBg})`,
                                backgroundSize: 'contain',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                                '--glow-color': event.glowColor
                            }}
                            onClick={() => navigate(event.path)}
                        >
                            <span className="robotron-button-text">{event.name}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Robotron;