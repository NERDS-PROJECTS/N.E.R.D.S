import  { useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import TestimonialCard from "./testimonial_card";
import TestimonialText from "./testimonial_text";
import "./testimonial_styles.css";


const testimonials = [
  {
    name: "Dr. Chandrajit Choudhury",
    role: "Faculty Incharge",
    image:
      "https://res.cloudinary.com/dqmktpekh/image/upload/f_auto,q_auto/faazwbq6kkkwek2accan",
    text: (
      <>
        <span className="quote">“</span>
        The experience at NIT Silchar has been transformative, fostering
        creativity, teamwork, and invaluable skills for my future in technology.
        <span className="quote">”</span>
      </>
    ),
  },
  {
    name: "Swarup Chanda",
    role: "President",
    image: "https://res.cloudinary.com/dagggqd6g/image/upload/v1760649725/20251016_185151_edt9wj.webp",
    text: (
      <>
        <span className="quote">“</span>
        As President, my vision is to cultivate a culture where creativity meets cutting-edge technology.
        At N.E.R.D.S, we're building not just machines but confident, capable engineers ready to shape tomorrow.
        <span className="quote">”</span>
      </>
    ),
  },
  {
    name: "Md. Fayjan",
    role: "Vice President",
    image: "https://res.cloudinary.com/dqmktpekh/image/upload/v1727726868/fl7s9efn5nrfilh30rrl.webp",
    text: (
      <>
        <span className="quote">“</span>
        N.E.R.D.S has been a launchpad for turning concepts into reality.
        From soldering our first circuits to presenting innovations on big stages, this journey has been one of learning, resilience, and growth.
        <span className="quote">”</span>
      </>
    ),
  },
  {
    name: "Anwesha Duara",
    role: "Vice President",
    image: "https://res.cloudinary.com/dmhbmurzw/image/upload/v1728360594/IMG-20240822-WA0002_-_ECE_070_ANWESHA_DUARA_w90q9d.jpg",
    text: (
      <>
        <span className="quote">“</span>
        Being part of N.E.R.D.S has empowered me to explore robotics through collaboration and creativity.
        The club’s spirit of innovation has inspired me to push boundaries and lead by example.
        <span className="quote">”</span>
      </>
    ),
  },
  {
    name: "Adarsh Sharma",
    role: "General Secretary",
    image: "https://res.cloudinary.com/dqmktpekh/image/upload/v1727726867/zocna1qwjbuexcqg0jy3.webp",
    text: (
      <>
        <span className="quote">"</span>
        N.E.R.D.S has been instrumental in shaping my technical journey, providing a platform where ideas transform into reality.
        The collaborative environment and hands-on projects have been pivotal in developing both my technical and leadership skills.
        <span className="quote">"</span>
      </>
    ),
  },
];

const TestimonialSection = () => {
  const cardSliderRef = useRef(null);
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);

  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (current, next) => setCurrentTestimonialIndex(next),
    autoplay: true,
    autoplaySpeed: 4000,
    ease: "ease-in-out",
  };



  return (
    <div className="relative w-full h-screen flex justify-center items-center overflow-hidden">
      {/* Gradient Background */}
      <div
        className="absolute bg-[conic-gradient(from_134.62deg_at_50%_50%,_#111111_0deg,_#13040A_62.55deg,_#100429_189.91deg,_#f30066_205.08deg,_#111111_310.73deg,_#530ced_360deg)] h-[700px] w-[700px] rounded-full blur-3xl animate-gradient"
        style={{
          width: "665px",
          height: "766px",
          top: "151px",
          left: "50%",
          transform: "translateX(-50%)",
          backdropFilter: "blur(195px)",
          opacity: "0.3",
          zIndex: 0,
        }}
      ></div>

      {/* Testimonial Content */}
      <div className="relative z-10 w-full h-full flex flex-col justify-start items-center font-ethenocentric">
        {/* Heading */}
        <div className="mb-0 mt-10">
          <h1 className="text-center font-normal text-3xl md:text-4xl leading-tight text-gray-400">
            TESTIMONIAL
          </h1>
        </div>

        {/* Mobile View: Role and Message from testimonial */}
        <div className="block lg:hidden text-center mb-4 mt-8">
          <h2 className="text-gray-500 text-lg md:text-xl">
            Message from{" "}
            <span className="text-yellow-500 text-xl md:text-2xl tracking-wide">
              {testimonials[currentTestimonialIndex].role}
            </span>
          </h2>
        </div>

        {/* Testimonial Content */}
        <div className="w-full h-full flex flex-col justify-center items-center relative">
          <Slider ref={cardSliderRef} {...settings} className="w-full">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="flex justify-center w-full h-full">
                {/* Flex container for card and text */}
                <div className="flex flex-col lg:flex-row w-full justify-around items-center lg:ml-20">
                  {/* TestimonialCard with scaling */}
                  <div className="flex-1 mx-1 max-w-md">
                    <div className="transform scale-[75%] lg:scale-100 transition-transform duration-300">
                      <TestimonialCard testimonial={testimonial} />
                    </div>
                  </div>

                  {/* TestimonialText - Visible only on large screens */}
                  <div className="flex-1 mx-1 flex-col items-center justify-start hidden lg:flex">
                    {/* Message from role */}
                    <div className="mb-2 font-spaced text-center">
                      <h2 className="text-gray-500 text-lg md:text-xl">
                        Message from
                        <span
                          className="text-yellow-500 ml-2"
                          style={{
                            fontFamily: "Spaced",
                            fontSize: "44px",
                            fontWeight: "400",
                            lineHeight: "42.02px",
                            textAlign: "center",
                          }}
                        >
                          {testimonial.role}
                        </span>
                      </h2>
                    </div>

                    {/* Show TestimonialText only on larger screens */}
                    <div className="mr-20">
                      <TestimonialText testimonial={testimonial} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>

          {/* Custom navigation buttons using IoIosArrowBack and IoIosArrowForward */}
          {/* Removed arrow buttons for cleaner UI */}
        </div>
      </div>
    </div>
  );
};

export default TestimonialSection;
