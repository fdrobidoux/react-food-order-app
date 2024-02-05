import { useEffect, useState } from "react";

export function useFetch(fetchFn, initialValue) {
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);
  const [fetchedData, setFetchedData] = useState(initialValue);
  
  useEffect(() => {
    async function fetchData() {
      setIsFetching(true);
      
      try {
        const _fetchedData = await fetchFn();
        setFetchedData(_fetchedData);
      } catch (e) {
        setIsFetching(false);
        setError({ message: e.message || "Failed to fetch data." });
      }
      
      setIsFetching(false);
    }

    fetchData();
  }, [fetchFn]);

  return {isFetching, error, fetchedData, setFetchedData};
}