import './HUD.css';

/**
 * HUD
 * ----------------------------------------------------------------------
 * Decorative sci-fi interface elements layered around the hero.
 * Every element is small, meaningful and low-frequency — coordinate
 * readouts, technical labels, corner brackets, a scan line. Content is
 * hidden from screen readers.
 */
export default function HUD({ children }) {
  return (
    <div className="hud" aria-hidden="true">
      {/* top-left: sector + coords */}
      <span className="hud-el hud--tl">
        <b>N.E.R.D.S.</b>
        <em>// NIT SILCHAR</em>
      </span>

      {/* top-right: status stream */}
      <span className="hud-el hud--tr">
        <em className="hud-stream">
          <i />
          ROBOTICS: &nbsp;
        </em>
        <b>BUILD. TEST. COMPETE.</b>
      </span>

      {/* bottom-left: coordinates */}
      <span className="hud-el hud--bl">
        <em className="hud-coords">
          /<span>BUILD</span> /<span>TEST</span> /<span>CODE</span>
        </em>
      </span>

      {/* bottom-right: vertical text */}
      <span className="hud-el hud--br">
        ED.&nbsp;2026&nbsp;&nbsp;//
      </span>

      {/* corner brackets */}
      <i className="hud-corner hud--c1" />
      <i className="hud-corner hud--c2" />
      <i className="hud-corner hud--c3" />
      <i className="hud-corner hud--c4" />

      {children}
    </div>
  );
}