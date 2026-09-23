import useSmoothScroll from './hooks/useSmoothScroll';
import useReducedMotion from './hooks/useReducedMotion';
import useIsDesktop from './hooks/useIsDesktop';
import { ParallaxProvider } from './components/ParallaxLayer/index';
import Navbar from './components/Navbar/Navbar';
import CustomCursor from './components/CustomCursor/CustomCursor';
import AudioPlayer from './components/AudioPlayer/AudioPlayer';
import Hero from './components/Hero/Hero';
import './styles/global.css';
import './RobotronLanding.css';

/**
 * Ported from https://github.com/ahiron08/ROBOTRON26 (the ROBOTRON event
 * landing page). Its own Navbar replaces the site's global one on this
 * page, and the site's global Footer is hidden too (see App.jsx).
 */
export default function RobotronLanding() {
  const reduced = useReducedMotion();
  const isDesktop = useIsDesktop();
  useSmoothScroll();

  return (
    <div className="robotron-landing">
      <ParallaxProvider reduced={reduced} isDesktop={isDesktop} enabled>
        <Navbar />
        <CustomCursor />
        <AudioPlayer />

        <main id="robotron-content">
          <Hero />
        </main>
      </ParallaxProvider>
    </div>
  );
}
