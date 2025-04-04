// src/screens/JobsListScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

export default function JobsListScreen() {
  const navigation = useNavigation();

  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const fetchJobs = async (currentPage) => {
    if (loading) return;
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `https://testapi.getlokalapp.com/common/jobs?page=${currentPage}`
      );
      const newJobs = response.data?.results || [];

      if (newJobs.length === 0) {
        setHasMore(false);
      } else {
        setJobs((prev) => [...prev, ...newJobs]);
      }
    } catch (err) {
      console.log('Error fetching jobs:', err);
      setError('Something went wrong while fetching jobs.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs(page);
  }, [page]);

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      setPage((prev) => prev + 1);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('JobDetail', { job: item })}
      style={{
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginVertical: 5,
        marginHorizontal: 10,
        borderRadius: 6
      }}
    >
      <Text style={{ fontWeight: 'bold' }}>{item.title}</Text>
      <Text>Location: {item.primary_details?.Place}</Text>
      <Text>Salary: {item.primary_details?.Salary}</Text>
      <Text>Phone: {item.whatsapp_no || 'N/A'}</Text>
    </TouchableOpacity>
  );

  // Show loading spinner at the bottom while fetching next page
  const renderFooter = () => {
    if (!loading) return null;
    return <ActivityIndicator style={{ margin: 20 }} size="large" />;
  };

  // If error occurred, show a retry
  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>{error}</Text>
        <TouchableOpacity
          onPress={() => fetchJobs(page)}
          style={{ marginTop: 10, padding: 10, backgroundColor: 'lightblue' }}
        >
          <Text>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // If not loading and no jobs found => empty state
  if (!loading && jobs.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>No jobs found.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={jobs}
      keyExtractor={(item, index) => item.id?.toString() || index.toString()}
      renderItem={renderItem}
      ListFooterComponent={renderFooter}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.5}
    />
  );
}
