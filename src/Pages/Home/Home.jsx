import TestimonialSection from "../../components/testimonial/testimonial_section"; // Adjust the path if needed
// import WhatDoWeProvide from "../../components/what_do_we_provide/what_do_we_provide_card"; // Adjust the import name
import WhatDoWeProvideSlider from "../../components/what_do_we_provide/what_do_we_provide_section";
import Projects from "../../components/Projects/Projects";
import AboutUsSection from "../../components/About_Us/AboutUsSection";
import Upcoming_events from "../../components/upcoming_events/event_card_slider";
import Galaxy from "../../components/Hero/Galaxy";
import Sponsor from "../../components/Sponsor/Sponsor";
// import { SplineSceneBasic } from "../../components/Hero/Robot_hero";

const Home = () => {
	return (
		<div className="overflow-x-hidden">
			<Galaxy />
			<Upcoming_events />
			<AboutUsSection />
			<Projects />
			<WhatDoWeProvideSlider />
			<Sponsor />
			<TestimonialSection />
		</div>
	);
};

export default Home;
