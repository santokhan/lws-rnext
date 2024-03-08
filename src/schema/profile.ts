import { Blog } from "./blogs";

export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    avatar: string;
    bio: string;
    favourites: { id: string; title: string; tags: string }[];
    blogs: Blog[];
}