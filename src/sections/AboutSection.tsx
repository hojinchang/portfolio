import { FC, useState, useEffect, useRef } from "react"

import animateHeadingIntersect from "../global/gsap_animations/animateHeadingIntersect";
import AboutAccordion from "../components/accordion/AboutAccordion";

const AboutSection: FC = () => {
    const [hasTitleAnimated, setHasTitleAnimated] = useState<boolean>(false);

    // References for GSAP animation
    const titleRef = useRef<HTMLHeadingElement>(null);                       // Reference to section heading
    const titleBorderRef = useRef<HTMLDivElement>(null);                     // Reference to section heading bottom border
    const contentWrapperRef = useRef<HTMLDivElement>(null);                  // Reference to project wrapper div

    const [activeAccordion, setActiveAccordion] = useState<string | null>(null);

    // Fade in animation of accordion content
    useEffect(() => {
        if (activeAccordion) {
            const timer = setTimeout(() => {
                const accordionContent = document.getElementById(`content-${activeAccordion}`);
                const headingHero = document.querySelector(".heading-hero");

                if (accordionContent && headingHero) {
                    accordionContent.classList.toggle("show");
                    headingHero.classList.toggle("show");
                }
            }, 10); // Execute after a short delay to allow the element to be rendered with opacity 0
            
            return () => clearTimeout(timer);
        }
    }, [activeAccordion]); // Dependency on activeAccordion ensures this effect runs when it changes
    
    
    // Watch where the scroll is based on the title border
    useEffect(() => {
        // Create a new IntersectionObserver
        const observer = new IntersectionObserver(( entries ) => {
            animateHeadingIntersect(
                entries[0],
                titleBorderRef,
                titleRef,
                null,
                contentWrapperRef,
                hasTitleAnimated,
                setHasTitleAnimated
            )
        }, {
            root: null, // Use the viewport as the root
            rootMargin: "0px 0px -300px 0px",
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
        <section id="about" className="section min-height-fit">
            <h2 ref={ titleRef } className="section-title">// ABOUT</h2>
            <div ref={ titleBorderRef } className="section-border"></div>

            <div ref={ contentWrapperRef } className="hidden-section">
                <AboutAccordion activeAccordion={ activeAccordion } setActiveAccordion={ setActiveAccordion } />
                
                <div className="flex flex-col gap-10 lg:flex-row-reverse">
                    <article className="about-article lg:w-1/2">
                        <h3 className="h3">{ "< ABOUT ME />" }</h3>
                        <div>
                            <p className="about-article-text">
                                Hello, my name is <span className="text-highlight">Hojin</span>! I'm a <span className="text-highlight">Full-Stack Developer</span> with a background in <span className="text-highlight">Machine Learning</span> and <span className="text-highlight">Computer Vision</span>. I bring an <span className="text-highlight">analytical</span>, <span className="text-highlight">detail-oriented</span> approach to development and constantly pursue excellence through <span className="text-highlight">continuous learning</span>. My engineering education has refined my <span className="text-highlight">problem-solving skills</span>, and I love applying them while leveraging cutting-edge technology to craft end-to-end solutions.
                            </p>
                            <p className="text-xl font-semibold text-neutral-200 my-4"><i>I strive to bring concepts into reality...</i></p>
                            <p className="about-article-text">In my free time, I enjoy playing video games such as League of Legends, OS RuneScape, and Pokemon. I also enjoy playing badminton and jamming on my bass guitar.</p>
                        </div>
                    </article>
                    <div className="flex flex-col gap-6 lg:w-1/2">
                        <article className="about-article">
                            <h3 className="h3">{ "< WORK EXPERIENCE />" }</h3>
                            <div className="about-article-content-wrapper">
                                <h4 className="font-medium text-neutral-200">Metrized Consulting Inc</h4>
                                <ul className="list">
                                    <li className="about-article-text">Machine Learning Software Engineer - (Aug 2022 - Aug 2023)</li>
                                    <li className="about-article-text">Machine Learning Software Engineer Co-op - (Aug 2021 - Aug 2022)</li>
                                </ul>
                            </div>
                            <div className="about-article-content-wrapper">
                                <h4 className="font-medium text-neutral-200">FIFO Innovations</h4>
                                <ul className="list">
                                    <li className="about-article-text">Mechanical Design Engineer Co-op - (Jan 2020 - Dec 2020)</li>
                                </ul>

                            </div>
                        </article>
                        <article className="about-article">
                            <h3 className="h3">{ "< EDUCATION />" }</h3>
                            <div className="about-article-content-wrapper">
                                <h4 className="font-medium text-neutral-300">British Columbia Institute of Technology</h4>
                                <ul className="list">
                                    <li className="about-article-text">Front-End Web Developer Certificate <i>(with Distinction)</i> - (May 2024)</li>
                                </ul>
                            </div>
                            <div className="about-article-content-wrapper">
                                <h4 className="font-medium text-neutral-300">Simon Fraser University</h4>
                                <ul className="list">
                                    <li className="about-article-text">BASc. Mechatronic Systems Engineering <i>(with Distinction)</i> - (Aug 2022)</li>
                                </ul>
                            </div>
                        </article>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AboutSection;