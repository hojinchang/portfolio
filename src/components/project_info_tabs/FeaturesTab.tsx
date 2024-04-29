import { FC, useState, useEffect } from "react";

import { ProjectInterface, MediaDetails } from "../../interfaces/interfaces";
import { fetchMediaById } from "../../global/globals";

interface Props {
    project: ProjectInterface
}

const FeaturesTab:FC<Props> = ({ project }) => {
    // const [mediaUrls, setMediaUrls] = useState<MediaDetails>({});
    const [mediaDetails, setMediaDetails] = useState<MediaDetails>({});

    // Fetch the media files
    useEffect(() => {
        const loadMedia = async () => {
            let mediaIds: number[] = [];
            // Loop through the features
            project.acf.features.forEach(feature => {
                // Loop through the possible content media (either content_image or content_video)
                feature.content_images.forEach(media => {
                    if (media.content_image) mediaIds.push(media.content_image);
                    if (media.content_video) mediaIds.push(media.content_video);
                });
            });

            const uniqueMediaIds = [...new Set(mediaIds)];  // Remove duplicates
            // Fetch the media content from
            const mediaDataPromises = uniqueMediaIds.map(id => fetchMediaById(id));
            const mediaDatas = await Promise.all(mediaDataPromises);

            // Create an object containing the source url and alt text of the media
            const newMediaDetails = mediaDatas.reduce((acc, media) => ({
                ...acc,
                [media.id]: { url: media.source_url, alt: media.alt_text }
            }), {});

            setMediaDetails(newMediaDetails);
        };

        loadMedia();
    }, [project]);


    return (
        <article className="project-details-tab">
            { project.acf.features.map((detail, detailIdx) => (
                <div key={ detailIdx }>
                    <h3 className="project-details-heading">{ detail.content_title }</h3>
                    <ul className="list text-neutral-300 mb-6">
                        {detail.content_description.map((description, descriptionIdx) => (
                            <li key={ descriptionIdx }>{ description.list_item }</li>
                        ))}
                    </ul>
                    { detail.content_images.map((media, mediaIdx) => (
                        <div className="flex flex-col gap-4 items-center" key={ mediaIdx }>
                            { media.content_image && mediaDetails[media.content_image] && (
                                    <img className="block w-[85%] object-cover" src={ mediaDetails[media.content_image].url } alt={ mediaDetails[media.content_image].alt } />
                            ) }
                            { media.content_video && mediaDetails[media.content_video] && (
                                <video className="block w-[85%]" controls>
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

export default FeaturesTab;
