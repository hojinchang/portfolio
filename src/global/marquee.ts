
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// Hero text animation
const marqueeAnimation = () => {
    
    function debounce(func: Function) {
        let timer: number | undefined;

        return function (event: Event) {
            if (timer) clearTimeout(timer);
            timer = setTimeout(() => {
                func();
            }, 500, event) as any; // Casting to any to satisfy the types
        };
    }

    useGSAP(() => {
        // Get the marquee and marqueeContent
        const marquee = document.querySelector(".marquee");
        const marqueeContent = marquee?.firstChild as HTMLElement;     
        
        if (marquee && marqueeContent) {
            // Close the marquee content
            const marqueeContentClone = marqueeContent?.cloneNode(true);
            marquee.append(marqueeContentClone);
            
            let tween: gsap.core.Tween;
            const playMarquee = () => {
                let progress = tween ? tween.progress() : 0;
                tween && tween.progress(0).kill();
        
                const width = parseInt(getComputedStyle(marqueeContent).getPropertyValue("width"), 10);
                const gap = parseInt(getComputedStyle(marqueeContent).getPropertyValue("column-gap"), 10);
        
                const distanceToTranslate = -1 * (gap + width);
        
                // Animate the marquee scrolling
                tween = gsap.fromTo(
                    marquee.children,
                    {x: 0},
                    {x: distanceToTranslate, duration: 5, ease: "none", repeat: -1}
                );
        
                tween.progress(progress);
            }
        
            // Animate the fade in
            gsap.from(".marquee-letter", {
                opacity: 0,
                y: 150,
                stagger: 0.1,
                duration: 0.75,
                // Animate the marquee scrolling
                onComplete: playMarquee
            });
        
            window.addEventListener("resize", debounce(playMarquee));
        }
    });
}

export default marqueeAnimation;