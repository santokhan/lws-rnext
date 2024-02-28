import { FC } from 'react';
import Grid from './grid/grid';
import { SearchResults } from './search-results';
import { useSearchContext } from '../../context/search';


const Main: FC = () => {
    const { query } = useSearchContext();

    return (
        <main className="my-10 lg:my-14">
            {query ? <SearchResults /> : <Grid />}
        </main>
    );
};

export default Main;
