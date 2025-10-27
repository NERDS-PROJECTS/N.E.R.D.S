import './landing.css';
import { SplineScene } from "@/components/ui/splite";
import StyledStarsCanvas from "@/assets/canvas/Stars";

export default function Galaxy() {
  return (
    <div className="main-div">
     
      
      {/* Stars background */}
      <div className="stars-container">
        <StyledStarsCanvas />
      </div>
      
      <h1 className="typewriter mt-10 md:mt-0 mx-auto font-spaced">ROBOTICS CLUB, NIT SILCHAR</h1>

      {/* Right content */}
      <div className="flex-1 relative mb-1 mt-[1rem] h-1 w-96 md:w-full md:h-12 md:pt-7 md:mb-32  ">
          <SplineScene 
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            
            mobileScale={1.1}
            // desktopScale={1.5}
          />
        </div>
      <div className='nerds parallax-text mb-[-5rem] md:mb-0 font-ethenocentric text-[#b8b8b8]'>
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