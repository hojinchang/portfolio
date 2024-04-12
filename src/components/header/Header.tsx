import { FC } from "react";

import Nav from "./Nav";

const Header: FC = () => {

    return (
        <div className="flex items-center h-30 p-6">
            <header className="relative w-full">
                <h1 className="text-3xl text-neutral-200 font-semibold absolute top-1/2 transform -translate-y-1/2"><span>{"< h "}</span><span>{"/>"}</span></h1>
                <Nav />
            </header>
        </div>
    )
}

export default Header;