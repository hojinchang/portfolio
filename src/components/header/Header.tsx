import { FC } from "react";

import Nav from "./Nav";

const Header: FC = () => {

    return (
        <div className="flex items-center fixed left-0 right-0 top-0 p-6 bg-neutral-800">
            <header className="relative w-full">
                <h1 className="text-3xl text-neutral-200 font-semibold"><span>{"< h "}</span><span>{"/>"}</span></h1>
                <Nav />
            </header>
        </div>
    )
}

export default Header;