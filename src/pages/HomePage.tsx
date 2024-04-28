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
            <main className={ `main ${ isMobile ? "pb-20" : "" }` }>
                <HomeSection />
                <div className="flex flex-col gap-[10rem] md:gap-[20rem]">
                    <ProjectSection />
                    <AboutSection />
                    <TechStackSection />
                </div>
            </main>
            <Footer />
        </>
    )
}

export default HomePage;