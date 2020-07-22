import React, { useEffect, useState } from 'react';

export const useFetch = (url: string) => {
  const baseUrl = 'https://finnhub.io/api/v1';
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${baseUrl}${url}`);
      const json = await res.json();

      if (!res.ok) {
        throw new Error(`Whoops, ${json.message}`);
      }

      setResponse(json);
      setIsLoading(false);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { isLoading, response, error };
};
