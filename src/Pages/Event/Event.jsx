
import time from "./Assets/timeline.svg"
import time2 from "./Assets/time2.svg"
import {motion} from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Modal from "./Component/Modal"
import Modal_mini_body from "./Component/Modal_mini_body"
import translate_description_on_timeline from "./JSON/translate_description_on_timeline.json"
import pc_card_border from "./Assets/pc_card_border.svg"
import pc_card_border2 from "./Assets/pc_card_border2.svg"
import links from "./JSON/img_links_for_timeline_cards.json"
import TextAnimation from "./Animations/TextFlip"
import ProgressBar from "react-scroll-progress-bar";
import Button from "./Component/Button"
import Text from "./Component/Verti-text"
import modaldata from "./JSON/modaldata.json"



function Hero() {
    const [isloaded, setIsLoaded] = useState(false)
    const ref = useRef(null)
    useEffect(() => {
        // Trigger the transition when the page loads
        const timer = setTimeout(() => {
          setIsLoaded(true);
        }, 100);
        return () => clearTimeout(timer); // Cleanup the timer
    }, []);
  

    return (
        <div className="hidden pl-28 pb-10 md:pl-0 hero_container flex-col items-center md:block "
        style={{backgroundColor:"rgb(1,1,10)",
                background: 'linear-gradient(0deg, rgba(0, 0, 0, 1) 50%, rgba(1, 1, 15, 1) 100%)'
        }}
        >
            <div 
            ref={ref}
            style={{
                transform: isloaded ? "none" : "translateY(100px)",
                opacity: isloaded ? 1 : 0,
                transition: "all 0.4s cubic-bezier(0.17, 0.55, 0.55, 1) 0.4s"}}
            className="hero md:flex">
                <div className="left md:mx-auto">
                    <img src="https://res.cloudinary.com/dagggqd6g/image/upload/f_auto,q_auto/pccrifcff8niy6prbj20" alt="the robot" className="md:ml-1 md:pr-0" />
                </div>

                <div
                ref={ref}
                style={{
                    transform: isloaded ? "none" : "translateX(150px)",
                    opacity: isloaded ? 1 : 0,
                    transition: "all 0.4s cubic-bezier(0.17, 0.55, 0.55, 1) 0.4s"}}
                className="right block md:flex  flex-col items-center justify-center">
                <TextAnimation />
                <img src="https://res.cloudinary.com/dagggqd6g/image/upload/f_auto,q_auto/pizowecu9wraajx7lfqs" alt="the stuff at the bottom " className="md:flex-shrink-0 md:mr-36 md:mt-[-3rem] pr-36 pb-12 md:pr-0 md:pb-0 "/>
                </div>
            </div>

            <motion.p 
            ref={ref}
            style={{
                transform: isloaded ? "none" : "translateX(200px)",
                opacity: isloaded ? 1 : 0,
                transition: "all 0.4s cubic-bezier(0.17, 0.55, 0.55, 1) 0.4s"}}
            whileHover={{color:"yellow", transition: {duration:0.005}}}
            transition={{duration:0.005}}
            className="pl-6 pb-10  md:mx-auto md:pl-9 font-spaced text-white font-normal heading-subsection">A playful way to emphasize your inner competitive spirit and determination</motion.p>


        </div>
    )
}

function Hero_small() {
    return(
        <div className="hero_contain md:hidden flex flex-col items-center justify-center">
            <img src="https://res.cloudinary.com/dagggqd6g/image/upload/f_auto,q_auto/pccrifcff8niy6prbj20" alt="" className="ml-[-3rem] block"/>
            <h1 className="m-0 p-0 z-20 font-ethenocentric text-4xl bg-gradient-to-b from-[#ffffff] to-[#068bf7] bg-clip-text text-transparent">EVENTS</h1>
            <img src="https://res.cloudinary.com/dagggqd6g/image/upload/f_auto,q_auto/pizowecu9wraajx7lfqs" alt=""  className="block pr-14 mt-[-3rem]"/>
        </div>
    )
}
// Desktop
function Timeline(){
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [id, setId] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [dataId, setDataId] = useState(1);
    const obj = {...translate_description_on_timeline};
    const modalObj = {...modaldata};
    const [border, setBorder] = useState(pc_card_border)
    const [border2, setBorder2] = useState(pc_card_border)
    const [border3, setBorder3] = useState(pc_card_border)
    const [border4, setBorder4] = useState(pc_card_border)
    const [border5, setBorder5] = useState(pc_card_border)
    const [border6, setBorder6] = useState(pc_card_border)

    return(
        <div className="timeline_container hidden mb-32 md:block lg:block" >
            <div className="timeline flex flex-col items-center relative">
                <img src={time} alt="" className="pt-24 lg:px-0 md:px-20 z-0 md:inline" />
                <div className="absolute lg:px-5 md:px-20 cards z-10 h-[100%] overflow-visible lg:w-[100%] md:w-[100%] flex flex-col items-center justify-between pt-40">
    
                    {/* cards */}

                    {/* card1 */}
                    <motion.div 
                        className="cards flex mt-8"
                        onHoverStart={() => {setIsHovered(true); setId(1); setDataId(1); setBorder(pc_card_border2)}}
                        onHoverEnd={() => {setIsHovered(false); setBorder(pc_card_border)}}
                        onClick={() =>{ setIsOpen(true);setId(1);}}>
                        <motion.div
                            className="text text-slate-200 relative text-right "
                            initial={{ x: 120, opacity: 0 }} 
                            animate={(isHovered && id==1)  ? { x: 100, opacity: 1 } : { x: 120, opacity: 0 }} 
                            transition={{ duration: 0.3, ease: "easeInOut" }} >
                                <h1 className="absolute font-ethenocentric text-2xl text-cyan-400  min-w-max left-[2rem]">{obj[dataId].head}</h1>
                                <p className="absolute font-ethenocentric text-xs min-w-96 left-[-10rem] top-10 ">{obj[dataId].data} </p>
                                <div onClick={() => {setIsOpen(true); setId(1);}}>
                                    <Button className=" ml-[-4.5rem]">Know more</Button>
                                </div>
                                <div onClick={() => navigate(modalObj[1].register)}>
                                    <Button className="ml-[6rem]">Register</Button>
                                </div>
                        </motion.div>

                        <motion.div
                            className="relative overflow-hidden flex lg:-mt-0 min-w-[30rem] "
                            style={{
                                clipPath: 'polygon(10% 0%, 100% 0%, 100% 90%, 90% 100%, 0% 100%, 0% 10%)',
                                aspectRatio: '730 / 460',
                            }}
                            onClick={() => {setIsOpen(true); setId(1);}}
                            initial={{ x: 0, opacity: 1 }} 
                            animate={(isHovered && id==1) ? { x: 360, opacity: 1 } : { x: 0, opacity: 1 }}
                            transition={{duration: 0.3, ease: "easeInOut"}}
                            >
                                <img src={border} alt="" /> 
                                <img
                                    src={links.card1} // Use the passed image source prop
                                    alt="Sample Image"
                                    className="absolute top-0 left-0 w-full h-full object-cover z-[-1]" // Using Tailwind for positioning and sizing
                                />
                                <Text/>
                        </motion.div>

                    </motion.div>        

                    {/* card2 */}
                    <motion.div 
                        className="cards flex relative overflow-visible"
                        onHoverStart={() => {setIsHovered(true); setId(2); setDataId(2);setBorder2(pc_card_border2)}}
                        onHoverEnd={() => {setIsHovered(false); setBorder2(pc_card_border)}}
                        onClick={() =>{ setIsOpen(true);setId(2);}}>
                        <motion.div
                            className="relative overflow-hidden flex lg:-mt-0 md:-mt-5 min-w-[30rem]"
                            style={{
                                clipPath: 'polygon(10% 0%, 100% 0%, 100% 90%, 90% 100%, 0% 100%, 0% 10%)',
                                aspectRatio: '730 / 460',
                            }}
                            onClick={() => {setIsOpen(true); setId(2);}}
                            initial={{ x: 0, opacity: 1 }} 
                            animate={(isHovered && id==2) ? { x: -180, opacity: 1 } : { x: 0, opacity: 1 }}
                            transition={{duration: 0.3, ease: "easeInOut"}}
                            >
                                <img src={border2} alt="" /> 
                                <img
                                    src={links.card2} // Use the passed image source prop
                                    alt="Sample Image"
                                    className="absolute top-0 left-0 w-full h-full object-cover z-[-1]" // Using Tailwind for positioning and sizing
                                />
                        </motion.div>

                            <motion.div
                                className="text text-slate-200 relative text-left text"
                                initial={{ x: 100, opacity: 0 }} 
                                animate={(isHovered && id==2)  ? { x: 0, opacity: 1 } : { x: -100, opacity: 0 }} 
                                transition={{ duration: 0.3, ease: "easeInOut" }} >
                                    <h1 className="absolute font-ethenocentric text-2xl text-cyan-400  min-w-max left-[-10rem]">{obj[dataId].head}</h1>
                                    <p className="absolute font-ethenocentric text-xs min-w-96 left-[-10rem] top-10">{obj[dataId].data} </p>
                                    <Button className="ml-[-10rem]" children="Know more"/>
                                    <Button className="ml-[1rem]" children="register"/>                            </motion.div>
                    </motion.div>        

                    {/* card3 */}
                    <motion.div 
                        className="cards flex"
                        onHoverStart={() => {setIsHovered(true); setId(3); setDataId(3);setBorder3(pc_card_border2)}}
                        onHoverEnd={() => {setIsHovered(false); setBorder3(pc_card_border)}}
                        onClick={() =>{ setIsOpen(true);setId(3);}}>
                    <motion.div
                            className="text text-slate-200 relative text-right "
                            initial={{ x: 120, opacity: 0 }} 
                            animate={(isHovered && id==3)  ? { x: 100, opacity: 1 } : { x: 120, opacity: 0 }} 
                            transition={{ duration: 0.3, ease: "easeInOut" }} >
                                <h1 className="absolute font-ethenocentric text-2xl min-w-max text-cyan-400 top-[-1rem]">{obj[dataId].head}</h1>
                                <p className="absolute font-ethenocentric text-xs min-w-96 left-[-10rem] top-5">{obj[dataId].data} </p>
                                <Button className="ml-[-4.5rem]" children="Know more"/>
                                <Button className="ml-[6rem]" children="register"/>
                        </motion.div>


                        <motion.div
                            className="relative overflow-hidden flex lg:-mt-0 md:-mt-5 min-w-[30rem]"
                            style={{
                                clipPath: 'polygon(10% 0%, 100% 0%, 100% 90%, 90% 100%, 0% 100%, 0% 10%)',
                                aspectRatio: '730 / 460',
                            }}
                            onClick={() => {setIsOpen(true); setId(3);}}
                            initial={{ x: 0, opacity: 1 }} 
                            animate={(isHovered && id==3) ? { x: 360, opacity: 1 } : { x: 0, opacity: 1 }}
                            transition={{duration: 0.3, ease: "easeInOut"}}
                            >
                                <img src={border3} alt="" /> 
                                <img
                                    src={links.card3} // Use the passed image source prop
                                    alt="Sample Image"
                                    className="absolute top-0 left-0 w-full h-full object-cover z-[-1]" // Using Tailwind for positioning and sizing
                                />
                        </motion.div>

                    </motion.div>        

                    {/* card4 */}
                    <motion.div 
                        className="cards flex"
                        onHoverStart={() => {setIsHovered(true); setId(4); setDataId(4);setBorder4(pc_card_border2)}}
                        onHoverEnd={() => {setIsHovered(false); setBorder4(pc_card_border)}}
                        onClick={() =>{ setIsOpen(true);setId(4);}}>

                        <motion.div
                            className="relative overflow-hidden flex lg:-mt-0 md:-mt-5 min-w-[30rem]"
                            style={{
                                clipPath: 'polygon(10% 0%, 100% 0%, 100% 90%, 90% 100%, 0% 100%, 0% 10%)',
                                aspectRatio: '730 / 460',
                            }}
                            onClick={() => {setIsOpen(true); setId(4);}}
                            initial={{ x: 0, opacity: 1 }} 
                            animate={(isHovered && id==4) ? { x: -180, opacity: 1 } : { x: 0, opacity: 1 }}
                            transition={{duration: 0.3, ease: "easeInOut"}}
                            >
                                <img src={border4} alt="" /> 
                                <img
                                    src={links.card4} // Use the passed image source prop
                                    alt="Sample Image"
                                    className="absolute top-0 left-0 w-full h-full object-cover z-[-1]" // Using Tailwind for positioning and sizing
                                />
                        </motion.div>

                        <motion.div
                                className="text text-slate-200 relative text-left text"
                                initial={{ x: 100, opacity: 0 }} 
                                animate={(isHovered && id==4)  ? { x: 0, opacity: 1 } : { x: -100, opacity: 0 }} 
                                transition={{ duration: 0.3, ease: "easeInOut" }} >
                                    <h1 className="absolute font-ethenocentric min-w-max text-2xl text-cyan-400  left-[-10rem]">{obj[dataId].head}</h1>
                                    <p className="absolute font-ethenocentric text-xs min-w-96 left-[-10rem] top-10">{obj[dataId].data} </p>
                                    <Button className="ml-[-10rem]" children="Know more"/>
                                    <Button className="ml-[1rem]" children="register"/>                            
                        </motion.div>
                    </motion.div>  

                    {/* card5 */}
                    <motion.div 
                        className="cards flex"
                        onHoverStart={() => {setIsHovered(true); setId(5); setDataId(5);setBorder5(pc_card_border2)}}
                        onHoverEnd={() => {setIsHovered(false); setBorder5(pc_card_border)}}
                        onClick={() =>{ setIsOpen(true);setId(5);}}>
                        <motion.div
                            className="text text-slate-200 relative text-right "
                            initial={{ x: 120, opacity: 0 }} 
                            animate={(isHovered && id==5)  ? { x: 100, opacity: 1 } : { x: 120, opacity: 0 }} 
                            transition={{ duration: 0.3, ease: "easeInOut" }} >
                                <h1 className="absolute font-ethenocentric min-w-max text-2xl text-cyan-400  left-16">{obj[dataId].head}</h1>
                                <p className="absolute font-ethenocentric text-xs min-w-96 left-[-10rem] top-10">{obj[dataId].data} </p>
                                <Button className="ml-[-4.5rem]" children="Know more"/>
                                <Button className="ml-[6rem]" children="register"/>
                        </motion.div>

                        <motion.div
                            className="relative overflow-hidden flex lg:-mt-0 md:-mt-5 min-w-[30rem]"
                            style={{
                                clipPath: 'polygon(10% 0%, 100% 0%, 100% 90%, 90% 100%, 0% 100%, 0% 10%)',
                                aspectRatio: '730 / 460',
                            }}
                            onClick={() => {setIsOpen(true); setId(5);}}
                            initial={{ x: 0, opacity: 1 }} 
                            animate={(isHovered && id==5) ? { x: 360, opacity: 1 } : { x: 0, opacity: 1 }}
                            transition={{duration: 0.3, ease: "easeInOut"}}
                            >
                                <img src={border5} alt="" /> 
                                <img
                                    src={links.card5} // Use the passed image source prop
                                    alt="Sample Image"
                                    className="absolute top-0 left-0 w-full h-full object-cover z-[-1]" // Using Tailwind for positioning and sizing
                                />
                        </motion.div>

                    </motion.div>        

                    {/* card6 */}
                    <motion.div 
                        className="cards flex"
                        onHoverStart={() => {setIsHovered(true); setId(6); setDataId(6);setBorder6(pc_card_border2)}}
                        onHoverEnd={() => {setIsHovered(false); setBorder6(pc_card_border)}}
                        onClick={() =>{ setIsOpen(true);setId(6);}}>

                        <motion.div
                            className="relative overflow-hidden flex lg:-mt-0 md:-mt-5  min-w-[30rem]"
                            style={{
                                clipPath: 'polygon(10% 0%, 100% 0%, 100% 90%, 90% 100%, 0% 100%, 0% 10%)',
                                aspectRatio: '730 / 460',
                            }}
                            onClick={() => {setIsOpen(true); setId(6);}}
                            initial={{ x: 0, opacity: 1 }} 
                            animate={(isHovered && id==6) ? { x: -180, opacity: 1 } : { x: 0, opacity: 1 }}
                            transition={{duration: 0.3, ease: "easeInOut"}}
                            >
                                <img src={border6} alt="" /> 
                                <img
                                    src={links.card6} // Use the passed image source prop
                                    alt="Sample Image"
                                    className="absolute top-0 left-0 w-full h-full object-cover z-[-1]" // Using Tailwind for positioning and sizing
                                />
                        </motion.div>

                        <motion.div
                                className="text text-slate-200 relative text-left text"
                                initial={{ x: 100, opacity: 0 }} 
                                animate={(isHovered && id==6)  ? { x: 0, opacity: 1 } : { x: -100, opacity: 0 }} 
                                transition={{ duration: 0.3, ease: "easeInOut" }} >
                                    <h1 className="absolute font-ethenocentric min-w-max text-2xl text-cyan-400  left-[-10rem]">{obj[dataId].head}</h1>
                                    <p className="absolute font-ethenocentric text-xs min-w-96 left-[-10rem] top-10">{obj[dataId].data} </p>
                                    <Button className="ml-[-10rem]" children="Know more"/>
                                    <Button className="ml-[1rem]" children="register"/>                            
                        </motion.div>
                  
                    </motion.div> 

                    <AnimatePresence>
                        {isOpen && <Modal isOpen={isOpen} id={id} onClose={() => setIsOpen(false)} />}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    )
}

function Timeline_small(){
    // State to manage modal visibility
    const [isOpen2, setIsOpen2] = useState(false);
    const [id, setId] = useState(0)

    // Toggle modal visibility
    const toggleModal = () => setIsOpen2(!isOpen2);

    // Modal animation variants
    const backdropVariants = {
        visible: { opacity: 1 },
        hidden: { opacity: 0 },
    };

    const modalVariants = {
        hidden: { opacity: 0, y: '-100vh' },
        visible: { opacity: 1, y: '0', transition: { duration: 0.5, ease: 'easeInOut' } },
        exit: { opacity: 0, y: '-100vh', transition: { duration: 0.3 } },
    };

    return (
        <div className="timeline_container md:hidden px-10 mb-10 -mt-16">
            <div className="timeline grid grid-cols-8 grid-rows-20">

                <img src={time2} alt="" className="col-start-1 row-start-1 col-span-1 row-span-20" />
                
                <div className="right_contain col-start-2 row-start-1 col-span-7 row-span-20 flex justify-around flex-col max-w-[25rem]">
                    
              
                    {/* cards */}
                    <div className="cards col-start-2 row-start-1 col-span-7 row-span-5 mt-[9rem]"
                    onClick={() => {setIsOpen2(!isOpen2), setId(1)}} >
                        <div
                            className="relative overflow-hidden flex "
                            style={{
                                clipPath: 'polygon(10% 0%, 100% 0%, 100% 90%, 90% 100%, 0% 100%, 0% 10%)',
                                aspectRatio: '730 / 460',
                            }}
                            >
                                <img src={pc_card_border} alt="" />     
                                <img
                                    src={links.card1} // Use the passed image source prop
                                    alt="Sample Image"
                                    className="absolute top-0 left-0 w-full h-full object-cover z-[-1]" // Using Tailwind for positioning and sizing
                                />
                               <Text />
                        </div>
                    </div>

                    <div 
                    onClick={() => {setIsOpen2(!isOpen2), setId(2)}}
                    className="cards col-start-2 row-start-6 col-span-7 row-span-5 mt-[0rem]">
                        <div
                            className="relative overflow-hidden flex "
                            style={{
                                clipPath: 'polygon(10% 0%, 100% 0%, 100% 90%, 90% 100%, 0% 100%, 0% 10%)',
                                aspectRatio: '730 / 460',
                            }}
                            >
                                <img src={pc_card_border} alt="" /> 
                                <img
                                    src={links.card2} // Use the passed image source prop
                                    alt="Sample Image"
                                    className="absolute top-0 left-0 w-full h-full object-cover z-[-1]" // Using Tailwind for positioning and sizing
                                />
                        </div>                    
                    </div>

                    <div onClick={() => {setIsOpen2(!isOpen2), setId(3)}}
                    className="cards col-start-2 row-start-11 col-span-7 row-span-5 mt-[0rem]">
                        <div
                            className="relative overflow-hidden flex "
                            style={{
                                clipPath: 'polygon(10% 0%, 100% 0%, 100% 90%, 90% 100%, 0% 100%, 0% 10%)',
                                aspectRatio: '730 / 460',
                            }}
                            >
                                <img src={pc_card_border} alt="" /> 
                                <img
                                    src={links.card3} // Use the passed image source prop
                                    alt="Sample Image"
                                    className="absolute top-0 left-0 w-full h-full object-cover z-[-1]" // Using Tailwind for positioning and sizing
                                />
                        </div>                    
                    </div>

                    <div onClick={() => {setIsOpen2(!isOpen2), setId(4)}}
                    className="cards col-start-2 row-start-16 col-span-7 row-span-5 mt-[0rem]">
                        <div
                            className="relative overflow-hidden flex "
                            style={{
                                clipPath: 'polygon(10% 0%, 100% 0%, 100% 90%, 90% 100%, 0% 100%, 0% 10%)',
                                aspectRatio: '730 / 460',
                            }}
                            >
                                <img src={pc_card_border} alt="" /> 
                                <img
                                    src={links.card4} // Use the passed image source prop
                                    alt="Sample Image"
                                    className="absolute top-0 left-0 w-full h-full object-cover z-[-1]" // Using Tailwind for positioning and sizing
                                />
                        </div>                    
                    </div>

                    <div onClick={() => {setIsOpen2(!isOpen2), setId(5)}}
                    className="cards col-start-2 row-start-16 col-span-7 row-span-5 mb-[0rem]">
                        <div
                            className="relative overflow-hidden flex "
                            style={{
                                clipPath: 'polygon(10% 0%, 100% 0%, 100% 90%, 90% 100%, 0% 100%, 0% 10%)',
                                aspectRatio: '730 / 460',
                            }}
                            >
                                <img src={pc_card_border} alt="" /> 
                                <img
                                    src={links.card5} // Use the passed image source prop
                                    alt="Sample Image"
                                    className="absolute top-0 left-0 w-full h-full object-cover z-[-1]" // Using Tailwind for positioning and sizing
                                />
                        </div>                    
                    </div>

                    <div onClick={() => {setIsOpen2(!isOpen2), setId(6)}}
                    className="cards col-start-2 row-start-16 col-span-7 row-span-5 mb-[2.3rem]">
                        <div
                            className="relative overflow-hidden flex "
                            style={{
                                clipPath: 'polygon(10% 0%, 100% 0%, 100% 90%, 90% 100%, 0% 100%, 0% 10%)',
                                aspectRatio: '730 / 460',
                            }}
                            >
                                <img src={pc_card_border} alt="" /> 
                                <img
                                    src={links.card6} // Use the passed image source prop
                                    alt="Sample Image"
                                    className="absolute top-0 left-0 w-full h-full object-cover z-[-1]" // Using Tailwind for positioning and sizing
                                />
                        </div>                    
                    </div>

                    <AnimatePresence>
                        {isOpen2 && (
                        <>
                            {/* Backdrop animation */}
                            <motion.div
                            className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50"
                            variants={backdropVariants}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            onClick={toggleModal}
                            />
                            
                            {/* Modal content */}
                            <motion.div
                            className="fixed z-50 top-[5%] left-[10%] w-[80%] bg-opacity-60 backdrop-filter  "
                            variants={modalVariants}
                          
                              
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            onClick={toggleModal} >
                                <Modal_mini_body id={id} toggleModal={toggleModal} />
                            </motion.div>
                        </>
                        )}
                    </AnimatePresence>
                </div>
                
            </div>
        </div>
    )
}


export default function Event(){
    return (
        <div className="bg-black overflow-hidden">
            <ProgressBar duration="0.3"/>
            <Hero />
            <Hero_small />
            <Timeline_small />
            <Timeline />
            {/* <BasicTimeline className="block md:hidden"/> */}
        </div>
    )
}