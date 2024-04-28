
import { useEffect, useRef } from 'react';
import gsap from 'gsap';


export const useMarqueeAnimation = (dependency?: any) => {
    const marqueeRef = useRef<HTMLDivElement>(null);

    function debounce(func: Function) {
        let timer: number | undefined;

        return function (event: Event) {
            if (timer) clearTimeout(timer);
            // timer = setTimeout(event, 500) as any; // Casting to any to satisfy the types
            timer = setTimeout(() => {
                func();
            }, 500, event) as any; // Casting to any to satisfy the types
        };
    }

    useEffect(() => {
        if (!dependency || !marqueeRef.current) {
            return;
        }
        
        // Get the marquee container
        const marquee = marqueeRef.current;
        // Get the marquee content
        const marqueeContent = marquee.firstChild as HTMLDivElement;
        
        if (marquee && marqueeContent) {
            
            const fillMarquee = () => {
                // Always append two child nodes initially
                marquee.appendChild(marqueeContent.cloneNode(true));
                marquee.appendChild(marqueeContent.cloneNode(true));
            
                // Check if more child nodes are needed and append them if necessary
                while (marquee.scrollWidth <= window.innerWidth * 2) {
                    marquee.appendChild(marqueeContent.cloneNode(true));
                }
            };

            fillMarquee();

            // Ensure the component updates with the new children before calculating styles
            let tween: gsap.core.Tween;
            const playMarquee = () => {    
                
                const width = marqueeContent.offsetWidth;
                const gap = parseInt(getComputedStyle(marqueeContent).getPropertyValue("column-gap"), 10);
                const distanceToTranslate = -1 * (gap + width);
        
                // Animate the marquee scrolling
                tween = gsap.fromTo(
                    marquee.children,
                    { x: 0 },
                    { x: distanceToTranslate, duration: 10, ease: "none", repeat: -1 }
                );
            }
    
            gsap.fromTo(".marquee-letter", {
                opacity: 0,
                y: 150,
            }, {
                opacity: 1,
                y: 0,
                stagger: 0.1,
                duration: 1
            });

            // Start playMarquee horizontal scroll animation after 2.5 seconds delay
            gsap.delayedCall(2.5, playMarquee);
                  
            const debouncedPlayMarquee = debounce(playMarquee);
            window.addEventListener("resize", debouncedPlayMarquee);
            return () => {
                window.removeEventListener("resize", debouncedPlayMarquee);
                if (tween) tween.kill();
            };
        }
    }, [dependency]); // Effect runs on dependency change
    
    return marqueeRef;
};

