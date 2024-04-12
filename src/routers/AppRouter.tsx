import { FC } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "../components/header/Header";
import HomePage from "../pages/HomePage";

const AppRouter: FC = () => {

    return (
        <BrowserRouter>
            <div className="bg-neutral-800 min-h-screen font-open-sans">
                <Header />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default AppRouter;