import React from "react";
import gsap from "gsap";

// Function to handle intersection changes
const animateSingleProjectPage = (
    entries: IntersectionObserverEntry[],
    backLinkRef: React.RefObject<HTMLDivElement>,
    sectionHeadingRef: React.RefObject<HTMLElement>,
    sectionFeaturedImageRef: React.RefObject<HTMLElement>,
    sectionOverviewRef: React.RefObject<HTMLElement>,
    sectionTechStackRef: React.RefObject<HTMLElement>,
    sectionDetailsRef: React.RefObject<HTMLElement>,
) => {
    entries.forEach(( entry ) => {
        // Check if the element is intersecting the viewport and the animation hasn't played yet
        if (entry.isIntersecting ) {
            
            // Play the animation using GSAP
            gsap.from(backLinkRef.current, {
                opacity: 0,
                y: -20,
                duration: 1,
                ease: "power1.out"
            });

            gsap.from(sectionHeadingRef.current, {
                opacity: 0,
                y: 20,
                duration: 1,
                ease: "power1.out"
            });

            gsap.from(sectionFeaturedImageRef.current, {
                opacity: 0,
                y: 20,
                duration: 1,
                ease: "power1.out"
            });

            gsap.from(sectionOverviewRef.current, {
                opacity: 0,
                y: 20,
                duration: 1,
                ease: "power1.out"
            });

            gsap.from(sectionTechStackRef.current, {
                opacity: 0,
                y: 20,
                duration: 1,
                ease: "power1.out"
            });

            gsap.from(sectionDetailsRef.current, {
                opacity: 0,
                y: 20,
                duration: 1,
                ease: "power1.out"
            });
        } 
    });
};


export default animateSingleProjectPage;