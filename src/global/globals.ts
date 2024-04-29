import { mediaAPIPath } from "./wpAPIPath";
import { ProjectInterface } from "../interfaces/interfaces";

const scrollOffset:number = 30;

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

export {
    scrollOffset,
    decodeHTMLEntities,
    reverseTechStackArray,
    fetchMediaById
}