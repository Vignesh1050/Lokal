// src/navigation/RootNavigator.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Our stacks and screens
import JobsStack from './JobsStack';
import BookmarksScreen from '../screens/BookmarksScreen';

const Tab = createBottomTabNavigator();

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="JobsTab"
          component={JobsStack}
          options={{ title: 'Jobs' }}
        />
        <Tab.Screen
          name="BookmarksTab"
          component={BookmarksScreen}
          options={{ title: 'Bookmarks' }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
