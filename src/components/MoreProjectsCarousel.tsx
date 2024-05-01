import { FC, useRef } from "react";
import Slider from "react-slick";

import ProjectArticle from "./project_articles/ProjectArticle";
import { ProjectInterface } from "../interfaces/interfaces";

interface Props {
    additionalProjects: ProjectInterface[]
}

const MoreProjectsCarousel:FC<Props> = ({ additionalProjects }) => {
    const sliderRef = useRef<Slider | null>(null);

    const settings = {
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
    };

    const nextProject = () => {
        sliderRef.current?.slickNext();
    }

    const previousProject = () => {
        sliderRef.current?.slickPrev();
    }

    return (
        <>
            <button className="carousel-arrow left-1/4" onClick={ previousProject }>
                <svg className="text-inherit" fill="currentColor" role="img" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <title>Carousel previous arrow</title>
                    <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z"/>
                </svg>
            </button>
            <div className="max-w-[500px] h-full overflow-x-hidden" >
                <Slider ref={ sliderRef } {...settings}>
                    {additionalProjects.length > 0 && (
                        additionalProjects.map(project => (
                            <ProjectArticle key={project.id} project={project} />
                        ))
                    ) }
                </Slider>
            </div>
            <button className="carousel-arrow right-1/4" onClick={ nextProject }>
                <svg className="text-inherit" fill="currentColor" role="img" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <title>Carousel next arrow</title>
                    <path d="M7.33 24l-2.83-2.829 9.339-9.175-9.339-9.167 2.83-2.829 12.17 11.996z"/>
                </svg>
            </button>

        </>

    );
}

export default MoreProjectsCarousel;