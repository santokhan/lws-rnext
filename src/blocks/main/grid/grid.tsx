import { Fragment } from 'react';
import { ArticleListSchemaType } from '../../../utils/schema';
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

    return (
        <div className="col-span-12 grid grid-cols-12 gap-6 self-start xl:col-span-8">
            {data.articles.filter((item, index) => index > 2).slice(0, 9).map((item, index) => {
                if (index == 0) {
                    return <NewsItemIncludeImage {...item} />
                } else if (index == 1) {
                    return <NewsItemIncludeImage2 {...item} />
                } else {
                    return <NewsItem {...item} />
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

    const length = data.articles.length;
    const random = Math.random();

    return (
        <div className="col-span-12 self-start xl:col-span-4">
            <div className="space-y-6 divide-y-2 divide-[#D5D1C9]">
                {/* news item */}
                {data.articles.slice(random * (length - 5), random * length).map((item, index) => (
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
