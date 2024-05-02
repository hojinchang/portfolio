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