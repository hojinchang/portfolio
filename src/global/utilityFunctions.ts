import React from "react";
import gsap from "gsap";

// Function to handle intersection changes
const handleHeaderIntersect = (
    entries: IntersectionObserverEntry[],
    titleBorderRef: React.RefObject<HTMLHeadingElement>,
    titleRef: React.RefObject<HTMLHeadingElement>,
    viewAllProjectsRef: React.RefObject<HTMLParagraphElement>,
    hasAnimated: boolean,
    setHasAnimated: React.Dispatch<React.SetStateAction<boolean>>

) => {
    entries.forEach((entry) => {
        // Check if the element is intersecting the viewport and the animation hasn't played yet
        if (entry.isIntersecting && !hasAnimated) {
            // Play the animation using GSAP
            gsap.fromTo(titleBorderRef.current, {
                width: "0%" 
            }, {
                width: "100%",
                duration: 1.75,
                ease: "ease"
            }).then(() => {
                setHasAnimated(true);
            });

            gsap.from(titleRef.current, {
                opacity: 0,
                x: -40,
                duration: 2,
                ease: "ease"
            });

            gsap.from(viewAllProjectsRef.current, {
                opacity: 0,
                x: 40,
                duration: 2,
                ease: "ease"
            });
        } 
        // Check if the element is no longer intersecting and the animation has played
        else if (!entry.isIntersecting && hasAnimated) {
            setHasAnimated(false);
        }
    });
};

export {
    handleHeaderIntersect
}