import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

export interface CreatePost {
    title: string;
    tags: string;
    content: string;
    thumbnail: File | null;
}

interface ImagePreviewProps {
    thumbnailSetter: (files: File | null) => void;
    previewURL: string;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ thumbnailSetter, previewURL }) => {
    const [imagePreview, setImagePreview] = useState<string | null>(previewURL);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            const reader = new FileReader();

            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
            thumbnailSetter(file);
        }
    };

    return (
        <>
            <div className="grid place-items-center bg-slate-600/20 h-[250px] rounded-md my-4 relative">
                {/* Layer Top file <input> z-2 */}
                {/* Layer Middle preview z-1 */}
                {/* Layer Bottom Image z-0 */}
                {imagePreview && (
                    <img
                        src={imagePreview}
                        alt="Preview"
                        className="absolute left-0 top-0 w-full h-full object-cover z-0"
                    />
                )}
                <input
                    type="file"
                    accept="image/*"
                    className="w-full h-full absolute left-0 top-0 z-[2] opacity-0"
                    onChange={handleFileChange}
                    required={true}
                />
                <div className="flex items-center justify-center cursor-pointer text-white">
                    <div className="flex items-center gap-4 z-[1] bg-black/20 backdrop-blur-sm rounded-lg px-4 py-3 transition-all hover:scale-110">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                            />
                        </svg>
                        <p>{imagePreview ? "Change Image" : "Upload Your Image"}</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export interface CreateBlogFormProps {
    defaultValues: CreatePost;
    onSubmit: SubmitHandler<CreatePost>;
    submitText: string;
    previewURL: string;
}

const CreateOrUpdateBlogForm: React.FC<CreateBlogFormProps> = ({ defaultValues, onSubmit, submitText, previewURL }) => {
    const { register, handleSubmit, setValue } = useForm<CreatePost>({ defaultValues });
    // const navigate = useNavigate();

    // const onSubmit: SubmitHandler<CreatePost> = (data: CreatePost) => {
    //     const formData = new FormData();
    //     formData.append("title", data.title);
    //     formData.append("content", data.content);
    //     formData.append("tags", data.tags);
    //     formData.append("thumbnail", data.thumbnail || "");

    //     axxios.post("/blogs", formData)
    //         .then((res) => {
    //             const data = res.data;
    //             if (data) {
    //                 navigate("/");
    //             }
    //             console.log(res);
    //         })
    //         .catch(err => {
    //             console.log(err);
    //         });
    // };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <ImagePreview thumbnailSetter={file => setValue("thumbnail", file)} previewURL={previewURL} /> {/* Pass thumbnailSetter function */}
            <div className="mb-6">
                <input
                    type="text"
                    {...register("title", { required: true })}
                    id="title"
                    className='w-full p-3 bg-[#030317] border border-white/20 rounded-md focus:outline-none focus:border-indigo-500'
                    name="title"
                    placeholder="Enter your blog title"
                />
            </div>
            <div className="mb-6">
                <input
                    type="text"
                    {...register("tags", { required: true })}
                    id="tags"
                    className='w-full p-3 bg-[#030317] border border-white/20 rounded-md focus:outline-none focus:border-indigo-500'
                    name="tags"
                    placeholder="Your Comma Separated Tags Ex. JavaScript, React, Node, Express," />
            </div>
            <div className="mb-6">
                <textarea
                    {...register("content")}
                    id="content"
                    name="content"
                    className='w-full p-3 bg-[#030317] border border-white/20 rounded-md focus:outline-none focus:border-indigo-500'
                    placeholder="Write your blog content"
                    rows={8}
                    defaultValue={""}
                />
            </div>
            <button className="bg-indigo-600 text-white px-6 py-2 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200">
                {submitText}
            </button>
        </form>
    );
};

export default CreateOrUpdateBlogForm;
