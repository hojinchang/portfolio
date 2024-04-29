import { FC } from "react";

import { ProjectInterface } from "../../interfaces/interfaces";

interface Props {
    project: ProjectInterface
}

const FeaturesTab:FC<Props> = ({ project }) => {

    return (
        <article>
            Features
        </article>
    )
}

export default FeaturesTab;