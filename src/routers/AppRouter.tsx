import { FC } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import DotCursor from "../components/DotCursor";
import Header from "../components/header/Header";
import Nav from "../components/header/Nav";
import HomePage from "../pages/HomePage";

const AppRouter: FC = () => {

    return (
        <BrowserRouter>
            <div className="relative bg-neutral-900 text-neutral-200 min-h-screen font-open-sans overflow-hidden">
                <DotCursor />
                <Header />
                <Nav />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default AppRouter;