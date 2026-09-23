import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import './AudioPlayer.css';

const TRACK_SRC = '/Perturbator%20Venger%20Instrumental%20The%20Uncanny%20Valley%20Bonus%202016.mp3';
const VOLUME = 0.45;

/**
 * Background track for the Robotron page. AudioPlayer only mounts once
 * App's own preloader (the LoadingAnimation gate) has cleared, so
 * attempting playback on mount — at full volume immediately, no fade-in —
 * starts the music right as the preloader disappears. Loops for the whole
 * visit, and exposes a circular mute toggle fixed to the bottom-right
 * corner.
 *
 * Browsers block audible autoplay before any user gesture; if that
 * happens here, playback is retried on the first click, tap, or keypress
 * anywhere on the page instead of failing silently — and the button gets
 * a pulsing glow plus a "Tap for sound" label so the silence reads as
 * "waiting for you" rather than "broken". Both drop away the moment
 * playback actually starts.
 */
export default function AudioPlayer() {
  const audioRef = useRef(null);
  const [muted, setMuted] = useState(false);
  // True only while the browser is refusing audible autoplay and a real
  // gesture is still needed — drives the glow/hint that points at the
  // button so a silent page doesn't just read as broken.
  const [needsTap, setNeedsTap] = useState(false);

  useEffect(() => {
    const audio = new Audio(TRACK_SRC);
    audio.loop = true;
    audio.volume = VOLUME;
    audioRef.current = audio;

    const removeFallbackListeners = () => {
      document.removeEventListener('click', startAudio);
      document.removeEventListener('touchstart', startAudio);
      document.removeEventListener('keydown', startAudio);
    };

    const startAudio = async () => {
      try {
        await audio.play();
        setNeedsTap(false);
        removeFallbackListeners();
      } catch {
        // Blocked by the browser's autoplay policy — the listeners below
        // stay armed and retry on the first real interaction.
        setNeedsTap(true);
      }
    };

    startAudio();
    document.addEventListener('click', startAudio, { once: true });
    document.addEventListener('touchstart', startAudio, { once: true });
    document.addEventListener('keydown', startAudio, { once: true });

    return () => {
      audio.pause();
      removeFallbackListeners();
    };
  }, []);

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !audio.muted;
    setMuted(audio.muted);
  };

  return (
    <div className="audio-widget">
      {needsTap && (
        <span className="audio-hint" aria-hidden="true">Tap for sound</span>
      )}
      <button
        type="button"
        className={`audio-toggle ${needsTap ? 'audio-toggle--pulse' : ''}`}
        onClick={toggleMute}
        aria-label={muted ? 'Unmute background music' : 'Mute background music'}
        aria-pressed={muted}
      >
        {muted ? <VolumeX size={20} /> : <Volume2 size={20} />}
      </button>
    </div>
  );
}
