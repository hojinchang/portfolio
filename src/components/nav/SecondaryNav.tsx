import { FC, useEffect } from "react";

import { scrollOffset } from "../../global/globals";

const SecondaryNav:FC = () => {

    useEffect(() => {
        // Position the absolutely positioned secondary nav such that it is always at the edge of 1920px max-width
        const updateNavPosition = () => {
            const screenWidth = window.innerWidth;
            const contentWidth = 1920;
            const navElement = document.getElementById('secondary-nav');
    
            if (!navElement) return;
    
            if (screenWidth > contentWidth) {
                const rightOffset = (screenWidth - contentWidth) / 2;
                navElement.style.right = `${rightOffset}px`;
            } else {
                navElement.style.right = "34px"; // Reset to default position when screen is smaller
            }
        };
    
        updateNavPosition();
        window.addEventListener('resize', updateNavPosition);
    
        return () => {
            window.removeEventListener('resize', updateNavPosition);
        };
    }, []);
    

    const handleNav = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        const sectionId = e.currentTarget.getAttribute("href");
        if (sectionId) {
            const section = document.querySelector(sectionId) as HTMLElement;

            if (section) {
                const sectionTop = section.offsetTop;
                const scrollToPosition = sectionTop - scrollOffset;
                // Scroll to that section with some offset
                window.scrollTo({
                    top: scrollToPosition,
                    behavior: "smooth"
                });
            }
        }
    } 

    useEffect(() => {
        const handleScroll = () => {
            // Initialize the sections
            const sections = ["home", "projects", "about", "tech-stack", "contact"];
            
            // Get the secondary nav and anchor tags
            const navElement = document.getElementById("secondary-nav");
            const navLinks = navElement?.querySelectorAll("a");
            // Include padding to scroll position
            const paddingOffset = 300;
            // Current scroll position
            const scrollPosition = window.scrollY + scrollOffset + paddingOffset;
            // Check if user is near the bottom of the page
            const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;

            if (!navElement || !navLinks) {
                return;
            }

            sections.forEach((section, idx) => {
                const sectionElement = document.getElementById(section);

                if (!sectionElement) {
                    return;
                }

                /*
                    sectionElement.offsetTop - the vertical distance from the top of the document to the top of the section
                    (sectionElement.offsetTop <= scrollPosition) - check if the top of the section has scrolled past the scrollPosition
                    (sectionElement.offsetTop + sectionElement.offsetHeight > scrollPosition) - check if the bottom of the section is still below the adjusted scroll position (section is still on the screen)
                */
                if ( ((sectionElement.offsetTop <= scrollPosition) && (sectionElement.offsetTop + sectionElement.offsetHeight > scrollPosition)) 
                    || ( section === 'contact' && nearBottom )
                ) {
                    // Calculate the top position of the active link for the highlighter
                    let activeLinkTop = navLinks[idx].offsetTop;
                    let activeLinkHeight = navLinks[idx].offsetHeight;

                    // Set the top position and height of the highlighter
                    navElement.style.setProperty("--highlighter-top", `${activeLinkTop}px`);
                    navElement.style.setProperty("--highlighter-height", `${activeLinkHeight}px`);
                }
            });
        };

        handleScroll(); // Trigger once on mount to set initial state

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);


    return (
        <nav id="secondary-nav" className="fixed top-1/2 -translate-y-1/2 right-[34px] z-30">
            <ul className="flex flex-col text-sm font-medium text-neutral-300">
                <li>
                    <a href="#home" className="block p-3" onClick={ handleNav }>00</a>
                </li>
                <li>
                    <a href="#projects" className="block p-3" onClick={ handleNav }>01</a>
                </li>
                <li>
                    <a href="#about" className="block p-3" onClick={ handleNav }>02</a>
                </li>
                <li>
                    <a href="#tech-stack" className="block p-3" onClick={ handleNav }>03</a>
                </li>
                <li>
                    <a href="#contact" className="block p-3" onClick={ handleNav }>04</a>
                </li>
            </ul>
        </nav>
    )
}

export default SecondaryNav;