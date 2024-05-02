import { FC, useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import axios from "axios";

import Header from "../components/header/Header";
import Loading from "../components/Loading";
import Footer from "../components/Footer";
import BackLink from "../components/BackLink";
import ProjectInfoTabs from "../components/project_info_tabs/ProjectInfoTabs";
import FeaturedImage from "../components/project_articles/FeaturedImage";

import { RootState } from "../store/store";
import { projectsAPIPath, techStackAPIPath, additionalProjectsAPIPath } from "../global/wpAPIPath";
import { Roles, ProjectInterface, TechStackInterface } from "../interfaces/interfaces";
import { useMarqueeAnimation } from "../hooks/useMarquee";
import { decodeHTMLEntities } from "../global/utilityFunctions";
import animateSectionEntry from "../global/gsap_animations/animateSectionEntry";
import MoreProjectsCarousel from "../components/MoreProjectsCarousel";


const SingleProjectPage:FC = () => {
    const navigate = useNavigate();

    // Get project slug from query string
    const { projectName } = useParams<string>();
    const isMobile = useSelector(( state: RootState ) => state.isMobile.isMobile );
    const [loading, setLoading] = useState<boolean>(true);
    const [dataFetched, setDataFetched] = useState<boolean>(false);

    // Data from WP backend
    const [project, setProject] = useState<ProjectInterface | null>(null);
    const [teckStack, setTeckStack] = useState<TechStackInterface[]>([]);
    const [additionalProjects, setAdditionalProjects] = useState<ProjectInterface[]>([]);

    // References for GSAP animation
    const marqueeRef = useMarqueeAnimation(!loading && project && project.title.rendered);

    const sectionHeadingRef = useRef<HTMLElement>(null);
    const sectionFeaturedImageRef = useRef<HTMLElement>(null);
    const sectionOverviewRef = useRef<HTMLElement>(null);
    const sectionTechStackRef = useRef<HTMLElement>(null);
    const sectionDetailsRef = useRef<HTMLElement>(null);
    const sectionMoreProjects = useRef<HTMLElement>(null);

    // Scroll to the top of the page when the page mounts
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [project]);

    //  Reorder the tech stack response data in specified order
    const reorderTechStack = (techStackData: TechStackInterface[], orderIds: number[]) => {
        const techStackMap = new Map(techStackData.map(item => [item.id, item]));
        return orderIds.map(id => techStackMap.get(id)).filter(item => item !== undefined) as TechStackInterface[];
    };

    // GSAP animation observers
    const observeSection = (sectionRef: React.RefObject<HTMLElement>) => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    animateSectionEntry(sectionRef);
                    observer.unobserve(entry.target);  // Optionally stop observing after animation
                }
            });
        }, {
            root: null,
            rootMargin: "0px",
            threshold: 0.1
        });
    
        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }
    
        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    };

    // Fetch the project
    useEffect(() => {
        // Fetch all project IDs
        const fetchAllProjectIds = async () => {
            try {
                const response = await axios.get(projectsAPIPath);
                return response.data.map(( project: ProjectInterface ) => project.id);
            } catch(err) {
                console.error("Error fetching all project IDs:", err);
            }
        };

        // Fetch projects for MORE PROJECTS section
        const fetchAdditionalProjects = async(excludeId: number) => {
            try {
                // Fetch all project IDs
                const allIds = await fetchAllProjectIds();

                // Filter out the excluded ID and randomly select 4 IDs
                const selectedIds = allIds.filter(( id: number ) => id !== excludeId)
                                        .sort(() => 0.5 - Math.random())
                                        .slice(0, 4);

                // Fetch the selected projects
                const response = await axios.get(additionalProjectsAPIPath + `&include=${selectedIds.join(',')}`);
                
                setAdditionalProjects(response.data);
            } catch(err) {
                console.error("Error fetching additional projects:", err);
            }
        }

        // Fetch the specific project and projects for MORE PROJECTS section
        const fetchProject = async() => {
            try {
                setLoading(true);
                // Get the project
                const response = await axios.get(projectsAPIPath + `&slug=${projectName}`);
                if (response.data && response.data.length > 0) {
                    // Santize title to escape special characters
                    const data = response.data[0];
                    data.title.rendered = decodeHTMLEntities(data.title.rendered);
                    
                    // Set the title of the page
                    document.title = `Project - ${data.title.rendered}`;

                    // Get the tech stack cpt
                    const techStackIds = data.acf.tech_stack;
                    // Fetch the tech stack cpt
                    const techStackResponse = await axios.get(techStackAPIPath + `&include=${techStackIds.join(",")}`);
                    
                    // Order the tech stack in the original order. Fetching fetches the cpt in random order
                    if (techStackResponse.data) {
                        const orderedTechStack = reorderTechStack(techStackResponse.data, techStackIds);
                        setTeckStack(orderedTechStack);
                    }

                    // Fetch projects for MORE PROJECTS section
                    fetchAdditionalProjects(data.id);
                    setProject(data);
                } else {
                    // Project not found, navigate to 404 page
                    navigate('/404');
                }
                
                setDataFetched(true);
            } catch(err) {
                console.error("Error fetching projects:", err);
                setLoading(false);
            }
        }

        fetchProject();
    }, [projectName]);

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
        if (!loading && project) {
            const headingCleanup = observeSection(sectionHeadingRef);
            const imageCleanup = observeSection(sectionFeaturedImageRef);
            const overviewCleanup = observeSection(sectionOverviewRef);
            const techStackCleanup = observeSection(sectionTechStackRef);
            const detailsCleanup = observeSection(sectionDetailsRef);
            const moreProjectsCleanup = observeSection(sectionMoreProjects);

            return () => {
                headingCleanup();
                imageCleanup();
                overviewCleanup();
                techStackCleanup();
                detailsCleanup();
                moreProjectsCleanup();
            };
        }
    }, [loading, project]); 

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
                <meta name="description" content={`Explore details about the project "${project?.title.rendered}" including overview, tech stack, roles, and more. Dive into innovative solutions and creative implementations.`} />
            </Helmet>
            <Header />
            {project &&
                <>
                    {/* Gradient backdrop */}
                    <header className="pt-[5rem] pb-[3rem] relative">
                        <div ref={ marqueeRef } className="marquee marquee-gap">
                            <div className="marquee-content marquee-gap">
                                <div className="name-marquee w-full">
                                    {project && project.title.rendered.split('').map((letter, index) => (
                                        <span key={ index } className={ `marquee-letter inline-block ${letter === " " ? "mx-3 md:mx-4 lg:mx-5 xl:mx-6" : ""}` }>{ letter }</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="absolute left-0 right-0 top-0 h-full bg-gradient-to-b from-black via-black to-transparent opacity-60"></div>
                    </header>
                    <main className={ `main ${ isMobile ? "pb-20" : "" }` }>
                        <section className="section-smaller">
                            <BackLink path="/projects" title="PROJECTS" />
                            <section ref={ sectionHeadingRef } className="flex flex-col gap-12 md:flex-row md:justify-between hidden-section">
                                <div>
                                    <p className="text-sm text-neutral-400 font-medium mb-3 lg:mb-2">PROJECT</p>
                                    <h1 className="text-[2.5rem] md:text-[3rem] font-semibold lg:text-[4rem] leading-tight mb-2">{ project.title.rendered }</h1>
                                    <p>{ project.acf.sub_title }</p>
                                </div>
                                <div>
                                    <p className="text-sm text-neutral-400 font-medium mb-6">VIEW PROJECT</p>
                                    <div className="flex gap-8">
                                        <p>
                                            {project.acf.live_site_link ? (
                                                <a className="link-button" href={project.acf.live_site_link} target="_blank">
                                                    LIVE SITE
                                                </a>
                                            ) : (
                                                <a className="link-button pointer-events-none opacity-50" href="#" onClick={(e) => e.preventDefault()}>
                                                    IN PROGRESS
                                                </a>
                                            )}
                                        </p>
                                        <p >
                                            <a className="link-button" href={ project.acf.github_repo_link } target="_blank">
                                                GITHUB
                                            </a>
                                        </p>
                                    </div>
                                </div>
                            </section>
                            <section ref={ sectionFeaturedImageRef } className="mt-10 max-w-[750px] mx-auto hidden-section">
                                <figure>
                                    <FeaturedImage featuredImageObject={ project._embedded["wp:featuredmedia"][0] } />
                                </figure>
                            </section>
                            <section ref={ sectionOverviewRef } className="flex flex-col gap-12 md:flex-row md:justify-between md:gap-2 hidden-section">
                                <div className="md:w-[70%]">
                                    <h2 className="section-heading mb-3">OVERVIEW</h2>
                                    <p className="leading-relaxed">{ project.acf.overview }</p>
                                </div>
                                <div>
                                    <h2 className="section-heading mb-3">ROLE</h2>
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
                            </section>
                            <section ref={ sectionTechStackRef } className="hidden-section">
                                <h2 className="section-heading mb-5">TECH STACK</h2>
                                <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                                    {( teckStack.length > 0 ) ? (
                                        teckStack.map(( stack ) => (
                                            <article key={ stack.id } className="mx-auto flex gap-4 items-center w-full max-w-[18rem] xs:max-w-none bg-neutral-800 p-3 rounded-md shadow-all-shadow transition duration-300 lg:hover:scale-[1.02]">
                                                <div>
                                                    <img 
                                                        className="block w-10 h-10" 
                                                        src={ stack._embedded["wp:featuredmedia"][0].media_details.sizes.thumbnail.source_url } 
                                                        alt={ stack._embedded["wp:featuredmedia"][0].alt_text }
                                                    />
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
                            </section>
                            <section ref={ sectionDetailsRef } className="mt-8 shadow-all-shadow hidden-section">
                                <ProjectInfoTabs project={ project } />
                            </section>
                            <section ref={ sectionMoreProjects } className="relative flex flex-col mt-32 max-w-[900px] w-full mx-auto hidden-section">
                                <div className="flex flex-col justify-between mb-4">
                                    <h2 className="section-heading">MORE PROJECTS</h2>
                                    <p className="self-end">
                                        <Link to="/projects" className="view-all-projects">{"< VIEW ALL PROJECTS />"}</Link>
                                    </p>
                                </div>
                                <div className="flex justify-center gap-2 md:gap-6 max-h-[600px]">
                                    { additionalProjects.length > 0 ? (
                                        <MoreProjectsCarousel additionalProjects={ additionalProjects } />
                                    ) : (
                                        <h2 className="font-bold text-center text-2xl">NO PROJECTS FOUND</h2>
                                    ) }
                                </div>
                            </section>
                        </section>
                    </main>
                </>
            }
            <Footer />
        </>
    )
}

export default SingleProjectPage;