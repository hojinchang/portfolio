interface Sizes {
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

interface MediaDetails {
    width: number;
    height: number;
    sizes: Sizes;
}

interface FeaturedMedia {
    media_details: MediaDetails;
    source_url: string;
    alt_text: string;
}

interface AcfPost {
    title: {
        rendered: string;
    };
}

export interface Roles {
    name: string;
}

interface Embedded {
    "acf:post": AcfPost[];
    "wp:featuredmedia": FeaturedMedia[];
    "wp:term": Roles[][];
}

interface ContentImages {
    content_image: number;
    content_video: number;
}

interface DetailsContent {
    content_title: string;
    content_description: [{list_item: string}];
    content_images: ContentImages[];
}

// Define the structure of the Project object
export interface ProjectInterface {
    slug: string;
    title: {
        rendered: string;
    };
    featured_media: number;
    acf: {
        sub_title: string;
        live_site_link: string;
        github_repo_link: string;
        overview: string;
        tech_stack: [number];
        concept: DetailsContent[];
        features: DetailsContent[];
        reflection: DetailsContent[];
    };
    _embedded: Embedded;
}

export interface TechStackInterface {
    id: number,
    title: {
        rendered: string;
    };
    content: {
        rendered: string;
    };
    alt_text: string;
    _embedded: Embedded;
    "portfolio-tech-stack-category": [number];
}