import { SubmitHandler } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../axios/axiosInstance';
import CreateOrUpdateBlogForm, { CreatePost } from '../blocks/CreateBlogForm';
import { FC, useEffect, useState } from 'react';
import { Blog } from '../schema/blogs';
import { thumbnailURL } from '../utils/api-url';

const UpdateBlog: FC = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [blog, setBlog] = useState<Blog | null>(null);

    useEffect(() => {
        axios.get(`/blogs/${id}`).then(res => {
            const data = res.data;
            if (data) {
                setBlog(data);
            }
        }).catch(err => console.log(err));
    }, [id])

    const onSubmit: SubmitHandler<CreatePost> = (data: CreatePost) => {
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("content", data.content);
        formData.append("tags", data.tags);
        formData.append("thumbnail", data.thumbnail || "");

        axios.patch(`/blogs/${id}`, formData)
            .then((res) => {
                const data = res.data;
                if (data) {
                    navigate("/");
                }
            }).catch(err => console.log(err));
    };

    const defaultValues: CreatePost = {
        title: blog?.title || "",
        tags: blog?.tags || "",
        content: blog?.content || "",
        thumbnail: null,
    }

    return (
        <main className="container">
            <div className='max-w-4xl mx-auto'>
                {blog && (
                    <CreateOrUpdateBlogForm
                        defaultValues={defaultValues}
                        onSubmit={onSubmit}
                        previewURL={typeof blog.thumbnail === 'string' ? thumbnailURL(blog.thumbnail) : ""}
                        submitText="Update Blog"
                    />
                )}
            </div>
        </main>
    );
};

export default UpdateBlog;
