import useFetchApiData from "../../hook/news-feeder";
import { ArticleListSchema, ArticleListSchemaType } from "../../utils/schema";
import { newsFeedURL } from "../../utils/url";
import { CloseCircle } from "iconsax-react";
import { Description, PublishedAt, Title } from "./grid/news-item";
import { useSearchContext } from "../../context/search";

export const SearchResults = () => {
    const { query, changeQuery } = useSearchContext();

    const { loading, error, data } = useFetchApiData<{ result: ArticleListSchemaType }>(`${newsFeedURL}search?q=${query}`);

    if (loading) {
        return 'Loading...';
    }

    if (!data?.result) {
        console.log(error);
        return null;
    }

    const validatedResult = ArticleListSchema.parse(data.result);

    if (!validatedResult) {
        return null;
    }

    return (
        <div className="container mx-auto space-y-8">
            <p className="text-lg flex items-center gap-2">
                Search results <button type="button" onClick={() => { changeQuery('') }}><CloseCircle className='w-4 h-4' /></button>
            </p>
            {
                validatedResult.map(({ title, description, urlToImage, publishedAt }, index) => {
                    return (
                        <div className="grid grid-cols-12 gap-6" key={index}>
                            <div className="col-span-4">
                                {urlToImage && <img className="w-full object-cover" src={urlToImage} alt="thumb" />}
                            </div>
                            <div className="col-span-8">
                                <Title title={title} />
                                <Description description={description} />
                                <PublishedAt publishedAt={publishedAt} />
                            </div>
                        </div>
                    )
                })
            }
        </div>
    );
};
