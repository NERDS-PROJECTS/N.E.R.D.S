import GalaxyComponent from './Landing_v2';
import './landing.css';

export default function Galaxy() {
  return (
    <div className="main-div">
      <GalaxyComponent 
        mouseRepulsion={true}
        mouseInteraction={true}
        density={1.5}
        glowIntensity={0.2}
        saturation={0}
        hueShift={0}
      />
      <h1 className="typewriter font-spaced">ROBOTICS CLUB, NIT SILCHAR</h1>

      <img 
        src="https://res.cloudinary.com/dmhbmurzw/image/upload/v1728710649/Subject_lvavbf.png" 
        alt="Hero-img" 
        className='parallax-image'
      />
      <div className='nerds parallax-text font-ethenocentric text-[#b8b8b8]'>
        <h1>N</h1>
        <h1>.</h1>
        <h1>E</h1>
        <h1>.</h1>
        <h1>R</h1>
        <h1>.</h1>
        <h1>D</h1>
        <h1>.</h1>
        <h1>S</h1>
      </div>
    </div>
  );
}