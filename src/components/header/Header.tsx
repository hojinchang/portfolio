import { FC } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import { RootState } from "../../store/store";

const Header: FC = () => {
    const isMobile = useSelector((state: RootState) => state.isMobile.isMobile);

    return (
        <div className={`relative flex bg-neutral-800 z-100 ${isMobile ? "p-6" : "px-6 pt-10 pb-5"}`}>
            <header className="w-full">
                <NavLink to="/">
                    <h1 className="text-3xl text-neutral-200 font-semibold"><span>{"< h "}</span><span>{"/>"}</span></h1>
                </NavLink>
            </header>
        </div>
    )
}

export default Header;