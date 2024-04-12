import { FC, useEffect } from "react";
import { useDispatch } from "react-redux";

import { setIsMobile } from "../features/isMobile/isMobileSlice";
import HomeSection from "../sections/HomeSection";

const HomePage: FC = () => {

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
        <main>
            <HomeSection />
        </main>
    )
}

export default HomePage;