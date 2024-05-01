import { FC } from "react";

import { ProjectInterface } from "../../interfaces/interfaces";

interface Props {
    project: ProjectInterface
}

const ReflectionTab:FC<Props> = ({ project }) => {

    return (
        <article className="project-details-tab project-details-fade-in">
            { project.acf.reflection.map((detail, detailIdx) => (
                <div key={ detailIdx }>
                    <h3 className="project-details-heading">{ detail.content_title }</h3>
                    { (detail.content_description.length > 1) ? (
                        <ul className="list text-neutral-300">
                            { detail.content_description.map((description, descriptionIdx) => (
                                <li key={ descriptionIdx } dangerouslySetInnerHTML={{ __html: description.list_item }}></li>
                            )) }
                        </ul>
                    ) : (
                        <p className="text-neutral-300 leading-relaxed">{ detail.content_description[0].list_item }</p>
                    ) }
                </div>
            )) }
        </article>
    )
}

export default ReflectionTab;