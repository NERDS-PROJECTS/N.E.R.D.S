import { useRef } from "react";
import Slider from "react-slick";
import useWindowSize from "./useWindowSize";
import './styles.css'

const Glimpse = () => {
  const sliderRef1 = useRef(null);
  const sliderRef2 = useRef(null);
  const { width } = useWindowSize();

  const settings1 = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: width < 640 ? 1 : width < 1024 ? 2 : 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
    arrows: false,
    centerMode: true,
    centerPadding: "40px",
  };

  const settings2 = {
    ...settings1,
    rtl: true,
  };

  // Separate photos for each row
  const photosRow1 =[
  "https://res.cloudinary.com/wjfmxall/image/upload/v1791407283/DSC09259-Enhanced-NR_1.jpg",
  "https://res.cloudinary.com/wjfmxall/image/upload/v1791406919/DSC09405-Enhanced-NR_1.jpg",
  "https://res.cloudinary.com/wjfmxall/image/upload/v1791406787/DSC09392_1.jpg",
  "https://res.cloudinary.com/wjfmxall/image/upload/v1791406658/DSC09364_1.jpg",
  "https://res.cloudinary.com/wjfmxall/image/upload/v1791406532/DSC09323_1.jpg",
  "https://res.cloudinary.com/wjfmxall/image/upload/v1791406418/DSC09299-Enhanced-NR_1.jpg",
  "https://res.cloudinary.com/wjfmxall/image/upload/v1791406249/DSC09268-Enhanced-NR_1.jpg",
  "https://res.cloudinary.com/wjfmxall/image/upload/v1791406137/DSC09243-Enhanced-NR_1.jpg",
  "https://res.cloudinary.com/wjfmxall/image/upload/v1791406005/DSC09224-Enhanced-NR_1.jpg",
  "https://res.cloudinary.com/wjfmxall/image/upload/v1791405693/DSC09178_1.jpg",
  "https://res.cloudinary.com/djqzpak1s/image/upload/v1744057238/IMG-20250330-WA0231_uqupbk.jpg"
];

  const photosRow2 = [
    "https://res.cloudinary.com/dqeenwawp/image/upload/v1791466361/e45b265c-529d-4f2a-9646-cc97578c9f61.png",
    "https://res.cloudinary.com/dqeenwawp/image/upload/v1791466527/b0a5a464-a0b5-41fd-b216-61b45501b8a3.png",
    "https://res.cloudinary.com/dqeenwawp/image/upload/v1791466424/9e8edaf0-f63f-4c95-9c26-271333de17d4.png",
    "https://res.cloudinary.com/dqeenwawp/image/upload/v1791466458/4bb85542-8130-4999-93c2-ae16b4f44e5c.png",
    "https://res.cloudinary.com/dqeenwawp/image/upload/v1791466359/dd8b8fa1-9f67-406a-85c6-72030a0acabc.png",
    "https://res.cloudinary.com/dqeenwawp/image/upload/v1791466561/c5a7703f-34ed-4af4-a191-43001f06e507.png",
    "https://res.cloudinary.com/dqeenwawp/image/upload/v1791466733/bf3142b5-2539-44b5-ad22-1de0b7cf37b9.png",
    "https://res.cloudinary.com/dqeenwawp/image/upload/v1791466737/d7503210-9088-43a5-8b7c-065b2060e753.png",
    "https://res.cloudinary.com/dqeenwawp/image/upload/v1791467400/2fba483e-06fe-4ef5-a20e-cc24ca6ae38c.png"
  ];

  return (
    <div className="w-full p-6 sm:p-10 relative flex flex-col items-center bg-black min-h-screen">
      <h1 className="text-white text-4xl md:text-5xl font-bold mb-10 font-ethenocentric
    bg-gradient-to-r from-purple-300 via-pink-300 to-blue-300 bg-clip-text text-transparent
    transition-all duration-500 hover:opacity-90 enhanced-glow hover:scale-105 text-center">
  Glimpse
</h1>

      {/* First Row */}
      <div className="relative w-full max-w-[1700px] flex justify-center mb-6">
        <Slider ref={sliderRef1} {...settings1} className="w-full">
          {photosRow1.map((photo, index) => (
            <div key={index} className="px-4 flex justify-center">
              <div className="overflow-hidden rounded-2xl shadow-xl group">
                <img
                  src={photo}
                  alt={`Gallery Row 1 - ${index + 1}`}
                  className="w-full h-auto aspect-[4/3] object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* Second Row (Opposite Direction) */}
      <div className="relative w-full max-w-[1700px] flex justify-center">
        <Slider ref={sliderRef2} {...settings2} className="w-full">
          {photosRow2.map((photo, index) => (
            <div key={index} className="px-4 flex justify-center">
              <div className="overflow-hidden rounded-2xl shadow-xl group">
                <img
                  src={photo}
                  alt={`Gallery Row 2 - ${index + 1}`}
                  className="w-full h-auto aspect-[4/3] object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Glimpse;