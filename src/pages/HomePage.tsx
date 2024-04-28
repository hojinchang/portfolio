import { FC } from "react";
import { useSelector } from "react-redux";

import { RootState } from "../store/store";

import Header from "../components/header/Header";
import HomeSection from "../sections/HomeSection";
import ProjectSection from "../sections/ProjectSection";
import AboutSection from "../sections/AboutSection";
import TechStackSection from "../sections/TechStackSection";
import Footer from "../components/Footer";

const HomePage: FC = () => {
    const isMobile = useSelector(( state: RootState ) => state.isMobile.isMobile);

    return (
        <>
            <Header />
            <main className={ `flex flex-col gap-40 px-4 xs:px-8 ${ isMobile ? "pb-20" : "" }` }>
                <HomeSection />
                <ProjectSection />
                <AboutSection />
                <TechStackSection />
            </main>
            <Footer />
        </>
    )
}

export default HomePage;