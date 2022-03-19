import { useState } from 'react';

import { useUser } from '../context/user';

type fetchDataProps = {
  method?: 'get' | 'post' | 'put' | 'delete';
  url: string;
};

const useFetch = <T>() => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useUser();

  const fetchData = async ({ method = 'get', url }: fetchDataProps) => {
    setLoading(true);

    if (!user) {
      return;
    }

    const headers = {
      Authorization: `Bearer ${user.accessToken}`,
    };

    try {
      const response = await fetch(url, {
        method,
        headers,
      });
      setData(await response.json());
      return response;
    } catch (error) {
      setError((error as Error).message);
    }
    setLoading(false);
  };

  return { data, loading, error, fetchData };
};

export default useFetch;
