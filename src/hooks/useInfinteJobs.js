// src/hooks/useInfiniteJobs.js
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

export default function useInfiniteJobs() {
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const fetchJobs = useCallback(async (currentPage) => {
    if (loading) return;
    setLoading(true);
    setError(null);

    try {
      const url = `https://testapi.getlokalapp.com/common/jobs?page=${currentPage}`;
      const response = await axios.get(url);
      const newJobs = response.data?.results || [];

      if (newJobs.length === 0) {
        setHasMore(false);
      } else {
        setJobs((prev) => [...prev, ...newJobs]);
      }
    } catch (err) {
      console.log('Error fetching jobs:', err);
      setError('Failed to fetch jobs. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [loading]);

  useEffect(() => {
    fetchJobs(page);
  }, [page, fetchJobs]);

  const loadNextPage = () => {
    if (!loading && hasMore) {
      setPage((prev) => prev + 1);
    }
  };

  return {
    jobs,
    loading,
    error,
    hasMore,
    loadNextPage,
  };
}
// src/hooks/useInfiniteJobs.js
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

export default function useInfiniteJobs() {
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const fetchJobs = useCallback(async (currentPage) => {
    if (loading) return;
    setLoading(true);
    setError(null);

    try {
      const url = `https://testapi.getlokalapp.com/common/jobs?page=${currentPage}`;
      const response = await axios.get(url);
      const newJobs = response.data?.results || [];

      if (newJobs.length === 0) {
        setHasMore(false);
      } else {
        setJobs((prev) => [...prev, ...newJobs]);
      }
    } catch (err) {
      console.log('Error fetching jobs:', err);
      setError('Failed to fetch jobs. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [loading]);

  useEffect(() => {
    fetchJobs(page);
  }, [page, fetchJobs]);

  const loadNextPage = () => {
    if (!loading && hasMore) {
      setPage((prev) => prev + 1);
    }
  };

  return {
    jobs,
    loading,
    error,
    hasMore,
    loadNextPage,
  };
}
