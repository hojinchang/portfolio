import { FC } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { RootState } from "../../store/store";
import FeaturedImage from "./FeaturedImage";
import { ProjectInterface } from "../../interfaces/interfaces";


interface FeaturedProjectArticleProps {
    project: ProjectInterface;
    idx: number;
    active: boolean;
    articleRef: React.RefObject<HTMLElement>;
    imageRef: React.RefObject<HTMLDivElement>;
    detailsRef: React.RefObject<HTMLDivElement>;
}

const FeaturedProjectArticle: FC<FeaturedProjectArticleProps> = ({ project, idx, active, articleRef, imageRef, detailsRef }) => {

    const isMobile = useSelector((state: RootState) => state.isMobile.isMobile);

    return (
        <article
            ref={ articleRef }
            className={
                `project-article
                ${active ? "flex" : "hidden"}
                md:gap-6 ${isMobile ? "flex-col" : (idx === 1) ? "flex-row-reverse" : "flex-row"}`
            }
        >
            {project.featured_media !== 0 && project._embedded && 
                <div ref={ imageRef } className={ `${isMobile ? "" : "w-3/5"}` }>
                    <figure>
                        <FeaturedImage featuredImageObject={ project._embedded["wp:featuredmedia"][0] } />
                    </figure>
                </div>
            }
            <div ref={ detailsRef } className={`flex flex-col gap-8 p-4 pb-2 md:justify-end md:pb-6 ${isMobile ? "" : "w-2/5"}`}>
                <div className="flex flex-col gap-2">
                    <h3 className="text-2xl font-medium lg:text-3xl xl:text-4xl 2xl:text-5xl">{ project.title.rendered }</h3>
                    <p className="text-base lg:text-lg">{ project.acf.sub_title }</p>
                    <p className="text-neutral-400 text-sm leading-normal lg:text-base">{project._embedded["acf:post"].map((techStack) => techStack.title.rendered).join(" | ")}</p>
                </div>
                <div className="flex justify-center gap-8 2xs:gap-20 xs:gap-28 sm:gap-36 md:flex-col md:gap-0 md:items-end">
                    <Link to="/" target="_blank" className="underline p-2 lg:text-lg link-hover">VIEW MORE</Link>
                    <Link to={ project.acf.live_site_link } target="_blank" className="underline p-2 lg:text-lg link-hover">LIVE SITE</Link>
                </div>
            </div>
        </article>
    )
}

export default FeaturedProjectArticle;