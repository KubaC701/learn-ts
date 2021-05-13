import { useEffect, useState } from 'react';

import fetchData from '../helpers/fetchData';

import { FetchObject } from '../types/FetchObject';

export default <Data>(url: string, dependencies: unknown[] = []): FetchObject<Data> => {
  const [data, setData] = useState<Data>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setIsLoading(true);

    fetchData(url, {
      atLast: () => setIsLoading(false),
      reject: setError,
      resolve: setData,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, ...dependencies]);
  return { data, error, isLoading };
};
