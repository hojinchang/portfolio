import { FC } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import { RootState } from "../../store/store";

const Header: FC = () => {
    const isMobile = useSelector((state: RootState) => state.isMobile.isMobile);

    return (
        <div className={`relative`}>
            <header className={`absolute top-0 left-0 right-0 z-10 pl-6 pb-6 ${isMobile ? "pt-6" : "pt-10 bg-neutral-900 border-b border-neutral-700 shadow-bot-shadow"}`}>
                <NavLink to="/" className="z-100">
                    <p className="text-3xl text-neutral-200 font-semibold"><span>{"< h "}</span><span className="animate-codeFlash">{"/>"}</span></p>
                </NavLink>
            </header>
        </div>
    )
}

export default Header;