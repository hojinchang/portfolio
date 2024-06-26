import { FC } from "react";
import { TechStackInterface } from "../interfaces/interfaces"

interface Props {
    stack: TechStackInterface;
}

const TechStack:FC<Props> = ({ stack }) => {
    return (
        <article className="flex gap-2 2xs:gap-4 items-center p-3 bg-neutral-800 rounded-md shadow-all-shadow transition duration-300 lg:hover:scale-[1.02]">
            <div>
                <img 
                    className="block w-8 h-8 rounded-md object-cover 3xs:object-contain sm:w-10 sm:h-10" 
                    src={ stack._embedded["wp:featuredmedia"][0].media_details.sizes.thumbnail.source_url } 
                    alt={ stack._embedded["wp:featuredmedia"][0].alt_text }
                />
            </div>
            <div>
                <p className="font-semibold text-[10px] 2xs:text-sm sm:text-sm md:text-base">{ stack.title.rendered }</p>
                <div className="text-[9px] 2xs:text-[10px] sm:text-xs md:text-sm text-neutral-400" dangerouslySetInnerHTML={{ __html: stack.content.rendered }}></div>
            </div>
        </article>
    )
}

export default TechStack;