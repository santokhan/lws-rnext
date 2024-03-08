import { SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axxios from '../axios/axiosInstance';
import CreateOrUpdateBlogForm from '../blocks/CreateBlogForm';
import { FC } from 'react';

interface CreatePost {
    title: string;
    tags: string;
    content: string;
    thumbnail: File | null;
}

export const defaultValues: CreatePost = {
    title: "",
    tags: "",
    content: "",
    thumbnail: null,
}

const CreateBlog: FC = () => {
    const navigate = useNavigate();

    const onSubmit: SubmitHandler<CreatePost> = (data: CreatePost) => {
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("content", data.content);
        formData.append("tags", data.tags);
        formData.append("thumbnail", data.thumbnail || "");

        axxios.post("/blogs", formData)
            .then((res) => {
                const data = res.data;
                if (data) {
                    navigate("/");
                }
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            });
    };

    return (
        <main>
            <section className="container">
                <div className='max-w-4xl mx-auto'>
                    <CreateOrUpdateBlogForm
                        defaultValues={defaultValues}
                        onSubmit={onSubmit}
                        submitText="Create Blog"
                    />
                </div>
            </section>
        </main>
    );
};

export default CreateBlog;
