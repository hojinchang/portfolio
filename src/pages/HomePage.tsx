import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setIsMobile } from "../features/isMobile/isMobileSlice";
import { RootState } from "../store/store";

import HomeSection from "../sections/HomeSection";
import ProjectSection from "../sections/ProjectSection";
import AboutSection from "../sections/AboutSection";
import TechStackSection from "../sections/TechStackSection";

const HomePage: FC = () => {
    const isMobile = useSelector(( state: RootState ) => state.isMobile.isMobile);
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
        <main className={ `flex flex-col gap-40 px-4 ${ isMobile ? "pb-20" : "" }` }>
            <HomeSection />
            <ProjectSection />
            <AboutSection />
            <TechStackSection />
        </main>
    )
}

export default HomePage;