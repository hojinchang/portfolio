import React from "react";
import gsap from "gsap";

// Function to handle intersection changes
const animateSectionEntry = (sectionRef: React.RefObject<HTMLElement>) => {
    // GSAP animation that initially sets visibility to visible
    gsap.fromTo(sectionRef.current, {
        autoAlpha: 0, // autoAlpha handles both opacity and visibility for better control
        y: 40
    }, {
        autoAlpha: 1, // Animate to fully visible and interactive
        y: 0,
        duration: 1,
        ease: "power1.out",
        onStart: () => {
            if (sectionRef.current) {
                sectionRef.current.style.visibility = 'visible'; // Ensure visibility is turned on when animation starts
            }
        }
    });
};


export default animateSectionEntry;