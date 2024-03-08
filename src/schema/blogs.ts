import z from 'zod';
import { authorSchema } from './author';
import { commentSchema } from './comment';

export const likeSchema = z.object({
    id: z.string(),
}).optional();

export const blogSchema = z.object({
    id: z.string(),
    title: z.string(),
    content: z.string().optional(),
    thumbnail: z.string().nullable().or(z.object({})),
    author: authorSchema,
    tags: z.string().optional(),
    likes: z.array(likeSchema),
    comments: z.array(commentSchema).optional(),
    createdAt: z.string(), // Assuming createdAt is always a string in ISO 8601 format
});

export type Blog = z.infer<typeof blogSchema>;

export const blogArray = z.array(blogSchema);

export type blogArraySchema = z.infer<typeof blogArray>;


// // Example usage
// const data = {
//     "id": "7c12b4b48531bcc995ae",
//     "title": "A guide to Prototype in JavaScript",
//     "content": "Developers may construct interactive and dynamic online apps with the robust programming language — JavaScript. The prototype is one of the most crucial ideas in JavaScript since it allows objects to share functionality.\n\n\nPrototypes in JavaScript\nEvery object in JavaScript has a prototype, which serves as the object’s bare bones. The methods and properties that an object will inherit are specified in the prototype. An object inherits all of its prototype’s properties and functions when you create a new one. \nIn this example, we define the Person constructor function, which has the two inputs of name and age. The Person prototype then gets a new method called sayHello that logs a welcome message to the console.\n\nThe new keyword is then used to create a new Person object called sumit. JavaScript searches the prototype chain of the sumit object for the sayHello method when the sayHello method is called on the sumit object. As the sayHello method is present in the Person prototype, JavaScript locates it and uses it to greet the sumit object.\n\nBecause you may share functionality amongst objects without having to write duplicate code, prototypes are crucial in JavaScript. For instance, you could simply create a new object and set its prototype to be the Person prototype if you wanted to create another object that had the same sayHello method as the Person object",
//     "thumbnail": "thumbnail-1708765741114-630266656.png",
//     "author": {
//         "id": "7830e5903b889750f1e3",
//         "firstName": "Sumit",
//         "lastName": "Saha",
//         "avatar": "avatar-1708764729322-387087910.png"
//     },
//     "likes": [
//         {
//             "id": "346d7a36b3c41f3fbfa2"
//         },
//         {
//             "id": "f810ae24754a6cdc6d01"
//         },
//         {
//             "id": "3d2dde4b6548275fb066"
//         }
//     ],
//     "createdAt": "2024-02-24T09:09:01.121Z"
// }