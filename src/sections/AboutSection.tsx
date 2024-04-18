import { FC, useState, useEffect, useRef } from "react"

import handleHeadingIntersect from "../global/handleHeadingIntersect";

const AboutSection: FC = () => {
    const [hasTitleAnimated, setHasTitleAnimated] = useState<boolean>(false);

    // References for GSAP animation
    const titleRef = useRef<HTMLHeadingElement>(null);                       // Reference to section heading
    const titleBorderRef = useRef<HTMLDivElement>(null);                     // Reference to section heading bottom border
    const contentWrapperRef = useRef<HTMLDivElement>(null);                  // Reference to project wrapper div

    const [activeArticle, setActiveArticle] = useState<string | null>(null);

    const handleAccordionClick = (section: string) => {
        setActiveArticle(activeArticle === section ? null : section);
    };

    // Fade in animation of accordion content
    useEffect(() => {
        if (activeArticle) {
            const timer = setTimeout(() => {
                const element = document.getElementById(`content-${activeArticle}`);

                if (element) {
                    element.classList.add("show");
                }
            }, 10); // Execute after a short delay to allow the element to be rendered with opacity 0
            
            return () => clearTimeout(timer);
        }
    }, [activeArticle]); // Dependency on activeArticle ensures this effect runs when it changes

    
    
    // Watch where the scroll is based on the title border
    useEffect(() => {
        // Create a new IntersectionObserver
        const observer = new IntersectionObserver(( entries ) => {
            handleHeadingIntersect(
                entries,
                titleBorderRef,
                titleRef,
                null,
                contentWrapperRef,
                hasTitleAnimated,
                setHasTitleAnimated
            )
        }, {
            root: null, // Use the viewport as the root
            rootMargin: "0px", // No margin around the root
            threshold: 0.1 // Trigger when 10% of the element is visible
         });
    
        // Observe the titleBorderRef element
        if (titleBorderRef.current) {
            observer.observe(titleBorderRef.current);
        }
    
        // Cleanup: Stop observing the element when the component unmounts
        return () => {
            if (titleBorderRef.current) {
                observer.unobserve(titleBorderRef.current);
            }
        };
    }, [hasTitleAnimated]); // Re-run the effect when hasTitleAnimated changes

    return (
        <section id="aboutSection" className="section min-h-screen">
            <h2 ref={ titleRef } className="section-title">// ABOUT</h2>
            <div ref={ titleBorderRef } className="section-border"></div>

            <div ref={ contentWrapperRef } >
                <div className="shadow-accordion-shadow lg:w-1/2">
                    <button className="accordion" onClick={() => handleAccordionClick("developer")}>
                        <p className="font-semibold">DEVELOPER</p>
                        <svg className={`text-neutral-100 accordion-icon ${activeArticle === "developer" ? "accordion-icon-rotate" : ""}`} fill="currentColor" width="14" height="14" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 7.33l2.829-2.83 9.175 9.339 9.167-9.339 2.829 2.83-11.996 12.17z"/>
                        </svg>
                    </button>
                    <div className={`accordion-content-wrapper ${activeArticle === "developer" ? "block" : "hidden"}`}>
                        <p id="content-developer" className={`accordion-content ${activeArticle === "developer" ? "opacity-100" : "opacity-0"}`}>Analytical, detail-oriented software developer specializing in Full-Stack development, Machine Learning, and Computer Vision.</p>
                    </div>

                    <button className="accordion" onClick={() => handleAccordionClick("leader")}>
                        <p className="font-semibold">LEADER</p>
                        <svg className={`text-neutral-100 accordion-icon ${activeArticle === "leader" ? "accordion-icon-rotate" : ""}`} fill="currentColor" width="14" height="14" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 7.33l2.829-2.83 9.175 9.339 9.167-9.339 2.829 2.83-11.996 12.17z"/>
                        </svg>
                    </button>
                    <div className={`accordion-content-wrapper ${activeArticle === "leader" ? "block" : "hidden"}`}>
                        <p id="content-leader" className={`accordion-content ${activeArticle === "leader" ? "opacity-100" : "opacity-0"}`}>Proven leader adept at steering teams toward success through clear direction, collaboration, and a focus on achieving collective goals.</p>
                    </div>

                    <button className="accordion" onClick={() => handleAccordionClick('innovator')}>
                        <p className="font-semibold">INNOVATOR</p>
                        <svg className={`text-neutral-100 accordion-icon ${activeArticle === "innovator" ? "accordion-icon-rotate" : ""}`} fill="currentColor" width="14" height="14" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 7.33l2.829-2.83 9.175 9.339 9.167-9.339 2.829 2.83-11.996 12.17z"/>
                        </svg>
                    </button>
                    <div className={`accordion-content-wrapper ${activeArticle === "innovator" ? "block" : "hidden"}`}>
                        <p id="content-innovator" className={`accordion-content ${activeArticle === "innovator" ? "opacity-100" : "opacity-0"}`}>Creative innovator committed to transforming ideas into practical solutions. Skilled in identifying unique opportunities for technological advancement and implementing cutting-edge approaches.</p>
                    </div>

                </div>
                <div className="flex flex-col gap-10 lg:flex-row-reverse">
                    <article className="flex flex-col gap-2 lg:w-1/2">
                        <h3 className="text-xl font-semibold">{ "< ABOUT ME />" }</h3>
                        <div>
                            <p className="text-neutral-300 leading-relaxed">
                                Hello, my name is <span className="text-highlight">Hojin</span>! I'm a <span className="text-highlight">Full-Stack Developer</span> with a background in <span className="text-highlight">Machine Learning</span> and <span className="text-highlight">Computer Vision</span>. I bring an <span className="text-highlight">analytical</span>, <span className="text-highlight">detail-oriented</span> approach to development and constantly pursue excellence through <span className="text-highlight">continuous learning</span>. My engineering education honed my <span className="text-highlight">problem-solving skills</span>, and I love applying them while leveraging cutting-edge technology to craft end-to-end solutions.
                            </p>
                            <p className="text-xl font-semibold text-neutral-200 my-4"><i>I strive to bring concepts into reality...</i></p>
                            <p className="text-neutral-300 leading-relaxed">In my free time, I enjoy playing video games such as League of Legends, OS RuneScape, and Pokemon. I also enjoy playing badminton and jamming on my bass guitar.</p>
                        </div>
                    </article>
                    <div className="flex flex-col gap-6 lg:w-1/2">
                        <article className="flex flex-col gap-2">
                            <h3 className="text-xl font-semibold">{ "< WORK EXPERIENCE />" }</h3>
                            <div className="flex flex-col gap-1">
                                <h4 className="font-medium text-neutral-200">Metrized Consulting Inc</h4>
                                <ul className="list-disc list-inside ml-4">
                                    <li className="text-neutral-300 leading-relaxed">Machine Learning Software Engineer - (Aug 2022 - Aug 2023)</li>
                                    <li className="text-neutral-300 leading-relaxed">Machine Learning Software Engineer Co-op - (Aug 2021 - Aug 2022)</li>
                                </ul>
                            </div>
                            <div className="flex flex-col gap-1">
                                <h4 className="font-medium text-neutral-200">FIFO Innovations</h4>
                                <ul className="list-disc list-inside ml-4">
                                    <li className="text-neutral-300 leading-relaxed">Mechanical Design Engineer Co-op - (Jan 2020 - Dec 2020)</li>
                                </ul>

                            </div>
                        </article>
                        <div className="flex flex-col gap-2">
                            <h3 className="text-xl font-semibold">{ "< EDUCATION />" }</h3>
                            <article className="flex flex-col gap-1">
                                <h4 className="font-medium text-neutral-300">British Columbia Institute of Technology</h4>
                                <ul className="list-disc list-inside ml-4">
                                    <li className="text-neutral-300 leading-relaxed">Front-End Web Developer Certificate <i>(with Distinction)</i> - (May 2024)</li>
                                </ul>
                            </article>
                            <article className="flex flex-col gap-1">
                                <h4 className="font-medium text-neutral-300">Simon Fraser University</h4>
                                <ul className="list-disc list-inside ml-4">
                                    <li className="text-neutral-300 leading-relaxed">BASc. Mechatronic Systems Engineering <i>(with distinction)</i> - (Aug 2022)</li>
                                </ul>
                            </article>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AboutSection;