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

            gsap.from([frontEndStackRef.current, backEndStackRef.current, programsStackRef.current], {
                opacity: 0,
                y: 20,
                duration: 1,
                ease: "power1.out",
                stagger: 0.5,
                onComplete: () => {
                    setHasAnimated(true);
                }
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