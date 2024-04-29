import { FC } from "react";

import { ProjectInterface } from "../../interfaces/interfaces";

interface Props {
    project: ProjectInterface
}

const FeaturesTab:FC<Props> = ({ project }) => {

    return (
        <article className="project-details-tab">
            { project.acf.features.map((detail, detailIdx) => (
                <div key={ detailIdx }>
                    <h3 className="project-details-heading">{ detail.content_title }</h3>
                    <ul className="list text-neutral-300">
                        {detail.content_description.map((description, descriptionIdx) => (
                            <li key={ descriptionIdx }>{ description.list_item }</li>
                        ))}
                    </ul>
                    { detail.content_images.map((media, mediaIdx) => (
                        <div key={ mediaIdx }>
                            { media.content_image && (
                                <img alt=""/>
                            ) }
                            { media.content_video && (
                                <video controls>
                                    <source type="video/mp4" />
                                </video>
                            ) }
                        </div>
                    )) }

                </div>
            )) }
        </article>
    )
}

export default FeaturesTab;
