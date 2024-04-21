import { FC } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import DotCursor from "../components/DotCursor";
import Header from "../components/header/Header";
import HomePage from "../pages/HomePage";
import Footer from "../components/footer";

const AppRouter: FC = () => {

    return (
        <BrowserRouter>
            <div className="relative bg-neutral-900 text-neutral-200 min-h-screen font-open-sans overflow-hidden">
                <DotCursor />
                <Header />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                </Routes>
                <Footer />
            </div>
        </BrowserRouter>
    )
}

export default AppRouter;