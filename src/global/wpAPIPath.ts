const wpAPIPath: string = "https://hojinchang.com/portfolio/wp-json/wp/v2/";

// Get projects api paths
const projectsAPIPath: string = wpAPIPath + "portfolio-projects?per_page=100&_embed";
const featuredProjectsAPIPath: string = wpAPIPath + "portfolio-projects?portfolio-featured-category=8&_embed";
const additionalProjectsAPIPath: string = "https://hojinchang.com/portfolio/wp-json/api/random_portfolio_projects/";

// Get tech stack api paths
const techStateCategoriesAPIPath: string = wpAPIPath + "portfolio-tech-stack-category";
const techStackAPIPath: string = wpAPIPath + "portfolio-tech-stack?per_page=100&orderby=title&order=asc&_embed";

// Get media api paths
const mediaAPIPath: string = wpAPIPath + "media/";

export {
    wpAPIPath,
    projectsAPIPath,
    featuredProjectsAPIPath,
    additionalProjectsAPIPath,
    techStateCategoriesAPIPath,
    techStackAPIPath,
    mediaAPIPath
}