import { useState } from "react";
import { FaLinkedin, FaInstagram, FaGithub } from "react-icons/fa";
import "./team_card.css";

const TeamCard = ({ member }) => {
  const { name, designation, social, github, linkedin, image_id } = member;

  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        style={{
          padding: "50px",
          overflow: "hidden",
        }}
      >
        <div
          className="relative rounded-lg p-4 text-center transition-all duration-500 ease-in-out team_kard"
          style={{
            transform: hovered ? "scale(1.05)" : "scale(1)",
          }}
        >
          {/* Background image as SVG */}
          <div
          className="team_card_frame"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='383' height='483' viewBox='0 0 383 483' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cmask id='path-1-inside-1_752_1939' fill='white'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M0 473V93L92 0H373C378.523 0 383 4.47715 383 10V473C383 478.523 378.523 483 373 483H9.99999C4.47714 483 0 478.523 0 473Z'/%3E%3C/mask%3E%3Cpath d='M0 93L-2.48822 90.5385L-3.5 91.5613V93H0ZM92 0V-3.5H90.5392L89.5118 -2.46146L92 0ZM-3.5 93V473H3.5V93H-3.5ZM2.48822 95.4615L94.4882 2.46146L89.5118 -2.46146L-2.48822 90.5385L2.48822 95.4615ZM373 -3.5H92V3.5H373V-3.5ZM386.5 10C386.5 2.54416 380.456 -3.5 373 -3.5V3.5C376.59 3.5 379.5 6.41015 379.5 10H386.5ZM386.5 473V10H379.5V473H386.5ZM373 486.5C380.456 486.5 386.5 480.456 386.5 473H379.5C379.5 476.59 376.59 479.5 373 479.5V486.5ZM9.99999 486.5H373V479.5H9.99999V486.5ZM-3.5 473C-3.5 480.456 2.54414 486.5 9.99999 486.5V479.5C6.41014 479.5 3.5 476.59 3.5 473H-3.5Z' fill='url(%23paint0_linear_752_1939)' mask='url(%23path-1-inside-1_752_1939)'/%3E%3Cdefs%3E%3ClinearGradient id='paint0_linear_752_1939' x1='45.5' y1='54' x2='383' y2='483' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%23F607C2'/%3E%3Cstop offset='1' stop-color='%23900471' stop-opacity='0.1'/%3E%3C/linearGradient%3E%3C/defs%3E%3C/svg%3E%0A")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "cover",
              width: "100%",
              height: "100%",
              clipPath:
                "polygon(80px 0%, 100% 0%, 100% 100%, 0% 100%, 0% 80px)",
              position: "absolute",
              top: 0,
              left: 0,
              opacity: "1",
              transition: "filter 0.3s ease-in-out",
            }}
          />

          {/* Profile Image */}
          {/* Profile Image */}
<img
  src={image_id}
  alt={name}
  className={`mx-auto team_card_img object-cover object-top transition-opacity duration-500 ${
    hovered ? "opacity-20" : "opacity-100"
  }`}
  style={{
    width: "209px",
    height: "209px",
    borderRadius: "50%",
    marginTop: "67px",
    boxShadow: "0px 0px 9.8px 0px #FF00E5",
    border: "1.5px solid #FF00E5",
    objectPosition: "top", // Ensures the top portion of the image is prioritized
  }}
/>

          {/* Name and Role */}
          <h2
            className={`font-spaced font-semibold text-xl mt-4 text-white transition-opacity duration-300 ${hovered ? "opacity-0" : "opacity-100"} header`}
            style={{
              fontSize: "1.5rem",
              lineHeight: "35.97px",
              textAlign: "center",
              marginTop: "2.5rem",
            }}
          >
            {name}
          </h2>
          <p
            className={`text-base text-white transition-opacity duration-300 ${
              hovered ? "opacity-0" : "opacity-100"
            }`}
            style={{
              fontSize: "1.2rem",
              fontWeight: 600,
              lineHeight: "35.97px",
              textAlign: "center",
            }}
          >
            {designation}
          </p>

          {/* Parent Div that contains icons and text, visible on hover */}
          <div
            className="absolute inset-0 flex flex-col justify-center items-center transition-opacity duration-500 hover-card"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='499' height='599' viewBox='0 0 499 599' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg filter='url(%23filter0_dd_773_1899)'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M58 531V151L150 58H431C436.523 58 441 62.4772 441 68V531C441 536.523 436.523 541 431 541H68C62.4771 541 58 536.523 58 531Z' fill='%230F0F0F' fill-opacity='0.55'/%3E%3C/g%3E%3Cdefs%3E%3Cfilter id='filter0_dd_773_1899' x='0.5' y='0.5' width='498' height='598' filterUnits='userSpaceOnUse' color-interpolation-filters='sRGB'%3E%3CfeFlood flood-opacity='0' result='BackgroundImageFix'/%3E%3CfeColorMatrix in='SourceAlpha' type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0' result='hardAlpha'/%3E%3CfeOffset/%3E%3CfeGaussianBlur stdDeviation='28.75'/%3E%3CfeComposite in2='hardAlpha' operator='out'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 0.964706 0 0 0 0 0.027451 0 0 0 0 0.756863 0 0 0 1 0'/%3E%3CfeBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow_773_1899'/%3E%3CfeColorMatrix in='SourceAlpha' type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0' result='hardAlpha'/%3E%3CfeOffset/%3E%3CfeGaussianBlur stdDeviation='10'/%3E%3CfeComposite in2='hardAlpha' operator='out'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 1 0 0 0 0 0.23287 0 0 0 0 0.829883 0 0 0 1 0'/%3E%3CfeBlend mode='normal' in2='effect1_dropShadow_773_1899' result='effect2_dropShadow_773_1899'/%3E%3CfeBlend mode='normal' in='SourceGraphic' in2='effect2_dropShadow_773_1899' result='shape'/%3E%3C/filter%3E%3C/defs%3E%3C/svg%3E%0A")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "cover",
              width: "100%",
              height: "100%",
              borderRadius: "20px",
              opacity: hovered ? 1 : 0,
              transform: hovered ? "scale(1.22)" : "scale(1.22)",
            }}
          >
            <h2
              className={`font-spaced font-semibold text-white text-xl mb-2 transition-opacity duration-300 ${hovered ? "opacity-100" : "opacity-0"}`}
            >
              {name}
            </h2>
            <p
              className={`text-yellow-400 font-semibold text-md transition-opacity duration-300 ${hovered ? "opacity-100" : "opacity-0"}`}
            >
              {designation}
            </p>
            <div className="flex space-x-6 mt-4 text-white">
              {social && (
                <a href={social} target="_blank" rel="noreferrer">
                  <FaInstagram className="text-2xl" />
                </a>
              )}
              {linkedin && (
                <a href={linkedin} target="_blank" rel="noreferrer">
                  <FaLinkedin className="text-2xl" />
                </a>
              )}
              {github && (
                <a href={github} target="_blank" rel="noreferrer">
                  <FaGithub className="text-2xl" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamCard;
