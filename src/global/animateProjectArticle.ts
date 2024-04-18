import gsap from "gsap";

// Slide in animation for project articles
const animateProjectArticle = (
    direction: "left" | "right",
    projectArticleRef: {
        detailsRef: React.RefObject<HTMLDivElement>,
        imageRef: React.RefObject<HTMLDivElement>
    }
) => {
    const detailsRef = projectArticleRef.detailsRef.current;
    const imageRef = projectArticleRef.imageRef.current;

    gsap.fromTo(imageRef, 
        { x: direction === "left" ? "-50%" : "50%", opacity: 0 },
        { x: "0", opacity: 1, duration: 1.5, ease: "power2" }
    );

    gsap.fromTo(detailsRef, 
        { x: direction === "left" ? "-50%" : "50%", opacity: 0 },
        { x: "0", opacity: 1, duration: 1.5, ease: "power2", delay: 0.25 }
    );
};

export default animateProjectArticle;