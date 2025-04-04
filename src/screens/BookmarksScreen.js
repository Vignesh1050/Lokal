// src/screens/BookmarksScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useIsFocused } from '@react-navigation/native';

export default function BookmarksScreen() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Reload the bookmarks whenever screen is focused
  useEffect(() => {
    if (isFocused) {
      loadBookmarks();
    }
  }, [isFocused]);

  const loadBookmarks = async () => {
    setLoading(true);
    try {
      const stored = await AsyncStorage.getItem('bookmarkedJobs');
      const parsed = stored ? JSON.parse(stored) : [];
      setBookmarks(parsed);
    } catch (error) {
      console.log('Error loading bookmarks:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <ActivityIndicator style={{ marginTop: 50 }} size="large" />;
  }

  if (!loading && bookmarks.length === 0) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>No Bookmarks</Text>
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('JobDetail', { job: item })}
      style={{
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        marginVertical: 5,
        marginHorizontal: 10,
        borderRadius: 6,
      }}
    >
      <Text style={{ fontWeight: 'bold' }}>{item.title}</Text>
      <Text>Location: {item.primary_details?.Place}</Text>
      <Text>Salary: {item.primary_details?.Salary}</Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={bookmarks}
      keyExtractor={(item, index) => item.id?.toString() || index.toString()}
      renderItem={renderItem}
    />
  );
}
