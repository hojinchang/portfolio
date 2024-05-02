import { FC, useState, useEffect } from "react"
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import SecondaryNav from "../components/nav/SecondaryNav";
import CurrentTime from "../components/CurrentTime";
import ScrollDown from "../components/ScrollDown";
import { useMarqueeAnimation } from "../hooks/useMarquee";

const HomeSection: FC = () => {
    const [enableSecondaryNav, setEnableSecondaryNav] = useState<boolean>(false);
    const marqueeRef = useMarqueeAnimation(true);

    // fade in animation for job titles
    useGSAP(() => {
        gsap.from("#job-titles", {
            opacity: 0,
            y: 80,
            duration: 1,
            ease: "power1.out"
        });

        gsap.from("#current-time", {
            opacity: 0,
            x: -50,
            duration: 1,
            ease: "power1.out"
        });
    });

    useEffect(() => {
        const handleResize = () => {
            setEnableSecondaryNav(window.innerWidth >= 1024);
        };

        handleResize();
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        }
    }, []);



    return (
        <section id="home" className="h-screen relative mb-[10rem]">
            <div className="absolute top-1/2 left-0 right-0 transform -translate-y-2/3 mx-auto max-w-6xl md:max-w-[575px] 2md:max-w-[650px] lg:max-w-[800px] xl:max-w-[1000px] 2xl:max-w-[1152px]">
                <div ref={ marqueeRef } className="marquee flex gap-52 overflow-hidden 2xs:pb-4 lg:pb-6">
                    <div className="marquee-content flex gap-52 w-full">
                        <div className="name-marquee w-full">
                            <span className="marquee-letter inline-block">H</span>
                            <span className="marquee-letter inline-block">o</span>
                            <span className="marquee-letter inline-block">j</span>
                            <span className="marquee-letter inline-block">i</span>
                            <span className="marquee-letter inline-block">n</span>
                            <span className="marquee-letter inline-block mx-4 sm:mx-8"></span>
                            <span className="marquee-letter inline-block">C</span>
                            <span className="marquee-letter inline-block">h</span>
                            <span className="marquee-letter inline-block">a</span>
                            <span className="marquee-letter inline-block">n</span>
                            <span className="marquee-letter inline-block">g</span>
                        </div>
                    </div>
                </div>

                <div>
                    <h2 id="job-titles" className="text-base xs:text-lg font-semibold text-neutral-400 mt-4 text-center 2xs:mt-8 md:text-xl md:mt-12 lg:text-2xl lg:mt-14">FULL-STACK DEVELOPER, COMPUTER VISION & MACHINE LEARNING ENGINEER</h2>
                </div>
            </div>
            <CurrentTime />
            { enableSecondaryNav && <SecondaryNav /> }
            <ScrollDown />
        </section>
    )
}

export default HomeSection;
