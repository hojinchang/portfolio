import { FC } from "react";
import { NavLink } from "react-router-dom";

const Header: FC = () => {

    return (
        <div className="relative flex p-6 bg-neutral-800 z-100">
            <header className="w-full">
                <NavLink to="/">
                    <h1 className="text-3xl text-neutral-200 font-semibold"><span>{"< h "}</span><span>{"/>"}</span></h1>
                </NavLink>
            </header>
        </div>
    )
}

export default Header;