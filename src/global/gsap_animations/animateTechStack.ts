import React from "react";
import gsap from "gsap";

let lastScrollY = window.scrollY;

const animateTechStack = (
    entry: IntersectionObserverEntry,
    frontEndStackRef: React.RefObject<HTMLElement>,
    backEndStackRef: React.RefObject<HTMLElement>,
    programsStackRef: React.RefObject<HTMLElement>,
    hasAnimated: boolean,
    setHasAnimated: React.Dispatch<React.SetStateAction<boolean>>,
) => {
    const currentScrollY = window.scrollY;
    const isScrollingUp = currentScrollY < lastScrollY;

    if (entry.isIntersecting && !hasAnimated) {
        gsap.set([frontEndStackRef.current, backEndStackRef.current, programsStackRef.current], { 
            autoAlpha: 0
        });

        gsap.fromTo([frontEndStackRef.current, backEndStackRef.current, programsStackRef.current], {
            autoAlpha: 0,
            y: 20
        }, {
            y: 0,
            autoAlpha: 1,
            duration: 1.25,
            ease: "power1.out",
            stagger: 0.5,
            onComplete: () => {
                setHasAnimated(true);
            }
        });
    }
    // Check if the element is no longer intersecting and the animation has played
    else if (!entry.isIntersecting && hasAnimated && isScrollingUp) {
        // Reset properties to make elements invisible again if they go out of view while scrolling up
        gsap.to([frontEndStackRef.current, backEndStackRef.current, programsStackRef.current], {
            autoAlpha: 0,
            onComplete: () => {
                setHasAnimated(false);
            }
        });
    }

    lastScrollY = currentScrollY;  // Update lastScrollY at the end of the function
}

export default animateTechStack;