import { FC } from "react";

import { ProjectInterface } from "../../interfaces/interfaces";

interface Props {
    project: ProjectInterface
}

const ReflectionTab:FC<Props> = ({ project }) => {

    return (
        <article>
            Reflection
        </article>
    )
}

export default ReflectionTab;