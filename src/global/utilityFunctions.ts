import { mediaAPIPath } from "./wpAPIPath";
import { ProjectInterface } from "../interfaces/interfaces";

// Function which decodes special characters
function decodeHTMLEntities(text: string) {
    const textArea = document.createElement("textarea");
    textArea.innerHTML = text;
    return textArea.value;
}

// Reverse the tech stack
function reverseTechStackArray(project: ProjectInterface) {
    const techStackArray = [...project._embedded["acf:post"]];
    return techStackArray.reverse();
}

// Fetch media given its id
const fetchMediaById = async(mediaId: number) => {
    try {
        const response = await fetch(mediaAPIPath + mediaId.toString());
        return await response.json();
    } catch(err) {
        console.error(`Error fetching media: ${mediaId}`, err);
    }
}



const fetchProjectMedia = async(project:  ProjectInterface) => {
    let mediaIds: number[] = [];
    // Loop through the features
    project.acf.features.forEach(feature => {
        // Loop through the possible content media (either content_image or content_video)
        if (feature.content_images) {
            feature.content_images.forEach(media => {
                if (media.content_image) mediaIds.push(media.content_image);
                if (media.content_video) mediaIds.push(media.content_video);
            });
        }
    });

    console.log(mediaIds);

    const uniqueMediaIds = [...new Set(mediaIds)];  // Remove duplicates
    const mediaDataPromises = uniqueMediaIds.map(id => fetchMediaById(id));
    const mediaDatas = await Promise.all(mediaDataPromises);

    const mediaDetails = mediaDatas.reduce((acc, media) => ({
        ...acc,
        [media.id]: { url: media.source_url, alt: media.alt_text }
    }), {});

    return mediaDetails;
}

export {
    decodeHTMLEntities,
    reverseTechStackArray,
    fetchMediaById,
    fetchProjectMedia
}