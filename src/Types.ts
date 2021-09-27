export type Option<T> = T | null;

export interface Band {
    uid: number;
    id: number;
    name: string;
    language: Option<string>;
    permalink: string;
    public_page_url: string;
    permalink_name: string;
    created_at: string;
    city: Option<string>;
    address: Option<string>;
    country: Option<string>;
    profile_views_count: number;
    playlists_count: number;
    image: string;
    url_for_image_thumb: string;
    url_for_image_head: string;
    url_for_image_list: string;
    url_for_image_original: string;
    links: Array<{ name: Option<string>; href: string }>;
    biographies: Array<{ lang: string; description: string }>;
    categories: Array<{ id: number; name: string }>;
    state: {
        name: string;
        code: string;
    };
    listening_count: number;
    listening_count_last_period: number;
    is_broadcasted: boolean;
    singles_count: number;
    performances: Array<any>;
}

export type Response<T, Name extends string> = {
    status: string;
    code: string;
} & { [P in Name]: T };
