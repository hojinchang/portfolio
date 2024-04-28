import { FC, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";

import Header from "../components/header/Header";
import Loading from "../components/Loading";
import Footer from "../components/Footer";
import BackLink from "../components/BackLink";

import { RootState } from "../store/store";
import FeaturedImage from "../components/project_articles/FeaturedImage";
import { projectsAPIPath, techStackAPIPath } from "../global/wpAPIPath";
import { ProjectInterface, TechStackInterface } from "../interfaces/interfaces";
import { useMarqueeAnimation } from "../hooks/useMarquee";
import { decodeHTMLEntities } from "../global/globals";

import { Roles } from "../interfaces/interfaces";

const SingleProjectPage:FC = () => {
    // Get project slug from query string
    const { projectName } = useParams<string>();
    const isMobile = useSelector(( state: RootState ) => state.isMobile.isMobile );
    const [loading, setLoading] = useState<boolean>(true);

    const [project, setProject] = useState<ProjectInterface | null>(null);
    const [teckStack, setTeckStack] = useState<TechStackInterface[]>([]);

    const marqueeRef = useMarqueeAnimation(!loading && project);

    // // Scroll to the top of the page when the page mounts
    // useEffect(() => {
    //     window.scrollTo(0, 0);
    // }, []);

    //  Reorder the tech stack response data in specified order
    const reorderTechStack = (techStackData: TechStackInterface[], orderIds: number[]) => {
        const techStackMap = new Map(techStackData.map(item => [item.id, item]));
        return orderIds.map(id => techStackMap.get(id)).filter(item => item !== undefined) as TechStackInterface[];
    };

    // Fetch the project
    useEffect(() => {
        const fetchProject = async() => {
            try {
                // Get the project
                const response = await axios.get(projectsAPIPath + `&slug=${projectName}`);
                if (response.data && response.data.length > 0) {
                    // Santize title to escape special characters
                    const data = response.data[0];
                    data.title.rendered = decodeHTMLEntities(data.title.rendered);

                    // Get the tech stack cpt
                    const techStackIds = data.acf.tech_stack;
                    const techStackResponse = await axios.get(techStackAPIPath + `&include=${techStackIds.join(",")}`);
                    if (techStackResponse.data) {
                        const orderedTechStack = reorderTechStack(techStackResponse.data, techStackIds);
                        setTeckStack(orderedTechStack);
                    }

                    setProject(data);
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
                    <main className={ `px-4 xs:px-8 ${ isMobile ? "pb-20" : "" }` }>
                        <section className="section-smaller">
                            <BackLink path="/projects" title="PROJECTS" />
                            <div className="flex flex-col gap-12 md:flex-row md:justify-between">
                                <div>
                                    <p className="text-sm text-neutral-400 font-medium mb-6">PROJECT</p>
                                    <h1 className="text-[2.125rem] font-semibold lg:text-[2.625rem] leading-tight mb-4">{ project.title.rendered }</h1>
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
                            <div className="mt-10 max-w-[750px] mx-auto">
                                <figure>
                                    <FeaturedImage featuredImageObject={ project._embedded["wp:featuredmedia"][0] } />
                                </figure>
                            </div>
                            <div className="flex flex-col gap-12 md:flex-row md:justify-between md:gap-2">
                                <div className="md:w-[70%]">
                                    <h2 className="font-semibold text-xl mb-3">OVERVIEW</h2>
                                    <p className="leading-relaxed">{ project.acf.overview }</p>
                                </div>
                                <div>
                                    <h2 className="font-semibold text-xl mb-3">ROLE</h2>
                                    <ul className="flex flex-col gap-2">
                                        {( project._embedded["wp:term"][0].length > 0 ) ? (
                                            project._embedded["wp:term"][0].map((role: Roles) => (
                                                <li key={ role.name } className="underline">{ role.name }</li>
                                            ))) : (
                                                <li>NO ROLES FOUND</li>
                                            )
                                        }
                                    </ul>
                                </div>
                            </div>
                            <div>
                                <h2 className="font-semibold text-xl mb-5">TECH STACK</h2>
                                <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                                    {( teckStack.length > 0 ) ? (
                                        teckStack.map(( stack ) => (
                                            <article key={ stack.id } className="flex gap-4 items-center w-full max-w-[18rem] xs:max-w-none bg-neutral-800 p-3 rounded-md shadow-all-shadow">
                                                <div>
                                                    <img className="block w-10 h-10" src={ stack._embedded["wp:featuredmedia"][0].source_url } alt={ stack._embedded["wp:featuredmedia"][0].alt_text }/>
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-sm md:text-base">{ stack.title.rendered }</p>
                                                    <div className="text-xs md:text-sm text-neutral-400" dangerouslySetInnerHTML={{ __html: stack.content.rendered }}></div>
                                                </div>
                                            </article>
                                        ))
                                    ) : (
                                        <p>NO TECH STACK FOUND</p>
                                    )}
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