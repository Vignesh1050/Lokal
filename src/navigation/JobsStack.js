// src/navigation/JobsStack.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import JobsListScreen from '../screens/JobsListScreen';
import JobDetailScreen from '../screens/JobDetailScreen';

const Stack = createNativeStackNavigator();

export default function JobsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="JobsList"
        component={JobsListScreen}
        options={{ title: 'Jobs' }}
      />
      <Stack.Screen
        name="JobDetail"
        component={JobDetailScreen}
        options={{ title: 'Job Detail' }}
      />
    </Stack.Navigator>
  );
}
