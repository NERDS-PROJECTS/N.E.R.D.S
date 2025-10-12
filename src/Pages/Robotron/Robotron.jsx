import Hyperspeed, { hyperspeedPresets } from './Hyperspeed';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import './Robotron.css';
import StarsCanvas from '../../assets/canvas/Stars';

const Robotron = () => {
    const navigate = useNavigate();
    const [isMuted, setIsMuted] = useState(false);
    const audioRef = useRef(null);

    // Play audio when component mounts
    useEffect(() => {
        const audio = audioRef.current;
        if (audio) {
            audio.volume = 0.3; // Set volume to 30%
            audio.play().catch(error => {
                console.log('Audio autoplay prevented:', error);
            });
        }

        // Cleanup: pause audio when component unmounts
        return () => {
            if (audio) {
                audio.pause();
            }
        };
    }, []);

    // Handle mute/unmute
    const toggleMute = () => {
        if (audioRef.current) {
            audioRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

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
            {/* Background Music */}
            <audio ref={audioRef} loop>
                <source src="/src/assets/TRON Mode.mp3" type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>

            {/* Mute/Unmute Button */}
            <button
                onClick={toggleMute}
                className="audio-control-button"
                aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
                {isMuted ? (
                    // Muted Icon (Speaker with X)
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                        <line x1="23" y1="9" x2="17" y2="15"></line>
                        <line x1="17" y1="9" x2="23" y2="15"></line>
                    </svg>
                ) : (
                    // Unmuted Icon (Speaker with Sound Waves)
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                        <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                    </svg>
                )}
            </button>

            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
                <StarsCanvas />
            </div>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}>
                <Hyperspeed
                    effectOptions={hyperspeedPresets.one}
                />
            </div>
            
            <div className="robotron-overlay mt-[-4rem]">
                <h1 className="robotron-title font-tron">ROBOTRON</h1>
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