// src/context/BookmarksContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BookmarksContext = createContext();

export function BookmarksProvider({ children }) {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBookmarks();
  }, []);

  const loadBookmarks = async () => {
    try {
      const stored = await AsyncStorage.getItem('bookmarkedJobs');
      const parsed = stored ? JSON.parse(stored) : [];
      setBookmarks(parsed);
    } catch (err) {
      console.log('Error loading bookmarks:', err);
    } finally {
      setLoading(false);
    }
  };

  const saveBookmarks = async (updated) => {
    setBookmarks(updated);
    await AsyncStorage.setItem('bookmarkedJobs', JSON.stringify(updated));
  };

  const addBookmark = async (job) => {
    const exists = bookmarks.some((b) => b.id === job.id);
    if (!exists) {
      const updated = [...bookmarks, job];
      await saveBookmarks(updated);
    }
  };

  const removeBookmark = async (jobId) => {
    const updated = bookmarks.filter((b) => b.id !== jobId);
    await saveBookmarks(updated);
  };

  const isBookmarked = (jobId) => {
    return bookmarks.some((b) => b.id === jobId);
  };

  return (
    <BookmarksContext.Provider
      value={{
        bookmarks,
        loading,
        addBookmark,
        removeBookmark,
        isBookmarked,
      }}
    >
      {children}
    </BookmarksContext.Provider>
  );
}

export function useBookmarks() {
  return useContext(BookmarksContext);
}
