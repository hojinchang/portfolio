export interface Sizes {
    medium: {
        width: number;
        height: number;
        source_url: string;
    };
    medium_large: {
        width: number;
        height: number;
        source_url: string;
    };
    large: {
        width: number;
        height: number;
        source_url: string;
    };
    full: {
        width: number;
        height: number;
        source_url: string;
    };
}

export interface MediaDetails {
    width: number;
    height: number;
    sizes: Sizes;
}

export interface FeaturedMedia {
    media_details: MediaDetails;
    source_url: string;
    alt_text: string;
}


export interface ContentImages {
    content_image: string;
    content_video: number;
}

export interface Content {
    content_title: string;
    content_description: string;
    content_images: ContentImages[];
}

export interface AcfPost {
    title: {
        rendered: string;
    };
}

export interface Embedded {
    "acf:post": AcfPost[];
    "wp:featuredmedia": FeaturedMedia[];
}

// Define the structure of the Project object
export interface Project {
    title: {
        rendered: string;
    };
    featured_media: number;
    acf: {
        sub_title: string;
        live_site_link: string;
        github_repo_link: string;
    };
    _embedded: Embedded;
}

export interface TechStack {
    title: {
        rendered: string;
    };
    content: {
        rendered: string;
    };
    _embedded: Embedded;
    "portfolio-tech-stack-category": [number];
}