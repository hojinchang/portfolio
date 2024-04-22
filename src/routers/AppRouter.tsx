import { FC, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setIsMobile } from "../features/isMobile/isMobileSlice";

import DotCursor from "../components/DotCursor";
import HomePage from "../pages/HomePage";
import ProjectsPage from "../pages/ProjectsPage";
import ErrorPage from "../pages/ErrorPage";

const AppRouter: FC = () => {
    const dispatch = useDispatch();

    // Update the isMobile global state
    useEffect(() => {
        const handleResize = () => {
            const screenWidth = window.innerWidth;
            dispatch( setIsMobile(screenWidth < 768) );
        };

        handleResize();
        window.addEventListener('resize', handleResize); // Listen for resize events

        return () => {
            window.removeEventListener('resize', handleResize); // Clean up the event listener
        };

    }, [dispatch]);

    return (
        <BrowserRouter>
            <div className="relative bg-neutral-900 text-neutral-200 min-h-screen font-open-sans overflow-hidden">
                <DotCursor />
                <Routes>
                    <Route path="/" element={ <HomePage /> } />
                    <Route path="/projects" element={ <ProjectsPage /> } />
                    <Route path="*" element={ <ErrorPage /> } />
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default AppRouter;