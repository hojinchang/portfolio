import { FC, useState, useEffect, useRef } from "react";

import handleHeadingIntersect from "../global/handleHeadingIntersect";

const TechStackSection: FC = () => {
    const [hasTitleAnimated, setHasTitleAnimated] = useState<boolean>(false);
    // References for GSAP animation
    const titleRef = useRef<HTMLHeadingElement>(null);
    const titleBorderRef = useRef<HTMLDivElement>(null);
    const contentWrapperRef = useRef<HTMLDivElement>(null);

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
        <section id="techStackSection" className="section">
            <h2 ref={titleRef} className="section-title">// TECH STACK</h2>
            <div ref={titleBorderRef} className="section-border"></div>

            <div ref={contentWrapperRef}>

            </div>
        </section>
    )
}

export default TechStackSection;