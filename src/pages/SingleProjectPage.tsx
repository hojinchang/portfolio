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

            {project &&
                <>
                    {/* Gradient backdrop */}
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
                        <div className="absolute left-0 right-0 top-0 h-full bg-gradient-to-b from-black via-black to-transparent opacity-60"></div>
                    </header>
                    <main className={ `px-4 ${ isMobile ? "pb-20" : "" }` }>
                        <section className="section-smaller">
                            <BackLink path="/projects" title="PROJECTS" />
                            <div className="flex flex-col gap-12">
                                <div>
                                    <p className="text-sm text-neutral-400 font-medium mb-6">PROJECT</p>
                                    <h1 className="text-[2.125rem] font-semibold lg:text-[2.625rem] leading-none mb-4">{ project?.title.rendered }</h1>
                                    <p>{ project.acf.sub_title }</p>
                                </div>
                                <div>
                                    <p className="text-sm text-neutral-400 font-medium mb-6">VIEW PROJECT</p>
                                    <div className="flex gap-8">
                                        <p>
                                            <a className="link-button" href={ project.acf.live_site_link } target="_blank">
                                                LIVE SITE
                                            </a>
                                        </p>
                                        <p >
                                            <a className="link-button" href={ project.acf.github_repo_link } target="_blank">
                                                GITHUB
                                            </a>
                                        </p>
                                    </div>
                                </div>
                            </div>

                        </section>
                    </main>
                </>
            }
            <Footer />
        </>
    )
}

export default SingleProjectPage;