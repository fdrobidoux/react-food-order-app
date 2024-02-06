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

export function usePostFetch(fetchFn, jsonObject) {
  const [isPosting, setIsPosting] = useState(false);
  const [error, setError] = useState(null);
  const [statusCode, setStatusCode] = useState(-1);
  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    async function postData() {
      setIsPosting(true);
      
      try {
        const _statusCode = await fetchFn();
        setStatusCode(_statusCode);
      } catch (e) {
        setIsPosting(false);
        setError({ message: e.message || "Failed to fetch data." });
      }
      
      setIsPosting(false);
    }

    postData();
  }, [fetchFn]);

  return { isPosting, error, statusCode };
}