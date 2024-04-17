import React from "react";
import gsap from "gsap";

let lastScrollY = window.scrollY;  // Initialize lastScrollY at the top of your component

// Function to handle intersection changes
const handleHeadingIntersect = (
    entries: IntersectionObserverEntry[],
    titleBorderRef: React.RefObject<HTMLHeadingElement>,
    titleRef: React.RefObject<HTMLHeadingElement>,
    viewAllProjectsRef: React.RefObject<HTMLParagraphElement>,
    projectArticleRef: React.RefObject<HTMLDivElement>,
    hasAnimated: boolean,
    setHasAnimated: React.Dispatch<React.SetStateAction<boolean>>
) => {
    entries.forEach((entry) => {
        const currentScrollY = window.scrollY;
        const isScrollingUp = currentScrollY < lastScrollY;

        // Check if the element is intersecting the viewport and the animation hasn't played yet
        if (entry.isIntersecting && !hasAnimated) {
            gsap.set([titleBorderRef.current, titleRef.current, viewAllProjectsRef.current, projectArticleRef.current], { clearProps: "all" });
            // Play the animation using GSAP
            gsap.fromTo(titleBorderRef.current, {
                width: "0%",
                opacity: "0%"
            }, {
                width: "100%",
                opacity: "100%",
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

            // Play the animation using GSAP
            gsap.from(projectArticleRef.current, {
                opacity: 0,
                y: 64,
                duration: 2,
                ease: "ease"
            })
        } 
        // Check if the element is no longer intersecting and the animation has played
        else if (!entry.isIntersecting && hasAnimated && isScrollingUp) {
            setHasAnimated(false);
        }

        lastScrollY = currentScrollY;  // Update lastScrollY at the end of the function
    });
};


export {
    handleHeadingIntersect
 
}