import { useEffect, useState } from 'react';

export type UseFetchOptions = {
  fetchOnInit?: boolean;
};

const useFetch = <T>(
  fetcher: () => Promise<T>,
  { fetchOnInit = true }: UseFetchOptions = {},
) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [refresh, setRefresh] = useState<boolean>(fetchOnInit);

  useEffect(() => {
    if (!refresh) return;

    async function fetchData() {
      setLoading(true);
      try {
        const result = await fetcher();
        setData(result);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        }
      }

      setLoading(false);
      setRefresh(false);
    }

    fetchData();
  }, [refresh]);

  function reset() {
    setData(null);
    setLoading(false);
    setError(null);
    setRefresh(false);
  }

  return { data, loading, error, refetch: () => setRefresh(true), reset };
};

export default useFetch;
