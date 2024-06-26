import React, { FC, useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import axios from "axios";
import gsap from "gsap";

import Header from "../components/header/Header";
import ProjectArticle from "../components/project_articles/ProjectArticle";
import Loading from "../components/Loading";
import Footer from "../components/Footer";
import BackLink from "../components/BackLink";

import { appTitle } from "../global/globals";
import { RootState } from "../store/store";
import { ProjectInterface } from "../interfaces/interfaces";
import { projectsAPIPath } from "../global/wpAPIPath";


const ProjectsPage: FC = () => {
    const navigate = useNavigate();

    const isMobile = useSelector(( state: RootState ) => state.isMobile.isMobile);
    const [loading, setLoading] = useState<boolean>(true);
    const [dataFetched, setDataFetched] = useState<boolean>(false);

    const [projects, setProjects] = useState<ProjectInterface[]>([]);

    // References for GSAP animation
    const titleRef = useRef<HTMLHeadingElement>(null);
    const descriptionRef = useRef<HTMLParagraphElement>(null);
    const projectRefs = useRef<Array<React.RefObject<HTMLDivElement>>>([]);

    // Set the title of the page
    useEffect(() => {
        document.title = `${appTitle} - Projects`;
    }, []);

    // Scroll to the top of the page when the page mounts
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Fetch the projects
    useEffect(() => {
        const fetchProjects = async() => {
            try {
                const response = await axios.get(projectsAPIPath);
                if (response.data && response.data.length > 0) {
                    setProjects(response.data);
                    // Create references to each of the projects. These references will be used for the GSAP animation
                    projectRefs.current = response.data.map(() => React.createRef<HTMLDivElement>());
                } else {
                    // Projects not found, navigate to 404 page
                    navigate('/404');
                }

                setDataFetched(true);
            } catch(err) {
                console.error("Error fetching projects:", err);
                setLoading(false);
            }
        }
        fetchProjects();
    }, []);

    useEffect(() => {
        // Ensure loading stays true for at least 1500ms on fast networks
        const timer = setTimeout(() => {
            if (dataFetched) {
                setLoading(false);
            }
        }, 1500);
        return () => clearTimeout(timer);
    }, [dataFetched]);

    // Apply animation after loading is completed
    useEffect(() => {
        if (!loading && projects.length) {
            gsap.from(titleRef.current, {
                opacity: 0,
                y: -20,
                duration: 1,
                ease: "power1.inOut"
            });
    
            gsap.from(descriptionRef.current, {
                opacity: 0,
                y: 20,
                duration: 1,
                ease: "power1.inOut"
            });

            gsap.from(projectRefs.current.map(ref => ref.current), {
                opacity: 0,
                y: 30,
                stagger: 0.3,
                duration: 1,
                ease: "power1.out"
            });
        }
        
    }, [loading, projects.length]); 

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
            <Helmet>
                <meta name="description" content="Explore a showcase of my projects, including Full-Stack and Front-End Development. Get inspired by innovative solutions and creative implementations." />
            </Helmet>
            <Header />
            <main className={ `main ${ isMobile ? "pb-20" : "" }` }>
                <section className="max-w-[1280px] mx-auto mt-28 mb-16">
                    <BackLink path="/" title="HOME" />
                    <h1 ref={ titleRef } className="font-bold text-center mt-8 mb-12 text-5xl 2xs:text-6xl sm:text-7xl lg:text-8xl xl:text-9xl">PROJECTS</h1>
                    <p ref={ descriptionRef } className="text-center text-neutral-400">Here is a showcase of all of my projects.</p>
                </section>
                <section className="max-w-5xl mx-auto">
                    <div className="mx-auto grid gap-4 grid-cols-1 max-w-[400px] sm:max-w-none sm:grid-cols-2 lg:grid-cols-3">
                        {projects.length > 0 ? (
                            projects.map(( project, idx ) => (
                                <div ref={ projectRefs.current[idx]} key={ project.id }>
                                    <ProjectArticle project={ project } />
                                </div>
                            ))) : (
                                <h2 className="font-bold text-center text-2xl">NO PROJECTS FOUND</h2>
                            )
                    }
                    </div>
                </section>
            </main>
            <Footer />
        </>
    )
}

export default ProjectsPage;