import { FC, useState, useEffect, useRef } from "react"

import handleHeadingIntersect from "../global/handleHeadingIntersect";

const AboutSection: FC = () => {
    const [hasTitleAnimated, setHasTitleAnimated] = useState(false);

    // References for GSAP animation
    const titleRef = useRef<HTMLHeadingElement>(null);                       // Reference to section heading
    const titleBorderRef = useRef<HTMLDivElement>(null);                     // Reference to section heading bottom border
    const contentWrapperRef = useRef<HTMLDivElement>(null);                  // Reference to project wrapper div

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
                SOOOOOOOOOOOOOOOOOOOOOOOOOOOOO OOOOOOOOOOOOOOOOOOOOOOO OOOOOOOOOOOOOOOOOOOOOOO OOOOOOOOOOO OOOOOOOM
            </div>
        </section>
    )
}

export default AboutSection;