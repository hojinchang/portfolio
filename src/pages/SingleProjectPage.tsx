import { FC, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";

import Header from "../components/header/Header";
import Loading from "../components/Loading";
import Footer from "../components/Footer";
import BackLink from "../components/BackLink";

import { RootState } from "../store/store";
import { projectsAPIPath } from "../global/wpAPIPath";
import { ProjectInterface } from "../interfaces/interfaces";
import { useMarqueeAnimation } from "../hooks/useMarquee";


const SingleProjectPage:FC = () => {
    // Get project slug from query string
    const { projectName } = useParams<string>();
    const isMobile = useSelector(( state: RootState ) => state.isMobile.isMobile );
    const [loading, setLoading] = useState<boolean>(true);

    const [project, setProject] = useState<ProjectInterface | null>(null);

    const marqueeRef = useMarqueeAnimation(!loading && project);

    // Scroll to the top of the page when the page mounts
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);


    // Fetch the project
    useEffect(() => {
        const fetchProject = async() => {
            try {
                const response = await axios.get(projectsAPIPath + `&slug=${projectName}`);
                if (response.data && response.data.length > 0) {
                    setProject(response.data[0]);
                }
            } catch(err) {
                console.error("Error fetching projects:", err);
                setLoading(false);
            }
        }

        fetchProject();

        // Set loading timer
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1500);

        return () => clearTimeout(timer);
    }, [projectName]);

    // Show loading animation
    if (loading) {
        return (
            <main>
                <Loading />
            </main>
        )
    }
    
    return (
        <>
            <Header />
            <main className={ `${ isMobile ? "pb-20" : "" }` }>
                <header className="pt-[5rem] pb-[3rem] relative">
                    <div ref={ marqueeRef } className="marquee flex gap-[10rem] md:gap-[16rem] lg:gap-[20rem] ">
                        <div className="marquee-content flex gap-[10rem] md:gap-[16rem] lg:gap-[20rem] ">
                            <div className="name-marquee w-full">
                                {project && project.title.rendered.split('').map((letter, index) => (
                                    <span key={ index } className={ `marquee-letter inline-block ${letter === " " ? "mx-2 sm:mx-3 md:mx-4 lg:mx-5 xl:mx-6" : ""}` }>{ letter }</span>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-transparent opacity-60"></div>
                </header>
                <section className="section-smaller">
                    <BackLink path="/projects" title="PROJECTS" />
                </section>
            </main>
            <Footer />
        </>
    )
}

export default SingleProjectPage;