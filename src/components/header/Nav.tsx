import { FC } from "react"
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const Nav:FC = () => {
    const isMobile = useSelector((state: RootState) => state.isMobile.isMobile);

    const navItems: string[] = ["home", "projects", "about", "tech stack", "contact"];

    return (
        <div className="flex justify-center">
            <nav className={`absolute z-10 ${isMobile ? "bg-neutral-800 w-full bottom-0 px-2 py-4 border-t border-neutral-700 shadow-top-shadow" : "top-0 p-8"}`}>
                <ul className="flex justify-center gap-2 3xs:gap-4 2xs:gap-8 xs:gap-12 sm:gap-16 md:gap-6 lg:gap-16">
                    {navItems.map((item, idx) => (
                        <li key={idx}>
                            <a href={`#${(item === "tech stack") ? "tech-stack" : item}`} className="nav-link group">
                                <p className="nav-top-text">{`0${idx}`}</p>
                                <p className="nav-bottom-text"><span>//</span> {item.toUpperCase()}</p>
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    )
}

export default Nav;