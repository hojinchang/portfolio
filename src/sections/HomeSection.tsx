import { FC } from "react"
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import marqueeAnimation from "../global/marquee";
import ScrollDown from "../components/header/ScrollDown";

const HomeSection: FC = () => {
    // fade in animation for job titles
    useGSAP(() => {
        gsap.from(".job-titles", {
            opacity: 0,
            y: 80,
            duration: 1,
            ease: "ease"
        })
    });

    marqueeAnimation();

    return (
        <section className="h-screen relative">
            <div className="absolute top-1/2 left-0 right-0 transform -translate-y-2/3 max-w-5xl mx-auto">
                <div className="marquee flex gap-52 overflow-hidden 2xs:pb-4 lg:pb-6">
                    <div className="marquee-content flex gap-52 main-text w-full">
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
                    <h2 className="job-titles text-base xs:text-lg font-semibold text-neutral-400 mt-4 text-center 2xs:mt-8 md:text-xl md:mt-12 lg:text-2xl lg:mt-14">FULL STACK DEVELOPER, COMPUTER VISION & MACHINE LEARNING ENGINEER</h2>
                </div>
            </div>

            <ScrollDown />
        </section>
    )
}

export default HomeSection;
