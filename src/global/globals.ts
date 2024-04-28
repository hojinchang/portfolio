import { ProjectInterface } from "../interfaces/interfaces";

const scrollOffset:number = 30;

// Function which decodes special characters
function decodeHTMLEntities(text: string) {
    const textArea = document.createElement("textarea");
    textArea.innerHTML = text;
    return textArea.value;
}

function reverseTechStackArray(project: ProjectInterface) {
    const techStackArray = [...project._embedded["acf:post"]];
    return techStackArray.reverse();
}

export {
    scrollOffset,
    decodeHTMLEntities,
    reverseTechStackArray
}