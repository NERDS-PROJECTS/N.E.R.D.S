import { useEffect, useState } from "react";
import "./team.css";
import TeamCard from "../../components/Team_card/team_card";
import "swiper/swiper-bundle.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import data from "./teamData.json";
import datas from "./developerdata.json";

const Team = () => {
  const [isLaptopView, setIsLaptopView] = useState(window.innerWidth >= 1024);
  const [teamData, setTeamData] = useState([]);
  const [developerData, setDeveloperData] = useState([]);
  const [selectedYear, setSelectedYear] = useState("2026");

  useEffect(() => {
    setTeamData(data);
    setDeveloperData(datas);
  }, []);

  const checkScreenSize = () => {
    setIsLaptopView(window.matchMedia("(min-width: 1024px)").matches);
  };

  useEffect(() => {
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  const filteredTeamData = teamData.filter((member) => member.year === selectedYear);

  const ficMembers = filteredTeamData.filter(
    (member) => member.team && member.team.toLowerCase() === "fic"
  );
  const fourthYearMembers = filteredTeamData.filter((member) => member.team === "4th Year");
  const thirdYearMembers = filteredTeamData.filter((member) => member.team === "3rd Year");
  const secondYearMembers = filteredTeamData.filter((member) => member.team === "2nd Year");
  const developers = developerData.filter((member) => member.developer_team === "Yes");

  const sections = [
    { title: "FACULTY IN-CHARGE", members: ficMembers },
    { title: "FOURTH YEAR MEMBERS", members: fourthYearMembers },
    { title: "THIRD YEAR MEMBERS", members: thirdYearMembers },
    { title: "SECOND YEAR MEMBERS", members: secondYearMembers },
  ];

  return (
    <>
      <div className="text-center mt-4 mb-8">
        <div className="inline-flex items-center gap-4">
          <label htmlFor="year-select" className="text-white font-ethenocentric text-lg">
            Select Year:
          </label>
          <div className="relative">
            <select
              id="year-select"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="appearance-none p-2 pr-8 rounded bg-gray-800 text-white font-ethenocentric cursor-pointer"
            >
              <option value="2024">2024</option>
              <option value="2025">2025</option>
              <option value="2026">2026</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {sections.map((section, idx) => {
        if (section.members.length === 0) return null;

        return (
          <div key={idx} className="text-center mt-24 w-full flex flex-col items-center">
            <h1 className="font-ethenocentric text-5xl bg-gradient-to-b from-[#ffffff] to-[#068bf7] bg-clip-text text-transparent meetour">
              MEET OUR
            </h1>
            <h1 className="font-ethenocentric text-4xl mt-3 bg-gradient-to-b from-[#ffffff] to-[#068bf7] bg-clip-text text-transparent member">
              {section.title} ({selectedYear})
            </h1>

            {isLaptopView ? (
              <div className="mt-8 px-6 w-full max-w-7xl mx-auto flex justify-center">
                <div
                  className={`grid gap-8 w-full justify-items-center items-center ${
                    section.members.length === 1
                      ? "grid-cols-1"
                      : section.members.length === 2
                      ? "grid-cols-2 max-w-4xl"
                      : "grid-cols-3"
                  }`}
                >
                  {section.members.map((member, index) => (
                    <div key={member.id || index} className="flex justify-center items-center w-full">
                      <TeamCard member={member} />
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="mt-8 px-4 w-full max-w-full overflow-hidden">
                <Swiper
                  navigation
                  pagination={false}
                  grabCursor={true}
                  spaceBetween={20}
                  slidesPerView={1}
                  centeredSlides={true}
                  breakpoints={{
                    640: { slidesPerView: 1, spaceBetween: 10 },
                    768: { slidesPerView: Math.min(2, section.members.length), spaceBetween: 20 },
                  }}
                  modules={[Navigation, Pagination, EffectCoverflow]}
                  className="w-full"
                >
                  {section.members.map((member, index) => (
                    <SwiperSlide key={member.id || index} className="!flex !justify-center !items-center">
                      <TeamCard member={member} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            )}
          </div>
        );
      })}

      {/* Developers Section */}
      {developers.length > 0 && (
        <div className="text-center mt-24 w-full flex flex-col items-center">
          <h1 className="font-ethenocentric text-4xl bg-gradient-to-b from-[#ffffff] to-[#068bf7] bg-clip-text text-transparent meetour">
            MEET OUR
          </h1>
          <h1 className="font-ethenocentric text-4xl mt-3 bg-gradient-to-b from-[#ffffff] to-[#068bf7] bg-clip-text text-transparent member">
            DEVELOPERS
          </h1>

          {isLaptopView ? (
            <div className="mt-8 px-6 w-full max-w-7xl mx-auto flex justify-center">
              <div
                className={`grid gap-8 w-full justify-items-center items-center ${
                  developers.length === 1
                    ? "grid-cols-1"
                    : developers.length === 2
                    ? "grid-cols-2 max-w-4xl"
                    : "grid-cols-3"
                }`}
              >
                {developers.map((member, index) => (
                  <div key={member.id || index} className="flex justify-center items-center w-full">
                    <TeamCard member={member} />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="mt-8 px-4 w-full max-w-full overflow-hidden">
              <Swiper
                navigation
                pagination={false}
                grabCursor={true}
                spaceBetween={20}
                slidesPerView={1}
                centeredSlides={true}
                breakpoints={{
                  640: { slidesPerView: 1, spaceBetween: 10 },
                  768: { slidesPerView: Math.min(2, developers.length), spaceBetween: 20 },
                }}
                modules={[Navigation, Pagination, EffectCoverflow]}
                className="w-full"
              >
                {developers.map((member, index) => (
                  <SwiperSlide key={member.id || index} className="!flex !justify-center !items-center">
                    <TeamCard member={member} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Team;