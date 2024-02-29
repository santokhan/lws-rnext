import { Fragment } from 'react';
import { ArticleListSchema, ArticleListSchemaType } from '../../../utils/schema';
import useFetchApiData from '../../../hook/news-feeder';
import NewsItemIncludeImage, { NewsItem, NewsItemIncludeImage2, NewsItemRight, NewsItemRightIncludeImage } from './news-item';
import { useNewsCategory } from '../../../context/news-category';
import { newsFeedURL } from '../../../utils/url';

const GridLeft = () => {
    const { category } = useNewsCategory();

    const { loading, error, data } = useFetchApiData<{ articles: ArticleListSchemaType }>(`${newsFeedURL}top-headlines?category=${category}`);

    if (loading) {
        return 'Loading...';
    }

    if (!data?.articles) {
        console.log(error);
        return null;
    }

    const validatedArticles = ArticleListSchema.parse(data.articles);

    if (!validatedArticles) {
        return null;
    }

    return (
        <div className="col-span-12 grid grid-cols-12 gap-6 self-start xl:col-span-8">
            {validatedArticles.filter((item, index) => index > 2).slice(0, 9).map((item, index) => {
                if (index == 0) {
                    return <NewsItemIncludeImage key={index} {...item} />
                } else if (index == 1) {
                    return <NewsItemIncludeImage2 key={index} {...item} />
                } else {
                    return <NewsItem key={index} {...item} />
                }
            })}
        </div>
    );
};

const GridRight = () => {
    const { loading, error, data } = useFetchApiData<{ articles: ArticleListSchemaType }>(`${newsFeedURL}top-headlines`);

    if (loading) {
        return 'Loading...';
    }

    if (!data?.articles) {
        console.log(error);
        return null;
    }

    const validatedArticles = ArticleListSchema.parse(data.articles);

    if (!validatedArticles) {
        return null;
    }

    const length = validatedArticles.length;
    const random = Math.random();

    return (
        <div className="col-span-12 self-start xl:col-span-4">
            <div className="space-y-6 divide-y-2 divide-[#D5D1C9]">
                {/* news item */}
                {validatedArticles.slice(random * (length - 5), random * length).map((item, index) => (
                    <Fragment key={index}>
                        {index == 0 ? <NewsItemRightIncludeImage {...item} /> : <NewsItemRight {...item} />}
                    </Fragment>
                ))}
                {/* news item ends */}
            </div>
        </div>
    );
};

const Grid = () => {

    return (
        <>
            <div className="container mx-auto grid grid-cols-12 gap-8">
                <GridLeft />
                <GridRight />
            </div>
        </>
    );
};

export default Grid;
