import React from "react";
import gsap from "gsap";

let lastScrollY = window.scrollY;

const animateTechStack = (
    entries: IntersectionObserverEntry[],
    frontEndStackRef: React.RefObject<HTMLElement>,
    backEndStackRef: React.RefObject<HTMLElement>,
    programsStackRef: React.RefObject<HTMLElement>,
    hasAnimated: boolean,
    setHasAnimated: React.Dispatch<React.SetStateAction<boolean>>
) => {
    entries.forEach(( entry ) => {
        const currentScrollY = window.scrollY;
        const isScrollingUp = currentScrollY < lastScrollY;

        if (entry.isIntersecting && !hasAnimated) {
            gsap.set([frontEndStackRef.current, backEndStackRef.current, programsStackRef.current], { clearProps: "all" });

            gsap.from(frontEndStackRef.current, {
                opacity: 0,
                y: 20,
                duration: 2,
                ease: "power1.out",
            });

            gsap.from(backEndStackRef.current, {
                opacity: 0,
                y: 20,
                duration: 2,
                ease: "power1.out",
                delay: 0.5
            });

            gsap.from(programsStackRef.current, {
                opacity: 0,
                y: 20,
                duration: 2,
                ease: "power1.out",
                delay: 1
            });
        }
        // Check if the element is no longer intersecting and the animation has played
        else if (!entry.isIntersecting && hasAnimated && isScrollingUp) {
            setHasAnimated(false);
        }

        lastScrollY = currentScrollY;  // Update lastScrollY at the end of the function
    });
}

export default animateTechStack;