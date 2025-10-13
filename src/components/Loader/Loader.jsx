const LoadingAnimation = () => {
  return (
    <div className="loader-container">
      <style>
        {`
          .loader-container {
            width: 100vw;
            height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            background: #000000;
            position: relative;
            overflow: hidden;
          }

          /* Animated circuit grid background */
          .loader-container::before {
            content: '';
            position: absolute;
            width: 100%;
            height: 100%;
            background: 
              linear-gradient(90deg, rgba(0, 255, 255, 0.03) 1px, transparent 1px),
              linear-gradient(rgba(0, 255, 255, 0.03) 1px, transparent 1px);
            background-size: 50px 50px;
            animation: gridScroll 20s linear infinite;
            opacity: 0.5;
          }

          @keyframes gridScroll {
            0% { transform: translate(0, 0); }
            100% { transform: translate(50px, 50px); }
          }

          /* Main loader wrapper */
          .loader-wrapper {
            position: relative;
            z-index: 10;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 2.5rem;
          }

          /* Hexagonal frame container */
          .hex-frame {
            position: relative;
            width: 180px;
            height: 180px;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          /* Rotating hexagon borders */
          .hex-border {
            position: absolute;
            width: 150px;
            height: 150px;
            clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
            border: 2px solid #00ffff;
            animation: hexRotate 4s linear infinite;
            filter: drop-shadow(0 0 10px rgba(0, 255, 255, 0.5));
          }

          .hex-border-inner {
            position: absolute;
            width: 120px;
            height: 120px;
            clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
            border: 2px solid #ff00ff;
            animation: hexRotate 3s linear infinite reverse;
            filter: drop-shadow(0 0 10px rgba(255, 0, 255, 0.5));
          }

          @keyframes hexRotate {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }

          /* Core orb */
          .core-orb {
            position: absolute;
            width: 80px;
            height: 80px;
            border-radius: 50%;
            background: radial-gradient(circle at 30% 30%, #00ffff, #0088ff, #000033);
            box-shadow: 
              0 0 20px rgba(0, 255, 255, 0.6),
              inset 0 0 20px rgba(0, 255, 255, 0.3);
            animation: orbPulse 2s ease-in-out infinite;
          }

          @keyframes orbPulse {
            0%, 100% { 
              transform: scale(1);
              box-shadow: 
                0 0 20px rgba(0, 255, 255, 0.6),
                inset 0 0 20px rgba(0, 255, 255, 0.3);
            }
            50% { 
              transform: scale(1.1);
              box-shadow: 
                0 0 40px rgba(0, 255, 255, 0.8),
                inset 0 0 30px rgba(0, 255, 255, 0.5);
            }
          }

          /* Corner brackets */
          .corner-bracket {
            position: absolute;
            width: 30px;
            height: 30px;
            border: 2px solid #00ffff;
            animation: bracketPulse 2s ease-in-out infinite;
          }

          .bracket-tl {
            top: 0;
            left: 0;
            border-right: none;
            border-bottom: none;
          }

          .bracket-tr {
            top: 0;
            right: 0;
            border-left: none;
            border-bottom: none;
          }

          .bracket-bl {
            bottom: 0;
            left: 0;
            border-right: none;
            border-top: none;
          }

          .bracket-br {
            bottom: 0;
            right: 0;
            border-left: none;
            border-top: none;
          }

          @keyframes bracketPulse {
            0%, 100% { opacity: 0.5; }
            50% { opacity: 1; }
          }

          /* Robotic text */
          .loading-text {
            font-family: 'Courier New', monospace;
            font-size: 2rem;
            font-weight: 700;
            letter-spacing: 0.5rem;
            color: #00ffff;
            text-transform: uppercase;
            position: relative;
            text-shadow: 
              0 0 10px rgba(0, 255, 255, 0.8),
              0 0 20px rgba(0, 255, 255, 0.5),
              0 0 30px rgba(0, 255, 255, 0.3);
            animation: textGlitch 3s ease-in-out infinite;
          }

          @keyframes textGlitch {
            0%, 90%, 100% {
              transform: translate(0);
            }
            92% {
              transform: translate(-2px, 1px);
            }
            94% {
              transform: translate(2px, -1px);
            }
            96% {
              transform: translate(-1px, 2px);
            }
          }

          /* Binary code rain effect */
          .binary-dots {
            display: inline-flex;
            gap: 0.4rem;
            margin-left: 0.5rem;
          }

          .binary-dot {
            width: 6px;
            height: 6px;
            background: #00ffff;
            box-shadow: 0 0 5px rgba(0, 255, 255, 0.8);
            animation: binaryBlink 1.2s ease-in-out infinite;
          }

          .binary-dot:nth-child(1) { animation-delay: 0s; }
          .binary-dot:nth-child(2) { animation-delay: 0.2s; }
          .binary-dot:nth-child(3) { animation-delay: 0.4s; }
          .binary-dot:nth-child(4) { animation-delay: 0.6s; }

          @keyframes binaryBlink {
            0%, 100% { 
              opacity: 0.3;
              transform: scaleY(1);
            }
            50% { 
              opacity: 1;
              transform: scaleY(1.5);
            }
          }

          /* System status */
          .status-bar {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.75rem;
            margin-top: 1rem;
          }

          .status-text {
            font-family: 'Courier New', monospace;
            font-size: 0.875rem;
            color: #00ffff;
            letter-spacing: 0.2rem;
            opacity: 0.7;
            text-shadow: 0 0 5px rgba(0, 255, 255, 0.5);
          }

          /* Progress bar */
          .progress-container {
            width: 250px;
            height: 4px;
            background: rgba(0, 255, 255, 0.1);
            border: 1px solid rgba(0, 255, 255, 0.3);
            position: relative;
            overflow: hidden;
          }

          .progress-bar {
            height: 100%;
            background: linear-gradient(90deg, #00ffff, #ff00ff, #00ffff);
            background-size: 200% 100%;
            animation: progressFlow 2s linear infinite;
            box-shadow: 0 0 10px rgba(0, 255, 255, 0.8);
          }

          @keyframes progressFlow {
            0% { 
              width: 0%;
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
            100% { 
              width: 100%;
              background-position: 0% 50%;
            }
          }

          /* System info lines */
          .system-info {
            font-family: 'Courier New', monospace;
            font-size: 0.75rem;
            color: rgba(0, 255, 255, 0.5);
            letter-spacing: 0.1rem;
            animation: infoFade 2s ease-in-out infinite;
          }

          @keyframes infoFade {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 0.7; }
          }

          /* Glitch effect overlay */
          .glitch-overlay {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 300px;
            height: 300px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(0, 255, 255, 0.1), transparent 70%);
            filter: blur(50px);
            animation: glitchPulse 3s ease-in-out infinite;
            pointer-events: none;
          }

          @keyframes glitchPulse {
            0%, 100% { 
              transform: translate(-50%, -50%) scale(1);
              opacity: 0.3;
            }
            50% { 
              transform: translate(-50%, -50%) scale(1.2);
              opacity: 0.6;
            }
          }

          /* Responsive adjustments */
          @media (max-width: 640px) {
            .hex-frame {
              width: 150px;
              height: 150px;
            }

            .hex-border {
              width: 120px;
              height: 120px;
            }

            .hex-border-inner {
              width: 90px;
              height: 90px;
            }

            .core-orb {
              width: 60px;
              height: 60px;
            }

            .loading-text {
              font-size: 1.5rem;
              letter-spacing: 0.3rem;
            }

            .progress-container {
              width: 200px;
            }
          }
        `}
      </style>

      {/* Glitch overlay */}
      <div className="glitch-overlay"></div>

      <div className="loader-wrapper">
        {/* Hexagonal frame with rotating borders */}
        <div className="hex-frame">
          <div className="corner-bracket bracket-tl"></div>
          <div className="corner-bracket bracket-tr"></div>
          <div className="corner-bracket bracket-bl"></div>
          <div className="corner-bracket bracket-br"></div>
          
          <div className="hex-border"></div>
          <div className="hex-border-inner"></div>
          <div className="core-orb"></div>
        </div>

        {/* Loading text with glitch effect */}
        <div className="loading-text">
          LOADING
          <span className="binary-dots">
            <span className="binary-dot"></span>
            <span className="binary-dot"></span>
            <span className="binary-dot"></span>
            <span className="binary-dot"></span>
          </span>
        </div>

        {/* System status */}
        <div className="status-bar">
          <div className="status-text">INITIALIZING SYSTEM</div>
          
          <div className="progress-container">
            <div className="progress-bar"></div>
          </div>
          
          <div className="system-info">[ N.E.R.D.S. Bot Active ]</div>
        </div>
      </div>
    </div>
  );
};

export default LoadingAnimation;
