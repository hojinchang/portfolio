import React from "react";
import gsap from "gsap";

let lastScrollY = window.scrollY;  // Initialize lastScrollY at the top of your component

const animateHeadingIntersect = (
    entries: IntersectionObserverEntry[],
    titleBorderRef: React.RefObject<HTMLHeadingElement>,
    titleRef: React.RefObject<HTMLHeadingElement>,
    viewAllProjectsRef: React.RefObject<HTMLParagraphElement> | null,
    contentWrapperRef: React.RefObject<HTMLDivElement> | null,
    hasAnimated: boolean,
    setHasAnimated: React.Dispatch<React.SetStateAction<boolean>>
) => {
    entries.forEach((entry) => {
        const currentScrollY = window.scrollY;
        const isScrollingUp = currentScrollY < lastScrollY;

        if (entry.isIntersecting && !hasAnimated) {
            // Set initial properties
            gsap.set([titleBorderRef.current, titleRef.current, viewAllProjectsRef?.current, contentWrapperRef?.current], {
                autoAlpha: 0  // This handles both opacity and visibility
            });

            // Animate elements into view
            gsap.fromTo(titleBorderRef.current, {
                autoAlpha: 0,
                width: "0%",
            }, {
                autoAlpha: 1,
                width: "100%",
                duration: 1.75,
                ease: "power1.out",
                onComplete: () => {
                    setHasAnimated(true);
                }
            });

            gsap.fromTo(titleRef.current, {
                x: -40,
                autoAlpha: 0
            }, {
                x: 0,
                autoAlpha: 1,
                duration: 2,
                ease: "power1.out"
            });

            // Animate view all projects link and content wrapper
            if (viewAllProjectsRef) {
                gsap.fromTo(viewAllProjectsRef.current, {
                    x: 40,
                    autoAlpha: 0
                }, {
                    x: 0,
                    autoAlpha: 1,
                    duration: 2,
                    ease: "power1.out"
                });
            }

            if (contentWrapperRef) {
                gsap.fromTo(contentWrapperRef.current, {
                    y: 40,
                    autoAlpha: 0
                }, {
                    y: 0,
                    autoAlpha: 1,
                    duration: 2,
                    ease: "power1.out"
                });
            }
        } else if (!entry.isIntersecting && hasAnimated && isScrollingUp) {
            // Reset properties to make elements invisible again if they go out of view while scrolling up
            gsap.to([titleBorderRef.current, titleRef.current, viewAllProjectsRef?.current, contentWrapperRef?.current], {
                autoAlpha: 0,
                onComplete: () => {
                    setHasAnimated(false);
                }
            });
        }

        lastScrollY = currentScrollY;  // Update lastScrollY at the end of the function
    });
};

export default animateHeadingIntersect;
