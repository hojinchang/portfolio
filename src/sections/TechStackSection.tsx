import { FC, useState, useEffect, useRef } from "react";
import axios from "axios";

import animateHeadingIntersect from "../global/gsap_animations/animateHeadingIntersect";
import animateTechStack from "../global/gsap_animations/animateTechStack";
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
    const [isReadyForAnimation, setIsReadyForAnimation] = useState(false);

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

            console.log(categoryMap);
        };

        fetchCategories();
    }, []);

    useEffect(() => {
        // Fetch the tech stack custom post types
        const fetchTechStack = async () => {
            const response = await axios.get<TechStackInterface[]>(techStackAPIPath);
            let posts = response.data;
            
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

            setIsReadyForAnimation(true);
            setTechStack({ frontEnd, backEnd, programsAndDesign });
        };

        if (Object.keys(categories).length > 0) {
            fetchTechStack();
        }
    }, [categories]);


    useEffect(() => {
        if (!isReadyForAnimation) {
            return;
        }
    
        const observer = new IntersectionObserver((entries) => {
            animateHeadingIntersect(
                entries[0],
                titleBorderRef,
                titleRef,
                null,
                contentWrapperRef,
                hasTitleAnimated,
                setHasTitleAnimated
            );
        }, {
            root: null,
            rootMargin: "0px 0px -300px 0px",
            threshold: 0.1
        });
    
        if (titleBorderRef.current) {
            observer.observe(titleBorderRef.current);
        }
    
        return () => {
            if (titleBorderRef.current) {
                observer.unobserve(titleBorderRef.current);
            }
        };
    }, [hasTitleAnimated, isReadyForAnimation]);

    
    // Watch where the scroll is based on the title border
    useEffect(() => {
        if (!isReadyForAnimation) {
            return;
        }
        
        const observer = new IntersectionObserver(( entries ) => {
            animateTechStack(
                entries[0],
                frontEndStackRef,
                backEndStackRef,
                programsStackRef,
                hasStackAnimated,
                setHasStackAnimated
            );

        }, {
            root: null, 
            rootMargin: "0px 0px -200px 0px", 
            threshold: 0.1 
            });
    
        
        if (frontEndStackRef.current) {
            observer.observe(frontEndStackRef.current);
        }
    
        return () => {
            if (frontEndStackRef.current) {
                observer.unobserve(frontEndStackRef.current);
            }
        };

    }, [hasStackAnimated, isReadyForAnimation]);


    return (
        <section id="tech-stack" className="section">
            <h2 ref={ titleRef } className="section-title">// TECH STACK</h2>
            <div ref={ titleBorderRef } className="section-border"></div>

            <div ref={ contentWrapperRef } className="flex flex-col gap-8 lg:gap-10 mt-2 hidden-section">
                <div className="flex flex-col gap-8 1xl:flex-row">
                    <article ref={ frontEndStackRef } className="flex flex-col gap-2 1xl:w-1/2 hidden-section">
                        <h3 className="h3">{ "< Front-End />" }</h3>
                        {techStack.frontEnd.length > 0 && (
                            <div className="grid gap-2 grid-cols-2 ">
                                {techStack.frontEnd.map(( stack ) => (
                                    <TechStack key={ stack.id } stack={ stack } />
                                ))}
                            </div>
                        )}
                    </article>
                    <article ref={ backEndStackRef } className="flex flex-col gap-2 1xl:w-1/2 hidden-section">
                        <h3 className="h3">{ "< Back-End />" }</h3>
                        {techStack.backEnd.length > 0 && (
                            <div className="grid gap-2 grid-cols-2 ">
                                {techStack.backEnd.map(( stack ) => (
                                    <TechStack key={ stack.id } stack={ stack } />
                                ))}
                            </div>
                        )}
                    </article>
                </div>
                <div>
                    <article ref={ programsStackRef } className="flex flex-col gap-2 hidden-section">
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