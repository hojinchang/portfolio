import { FC } from "react";


const SecondaryNav:FC = () => {
    const handleNav = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        const targetId = e.currentTarget.getAttribute("href");
        if (targetId) {
            const targetElement = document.querySelector(targetId);

            console.log(targetId);
            console.log(targetElement);

            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' }); // Smoothly scroll to the element
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