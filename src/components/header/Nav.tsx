import { FC } from "react"
import { useSelector } from "react-redux";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { RootState } from "../../store/store";
import NavItem from "./NavItem";

const Nav:FC = () => {
    const isMobile = useSelector((state: RootState) => state.isMobile.isMobile);

    const navItems: string[] = ["home", "projects", "about", "tech stack", "contact"];
    
    useGSAP(() => {
        gsap.from(".nav", {
            opacity: 0,
            y: -20,
            duration: 1,
            ease: "ease"
        })
    });

    return (
        <div className="flex justify-center">
            <nav className={`nav mx-auto w-content z-10 ${isMobile ? "fixed left-0 right-0 bottom-0 px-2 py-4 bg-neutral-900 border-t border-neutral-700 shadow-top-shadow" : "absolute top-0 px-8 pt-6"}`}>
                <ul className="flex justify-center gap-2 3xs:gap-4 2xs:gap-8 xs:gap-12 sm:gap-16 md:gap-6 lg:gap-16">
                    {navItems.map((item, idx) => (
                        <NavItem key={idx} idx={idx} item={item}/>
                    ))}
                </ul>
            </nav>
        </div>
    )
}

export default Nav;