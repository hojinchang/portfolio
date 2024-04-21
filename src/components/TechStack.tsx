import { FC } from "react";
import { TechStackInterface } from "../interfaces/interfaces"

interface Props {
    stack: TechStackInterface;
}

const TechStack:FC<Props> = ({ stack }) => {
    return (
        <div className="flex gap-4 items-center bg-neutral-800 p-3 rounded-md">
            <div className="w-8 h-8 sm:w-10 sm:h-10">
                <img className="block rounded-lg" src={ stack._embedded["wp:featuredmedia"][0].source_url }/>
            </div>
            <div>
                <p className="font-semibold text-base">{ stack.title.rendered }</p>
                <div className="text-sm text-neutral-400" dangerouslySetInnerHTML={{ __html: stack.content.rendered }}></div>
            </div>
        </div>
    )
}

export default TechStack;