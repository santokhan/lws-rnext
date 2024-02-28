import { useState, useEffect } from 'react';

interface FetchResult<T> {
    loading: boolean;
    error: unknown;
    data: T | null;
}

function useFetchApiData<T>(url: string): FetchResult<T> {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<unknown>(null);
    const [data, setData] = useState<T | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const jsonData: T = await response.json();
                setData(jsonData);
            } catch (error: unknown) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();

        // Cleanup function
        return () => {
            // Cleanup logic if needed
        };
    }, [url]);

    return { loading, error, data };
}

export default useFetchApiData;
