import { FC } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import { RootState } from "../../store/store";

const Header: FC = () => {
    const isMobile = useSelector((state: RootState) => state.isMobile.isMobile);

    return (
        <div className={`relative`}>
            <header className={`fixed left-6 ${isMobile ? "top-6" : "top-10"}`}>
                <NavLink to="/" className="z-100">
                    <h1 className="text-3xl text-neutral-200 font-semibold"><span>{"< h "}</span><span className="animate-codeFlash">{"/>"}</span></h1>
                </NavLink>
            </header>
        </div>
    )
}

export default Header;