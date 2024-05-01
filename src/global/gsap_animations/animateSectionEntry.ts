import React from "react";
import gsap from "gsap";

// Function to handle intersection changes
const animateSectionEntry = (sectionRef: React.RefObject<HTMLElement>) => {
    gsap.from(sectionRef.current, {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "power1.out"
    });
};


export default animateSectionEntry;