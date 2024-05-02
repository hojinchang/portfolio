import { FC } from "react";

import { scrollOffset } from "../../global/globals";

const SecondaryNav:FC = () => {
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


    return (
        <nav className="fixed top-1/2 -translate-y-1/2 right-12 z-30">
            <ul className="flex flex-col gap-4 text-sm font-medium text-neutral-300">
                <li>
                    <a href="#home" onClick={ handleNav }>00</a>
                </li>
                <li>
                    <a href="#projects" onClick={ handleNav }>01</a>
                </li>
                <li>
                    <a href="#about" onClick={ handleNav }>02</a>
                </li>
                <li>
                    <a href="#tech-stack" onClick={ handleNav }>03</a>
                </li>
                <li>
                    <a href="#contact" onClick={ handleNav }>04</a>
                </li>
            </ul>
        </nav>
    )
}

export default SecondaryNav;