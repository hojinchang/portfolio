import { FC } from "react";

import { ProjectInterface } from "../../interfaces/interfaces";

interface Props {
    project: ProjectInterface
}

const ConceptTab:FC<Props> = ({ project }) => {

    return (
        <article className="flex flex-col gap-8">
            { project.acf.concept.map((detail, i) => (
                <div key={ i }>
                    <h3 className="text-lg font-medium uppercase mb-2">{ detail.content_title }</h3>
                    <ul className="list">
                        { detail.content_description.map((listItem, i) => (
                            <li key={ i }>{ listItem.list_item }</li>
                        ))}
                    </ul>
                </div>
            ))}
        </article>
    )
}

export default ConceptTab;