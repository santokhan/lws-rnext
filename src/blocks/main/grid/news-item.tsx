import { FC } from 'react';
import { z } from 'zod';
import { ArticleSchema } from '../../../utils/schema';

export const PublishedAt: FC<{ publishedAt: Date }> = ({ publishedAt }) => {
    return (
        <p className="mt-5 text-base text-[#94908C]">
            {publishedAt.toLocaleString()}
        </p>
    )
}

export const Description: FC<{ description: string | null }> = ({ description }) => {
    return (
        description &&
        <p className="text-base text-[#292219]">
            {description.length > 136 ? description.slice(0, 136) + '...' : description}
        </p>
    )
}

export const Title: FC<{ title: string | null }> = ({ title }) => {
    return (
        title &&
        <a href={''}><h3 className="mb-2.5 text-xl font-bold lg:text-2xl">{title}</h3></a>
    )
}

const NewsItemIncludeImage: FC<z.infer<typeof ArticleSchema>> = ({ title, description, urlToImage, publishedAt }) => {
    return (
        <div className="col-span-12 grid grid-cols-12 gap-4">
            {/* info */}
            <div className="col-span-12 md:col-span-4">
                <Title title={title} />
                <Description description={description} />
                <PublishedAt publishedAt={publishedAt} />
            </div>
            {/* thumb */}
            <div className="col-span-12 md:col-span-8">
                {urlToImage && <img className="w-full h-full object-cover" src={urlToImage} alt="thumb" />}
            </div>
        </div>
    );
};

export const NewsItemIncludeImage2: FC<z.infer<typeof ArticleSchema>> = ({ title, description, urlToImage, publishedAt }) => {
    return (
        <div className="col-span-12 grid grid-cols-12 gap-4 lg:col-span-8">
            {/* info */}
            <div className="col-span-12 md:col-span-6">
                <Title title={title} />
                <Description description={description} />
                <PublishedAt publishedAt={publishedAt} />
            </div>
            {/* thumb */}
            <div className="col-span-12 md:col-span-6">
                {urlToImage && < img className="w-full" src={urlToImage} alt="thumb" />}
            </div>
        </div>
    );
};


export const NewsItem: FC<z.infer<typeof ArticleSchema>> = ({ title, description, publishedAt }) => {
    return (
        <div className="col-span-12 md:col-span-6 lg:col-span-4">
            {/* info */}
            <div className="col-span-12 md:col-span-4">
                <Title title={title} />
                <Description description={description} />
                <PublishedAt publishedAt={publishedAt} />
            </div>
        </div>
    );
};

export const NewsItemRightIncludeImage: FC<z.infer<typeof ArticleSchema>> = ({ title, description, publishedAt, urlToImage }) => {
    return (
        <div className="col-span-12 md:col-span-8">
            {urlToImage && < img className="w-full" src={urlToImage} alt="thumb" />}
            <div className="col-span-12 mt-6 md:col-span-4">
                <Title title={title} />
                <Description description={description} />
                {publishedAt && <PublishedAt publishedAt={publishedAt} />}
            </div>
        </div>
    );
};

export const NewsItemRight: FC<z.infer<typeof ArticleSchema>> = ({ title, description, publishedAt }) => {
    return (
        <div className="col-span-12 pt-6 md:col-span-8">
            <div className="col-span-12 md:col-span-4">
                <Title title={title} />
                <Description description={description} />
                {publishedAt && <PublishedAt publishedAt={publishedAt} />}
            </div>
        </div>
    );
};

export default NewsItemIncludeImage;
