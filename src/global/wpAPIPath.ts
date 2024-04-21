const wpAPIPath: string = "https://hojinchang.com/portfolio/wp-json/wp/v2/";

const featuredProjectsAPIPath: string = wpAPIPath + "portfolio-projects?portfolio-featured-category=8&_embed";

const techStateCategoriesAPIPath: string = wpAPIPath + "portfolio-tech-stack-category";
const techStackAPIPath: string = wpAPIPath + "portfolio-tech-stack?per_page=100&_embed";

export {
    wpAPIPath,
    featuredProjectsAPIPath,
    techStateCategoriesAPIPath,
    techStackAPIPath
}