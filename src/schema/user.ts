import { z } from "zod";
import { blogSchema } from "./blogs";

export const userSchema = z.object({
    id: z.string(),
    email: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    avatar: z.string().nullable(),
    bio: z.string(),
    favorite: z.array(blogSchema).optional()
});

export type User = z.infer<typeof userSchema>;

// // Testing
// const user = {
//     "id": "948c1b4b2a3fb8e0462a",
//     "email": "asdg@gmail.com",
//     "firstName": "Rifat",
//     "lastName": "Santo",
//     "avatar": null,
//     "bio": "",
//     "favourites": []
// }

// const parsed = userSchema.parse(user);
// console.log({ parsed });