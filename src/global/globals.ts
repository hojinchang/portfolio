const scrollOffset:number = 30;

// Function which decodes special characters
function decodeHTMLEntities(text: string) {
    const textArea = document.createElement("textarea");
    textArea.innerHTML = text;
    return textArea.value;
}

export {
    scrollOffset,
    decodeHTMLEntities
}