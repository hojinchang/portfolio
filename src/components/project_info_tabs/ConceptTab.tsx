import { FC } from "react";

import { ProjectInterface } from "../../interfaces/interfaces";

interface Props {
    project: ProjectInterface
}

const ConceptTab:FC<Props> = ({ project }) => {

    return (
        <article className="project-details-tab">
            { project.acf.concept.map((detail, i) => (
                <div key={ i }>
                    <h3 className="project-details-heading">{ detail.content_title }</h3>
                    <ul className="list text-neutral-300">
                        { detail.content_description.map((description, i) => (
                            <li key={ i }>{ description.list_item }</li>
                        )) }
                    </ul>
                </div>
            )) }
        </article>
    )
}

export default ConceptTab;