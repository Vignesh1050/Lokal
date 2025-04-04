// App.js
import React from 'react';
import { BookmarksProvider } from './src/context/BookmarksContext';
import RootNavigator from './src/navigation/RootNavigator';

export default function App() {
  return (
    <BookmarksProvider>
      <RootNavigator />
    </BookmarksProvider>
  );
}

