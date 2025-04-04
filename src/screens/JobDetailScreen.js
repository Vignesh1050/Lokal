// src/screens/JobDetailScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function JobDetailScreen({ route }) {
  const { job } = route.params;
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    checkBookmark();
  }, []);

  const checkBookmark = async () => {
    try {
      const stored = await AsyncStorage.getItem('bookmarkedJobs');
      const bookmarks = stored ? JSON.parse(stored) : [];
      const found = bookmarks.some((b) => b.id === job.id);
      setIsBookmarked(found);
    } catch (error) {
      console.log('Error checking bookmark:', error);
    }
  };

  const toggleBookmark = async () => {
    try {
      const stored = await AsyncStorage.getItem('bookmarkedJobs');
      let bookmarks = stored ? JSON.parse(stored) : [];

      if (isBookmarked) {
        // remove
        bookmarks = bookmarks.filter((b) => b.id !== job.id);
      } else {
        // add
        bookmarks.push(job);
      }
      await AsyncStorage.setItem('bookmarkedJobs', JSON.stringify(bookmarks));
      setIsBookmarked(!isBookmarked);
    } catch (error) {
      console.log('Error toggling bookmark:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{job.title}</Text>
      <Text>Location: {job.primary_details?.Place}</Text>
      <Text>Salary: {job.primary_details?.Salary}</Text>
      <Text>Phone: {job.whatsapp_no}</Text>

      {/* Example of reading content from job.contentV3 */}
      <Text style={{ marginTop: 10 }}>
        {job.contentV3?.V3?.[3]?.field_value ?? 'No description.'}
      </Text>

      <Button
        title={isBookmarked ? 'Remove Bookmark' : 'Bookmark'}
        onPress={toggleBookmark}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontWeight: 'bold', fontSize: 18, marginBottom: 8 },
});
