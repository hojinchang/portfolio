import { FC, useState, useEffect, useRef } from "react";
import axios from "axios";

import handleHeadingIntersect from "../global/handleHeadingIntersect";
import animateTechStack from "../global/animateTechStack";
import { techStateCategoriesAPIPath, techStackAPIPath } from "../global/wpAPIPath";
import { TechStackInterface } from "../interfaces/interfaces";

import TechStack from "../components/TechStack";


interface TechStackState {
    frontEnd: TechStackInterface[];
    backEnd: TechStackInterface[];
    programsAndDesign: TechStackInterface[];
}

interface Category {
    id: number;
    slug: string;
}

interface CategoryState {
    [id: number]: string;
}

const TechStackSection: FC = () => {
    const [hasTitleAnimated, setHasTitleAnimated] = useState<boolean>(false);
    const [hasStackAnimated, setHasStackAnimated] = useState<boolean>(false);

    // Tech stack categories
    const [techStack, setTechStack] = useState<TechStackState>({ frontEnd: [], backEnd: [], programsAndDesign: [] });
    const [categories, setCategories] = useState<CategoryState>({});

    // References for GSAP animation
    const titleRef = useRef<HTMLHeadingElement>(null);
    const titleBorderRef = useRef<HTMLDivElement>(null);
    const contentWrapperRef = useRef<HTMLDivElement>(null);

    const frontEndStackRef = useRef<HTMLElement>(null);
    const backEndStackRef = useRef<HTMLElement>(null);
    const programsStackRef = useRef<HTMLElement>(null);

    useEffect(() => {
        // Fetch the tech stack categories custom taxonomy
        const fetchCategories = async () => {
            const response = await axios.get<Category[]>(techStateCategoriesAPIPath);
            // Create an object containing the taxonomy id and value
            const categoryMap = response.data.reduce((acc, cat) => ({
                ...acc,
                [cat.id]: cat.slug
            }), {});

            setCategories(categoryMap);
        };

        fetchCategories();
    }, []);

    useEffect(() => {
        // Fetch the tech stack custom post types
        const fetchTechStack = async () => {
            const response = await axios.get<TechStackInterface[]>(techStackAPIPath);
            let posts = response.data;

            // Sort the posts by title in alphabetical order
            posts = posts.sort((a, b) => {
                const titleA = a.title.rendered.toUpperCase();    // to ensure case-insensitive comparison
                const titleB = b.title.rendered.toUpperCase(); 
                if (titleA < titleB) {
                    return -1;
                }
                if (titleA > titleB) {
                    return 1;
                }
                return 0;
            });

            // Filter posts array based on their category id
            const frontEnd = posts.filter(post =>
                post['portfolio-tech-stack-category'].some((catId: number) => categories[catId] === 'front_end')
            );
            const backEnd = posts.filter(post =>
                post['portfolio-tech-stack-category'].some((catId: number) => categories[catId] === 'back_end')
            );
            const programsAndDesign = posts.filter(post =>
                post['portfolio-tech-stack-category'].some((catId: number) => categories[catId] === 'programs_and_design')
            );

            setTechStack({ frontEnd, backEnd, programsAndDesign });
        };

        if (Object.keys(categories).length > 0) {
            fetchTechStack();
        }
    }, [categories]);

    // Watch where the scroll is based on the title border
    useEffect(() => {
        // Create a new IntersectionObserver
        const observer = new IntersectionObserver(( entries ) => {
            entries.forEach(( entry ) => {
                if (entry.target === titleBorderRef.current) {
                    handleHeadingIntersect(
                        [entry],
                        titleBorderRef,
                        titleRef,
                        null,
                        null,
                        hasTitleAnimated,
                        setHasTitleAnimated
                    );
                } else if (entry.target === frontEndStackRef.current) {
                    animateTechStack(
                        [entry],
                        frontEndStackRef,
                        backEndStackRef,
                        programsStackRef,
                        hasStackAnimated,
                        setHasStackAnimated
                    );
                }
            });
        }, {
            root: null, // Use the viewport as the root
            rootMargin: "0px", // No margin around the root
            threshold: 0.1 // Trigger when 10% of the element is visible
         });
    
        // Observe the titleBorderRef element
        if (titleBorderRef.current) {
            observer.observe(titleBorderRef.current);
        }
        if (frontEndStackRef.current) {
            observer.observe(frontEndStackRef.current);
        }
    
        // Cleanup stop observing the element when the component unmounts
        return () => {
            if (titleBorderRef.current) {
                observer.unobserve(titleBorderRef.current);
            }
            if (frontEndStackRef.current) {
                observer.unobserve(frontEndStackRef.current);
            }
        };
    }, []); // Re-run the effect when hasTitleAnimated changes
    

    return (
        <section id="techStackSection" className="section">
            <h2 ref={ titleRef } className="section-title">// TECH STACK</h2>
            <div ref={ titleBorderRef } className="section-border"></div>

            <div ref={ contentWrapperRef } className="flex flex-col gap-6 mt-2">
                <div className="flex flex-col gap-8 lg:flex-row">
                    <article ref={ frontEndStackRef } className="flex flex-col gap-2 lg:w-1/2">
                        <h3 className="h3">{ "< Front-End />" }</h3>
                        {techStack.frontEnd.length > 0 && (
                            <div className="grid gap-2 grid-cols-2">
                                {techStack.frontEnd.map(( stack ) => (
                                    <TechStack key={ stack.id } stack={ stack } />
                                ))}
                            </div>
                        )}
                    </article>
                    <article ref={ backEndStackRef } className="flex flex-col gap-2 lg:w-1/2">
                        <h3 className="h3">{ "< Back-End />" }</h3>
                        {techStack.backEnd.length > 0 && (
                            <div className="grid gap-2 grid-cols-2">
                                {techStack.backEnd.map(( stack ) => (
                                    <TechStack key={ stack.id } stack={ stack } />
                                ))}
                            </div>
                        )}
                    </article>
                </div>
                <div>
                    <article ref={ programsStackRef } className="flex flex-col gap-2">
                        <h3 className="h3">{ "< Programs and Design />" }</h3>
                        {techStack.programsAndDesign.length > 0 && (
                            <div className="grid gap-2 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                {techStack.programsAndDesign.map(( stack ) => (
                                    <TechStack key={ stack.id } stack={ stack } />
                                ))}
                            </div>
                        )}
                    </article>
                </div>
            </div>
        </section>
    )
}

export default TechStackSection;