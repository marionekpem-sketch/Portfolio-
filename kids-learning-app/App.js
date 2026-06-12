import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import Tts from 'react-native-tts';
import Sound from 'react-native-sound';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LearningScreen from './screens/LearningScreen';
import PlayScreen from './screens/PlayScreen';
import RemindersScreen from './screens/RemindersScreen';
import ProgressScreen from './screens/ProgressScreen';
import HomeScreen from './screens/HomeScreen';

const Tab = createBottomTabNavigator();

// Initialize TTS
Tts.setDefaultLanguage('en-US');
Tts.setDefaultRate(0.5);
Tts.setDefaultPitch(1.2);

export default function App() {
  const [childName, setChildName] = useState('Baby');

  useEffect(() => {
    loadChildName();
    setupNotifications();
  }, []);

  const loadChildName = async () => {
    try {
      const name = await AsyncStorage.getItem('childName');
      if (name) setChildName(name);
    } catch (error) {
      console.log('Error loading child name:', error);
    }
  };

  const setupNotifications = () => {
    // Notification setup for reminders
    // This would require push notification configuration
  };

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let iconColor = focused ? '#FF6B9D' : '#999';

            switch (route.name) {
              case 'Home':
                iconName = focused ? 'home' : 'home-outline';
                break;
              case 'Learn':
                iconName = focused ? 'book' : 'book-outline';
                break;
              case 'Play':
                iconName = focused ? 'happy' : 'happy-outline';
                break;
              case 'Reminders':
                iconName = focused ? 'bell' : 'bell-outline';
                break;
              case 'Progress':
                iconName = focused ? 'stats-chart' : 'stats-chart-outline';
                break;
              default:
                iconName = 'home';
            }

            return <Icon name={iconName} size={size} color={iconColor} />;
          },
          tabBarActiveTintColor: '#FF6B9D',
          tabBarInactiveTintColor: '#999',
          headerShown: true,
          headerStyle: {
            backgroundColor: '#667eea',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 18,
          },
        })}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: `Welcome ${childName}!` }}
        />
        <Tab.Screen
          name="Learn"
          component={LearningScreen}
          options={{ title: 'Learn & Speak' }}
        />
        <Tab.Screen
          name="Play"
          component={PlayScreen}
          options={{ title: 'Playtime Fun' }}
        />
        <Tab.Screen
          name="Reminders"
          component={RemindersScreen}
          options={{ title: 'Daily Reminders' }}
        />
        <Tab.Screen
          name="Progress"
          component={ProgressScreen}
          options={{ title: 'My Progress' }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});