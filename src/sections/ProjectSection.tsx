import { FC, useState, useEffect, useRef } from "react";
import axios from "axios";
import gsap from "gsap";

import { featuredProjectsAPIPath} from "../global/wpAPIPath";
import { Project } from "../interfaces/interfaces";
import ProjectArticle from "../components/ProjectArticle";


const ProjectSection: FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const titleBorderRef = useRef<HTMLDivElement>(null);

    const [hasAnimated, setHasAnimated] = useState(false);

    // Fetch the featured projects
    useEffect(() => {
        const fetchProjects = async() => {
            try {
                const response = await axios.get(featuredProjectsAPIPath);
                setProjects(response.data);
            } catch(err) {
                console.error("Error fetching featured projects:", err);
            }
        }

        fetchProjects();
    }, []);
    
    useEffect(() => {
        // Function to handle intersection changes
        const handleIntersect = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                // Check if the element is intersecting the viewport and the animation hasn't played yet
                if (entry.isIntersecting && !hasAnimated) {
                    // Play the animation using GSAP
                    gsap.fromTo(titleBorderRef.current, {
                        width: "0%" 
                    }, {
                        width: "100%",
                        duration: 2,
                        ease: "ease"
                    }).then(() => {
                        setHasAnimated(true);
                    });

                    gsap.from(titleRef.current, {
                        opacity: 0,
                        x: -40,
                        duration: 2,
                        ease: "ease"
                    });
                } 
                // Check if the element is no longer intersecting and the animation has played
                else if (!entry.isIntersecting && hasAnimated) {
                    setHasAnimated(false);
                }
            });
        };
    
        // Create a new IntersectionObserver
        const observer = new IntersectionObserver(handleIntersect, {
            root: null, // Use the viewport as the root
            rootMargin: "0px", // No margin around the root
            threshold: 0.1 // Trigger when 10% of the element is visible
        });
    
        // Observe the titleBorderRef element
        if (titleBorderRef.current) {
            observer.observe(titleBorderRef.current);
        }
    
        // Cleanup: Stop observing the element when the component unmounts
        return () => {
            if (titleBorderRef.current) {
                observer.unobserve(titleBorderRef.current);
            }
        };
    }, [hasAnimated]); // Re-run the effect when hasAnimated changes


    return (
        <section id="projectSection" className="pt-10 min-h-screen max-w-[1280px] mx-auto">
            <h2 ref={titleRef} className="section-title">// FEATURED PROJECTS</h2>
            <div ref={titleBorderRef} className="title-border border-b-2 border-neutral-100 mb-8"></div>
            {projects.length > 0 && (
                projects.map((project) => (
                    <ProjectArticle key={ project.title.rendered }  project={ project } />
                ))
            )}
        </section>
    )
}

export default ProjectSection;