import './landing.css';
import StarCanvas from "../../assets/canvas/Stars";
import { SplineScene } from "@/components/ui/splite";

const Landing = () => {
 return(
    <>

    <div className="main-div">
    <StarCanvas/>
    <h1 className="typewriter font-spaced">ROBOTICS CLUB, NIT SILCHAR</h1>

        <div className='parallax-image'>
          <SplineScene 
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="w-full h-full"
          />
        </div>
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

    </>
 )
};
export default Landing;