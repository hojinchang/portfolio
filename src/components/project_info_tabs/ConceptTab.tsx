import { FC, useState, useEffect } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

import { ProjectInterface, MediaDetails } from "../../interfaces/interfaces";
import { fetchProjectMedia } from "../../global/utilityFunctions";


interface Props {
    project: ProjectInterface
}

const ConceptTab:FC<Props> = ({ project }) => {
    const [mediaDetails, setMediaDetails] = useState<MediaDetails>({});

    // Fetch the media files
    useEffect(() => {
        const fetchMedia = async () => {
            const mediaDetails = await fetchProjectMedia(project);
            setMediaDetails(mediaDetails);
        }

        fetchMedia();
    }, [project]);

    return (
        <article className="project-details-tab">
            { project.acf.concept.map((detail, detailIdx) => (
                <div key={ detailIdx }>
                    <h3 className="project-details-heading">{ detail.content_title }</h3>
                    <ul className="list text-neutral-300">
                        { detail.content_description.map((description, descriptionIdx) => (
                            <li key={ descriptionIdx } dangerouslySetInnerHTML={{ __html: description.list_item }}></li>
                        )) }
                    </ul>
                    { detail.content_code && (
                        <SyntaxHighlighter language="javascript" style={ atomDark } className="block !mt-6">
                            { detail.content_code }
                        </SyntaxHighlighter>
                    ) }
                    { detail.content_images && (detail.content_images.length > 0) && detail.content_images.map((media, mediaIdx) => (
                        <div className="flex flex-col gap-6 items-center mt-6" key={ mediaIdx }>
                            { media.content_image && mediaDetails[media.content_image] && (
                                    <img className="block w-[85%] object-cover" src={ mediaDetails[media.content_image].url } alt={ mediaDetails[media.content_image].alt } />
                            ) }
                            { media.content_video && mediaDetails[media.content_video] && (
                                <video className="block w-[85%]" autoPlay loop muted controls>
                                    <source src={ mediaDetails[media.content_video].url } type="video/mp4" />
                                </video>
                            ) }
                        </div>
                    )) }
                </div>
            )) }
        </article>
    )
}

export default ConceptTab;