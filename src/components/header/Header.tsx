import { FC } from "react";
import { useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";

import { RootState } from "../../store/store";
import Nav from "./Nav";


const Header: FC = () => {
    const isMobile = useSelector((state: RootState) => state.isMobile.isMobile);
    const location = useLocation();

    const isHomePage = location.pathname === "/";

    return (
        <header 
            className={
                `absolute top-0 left-0 right-0 z-10 pl-6 pb-6 
                ${isMobile 
                    ? "pt-6" 
                    : `pt-10 ${isHomePage && "bg-neutral-900 border-b border-neutral-700 shadow-bot-shadow"}`
                }`
            }
        >
            <NavLink to="/" className="logo z-10 group">
                <p className="inline text-3xl font-semibold text-neutral-200 transition duration-300 lg:group-hover:text-neutral-500"><span>{"< h "}</span><span className="animate-codeFlash">{"/>"}</span></p>
            </NavLink>
            { isHomePage && <Nav /> }
        </header>
    )
}

export default Header;