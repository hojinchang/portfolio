import { FC } from "react"
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";


import NavItem from "./NavItem";

const Nav:FC = () => {
    const isMobile = useSelector((state: RootState) => state.isMobile.isMobile);

    const navItems: string[] = ["home", "projects", "about", "tech stack", "contact"];

    return (
        <div className="flex justify-center">
            <nav className={`w-full z-10 ${isMobile ? "fixed w-full bottom-0 px-2 py-4 bg-neutral-900 border-t border-neutral-700 shadow-top-shadow" : "absolute top-0 px-8 pt-8"}`}>
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