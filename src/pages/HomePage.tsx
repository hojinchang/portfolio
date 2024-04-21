import { FC } from "react";
import { useSelector } from "react-redux";

import { RootState } from "../store/store";

import HomeSection from "../sections/HomeSection";
import ProjectSection from "../sections/ProjectSection";
import AboutSection from "../sections/AboutSection";
import TechStackSection from "../sections/TechStackSection";

const HomePage: FC = () => {
    const isMobile = useSelector(( state: RootState ) => state.isMobile.isMobile);

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