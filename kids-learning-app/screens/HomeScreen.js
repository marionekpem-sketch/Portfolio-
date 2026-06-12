import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

export default function HomeScreen({ navigation }) {
  const [childAge] = useState('6 months');

  const quickAccessButtons = [
    {
      id: 1,
      name: 'Learn Words',
      emoji: '📚',
      icon: 'book',
      color: '#667eea',
      screen: 'Learn',
      description: 'Speech development',
    },
    {
      id: 2,
      name: 'Play Games',
      emoji: '🎮',
      icon: 'game-controller',
      color: '#FF6B9D',
      screen: 'Play',
      description: 'Fun & playful',
    },
    {
      id: 3,
      name: 'Reminders',
      emoji: '🔔',
      icon: 'bell',
      color: '#4ECDC4',
      screen: 'Reminders',
      description: 'Daily care schedule',
    },
    {
      id: 4,
      name: 'Progress',
      emoji: '📊',
      icon: 'stats-chart',
      color: '#FFD93D',
      screen: 'Progress',
      description: 'Track development',
    },
  ];

  const features = [
    {
      title: 'Speech & Language',
      description: 'Interactive word learning with voice guidance',
      emoji: '🎤',
      color: '#FF6B9D',
    },
    {
      title: 'Learning Games',
      description: '6+ colorful games for cognitive development',
      emoji: '🎨',
      color: '#4ECDC4',
    },
    {
      title: 'Daily Reminders',
      description: 'Feeding, water, sleep, diaper changes & playtime',
      emoji: '⏰',
      color: '#FFD93D',
    },
    {
      title: 'Progress Tracking',
      description: 'Monitor milestones and celebrate achievements',
      emoji: '🏆',
      color: '#667eea',
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Welcome Banner */}
      <View style={styles.banner}>
        <Text style={styles.bannerWelcome}>Welcome! 👶</Text>
        <Text style={styles.bannerSubtitle}>
          Let's help your baby learn and grow!
        </Text>
        <Text style={styles.bannerAge}>Age: {childAge}</Text>
      </View>

      {/* Quick Access Buttons */}
      <View style={styles.quickAccessSection}>
        <Text style={styles.sectionTitle}>Quick Access</Text>
        <View style={styles.buttonsGrid}>
          {quickAccessButtons.map((button) => (
            <TouchableOpacity
              key={button.id}
              style={[styles.quickButton, { backgroundColor: button.color }]}
              onPress={() => navigation.navigate(button.screen)}
              activeOpacity={0.8}
            >
              <Text style={styles.quickButtonEmoji}>{button.emoji}</Text>
              <Text style={styles.quickButtonName}>{button.name}</Text>
              <Text style={styles.quickButtonDesc}>{button.description}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Features Section */}
      <View style={styles.featuresSection}>
        <Text style={styles.sectionTitle}>✨ Key Features</Text>
        {features.map((feature, index) => (
          <View key={index} style={[styles.featureCard, { borderLeftColor: feature.color }]}>
            <View style={[styles.featureEmojiBox, { backgroundColor: feature.color }]}>
              <Text style={styles.featureEmoji}>{feature.emoji}</Text>
            </View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>{feature.title}</Text>
              <Text style={styles.featureDescription}>
                {feature.description}
              </Text>
            </View>
          </View>
        ))}
      </View>

      {/* Tips Section */}
      <View style={styles.tipsSection}>
        <Text style={styles.sectionTitle}>💡 Parent Tips</Text>
        <View style={styles.tipBox}>
          <Icon name="bulb" size={24} color="#FFD93D" />
          <View style={styles.tipText}>
            <Text style={styles.tipTitle}>Keep Sessions Short</Text>
            <Text style={styles.tipDescription}>
              15-20 minute sessions work best. Multiple short sessions beat one long one!
            </Text>
          </View>
        </View>
        <View style={styles.tipBox}>
          <Icon name="happy" size={24} color="#FF6B9D" />
          <View style={styles.tipText}>
            <Text style={styles.tipTitle}>Make It Fun</Text>
            <Text style={styles.tipDescription}>
              Let your baby explore at their own pace. Celebrate every attempt!
            </Text>
          </View>
        </View>
        <View style={styles.tipBox}>
          <Icon name="repeat" size={24} color="#4ECDC4" />
          <View style={styles.tipText}>
            <Text style={styles.tipTitle}>Repetition is Key</Text>
            <Text style={styles.tipDescription}>
              Revisit learned words daily. Consistency builds stronger memory.
            </Text>
          </View>
        </View>
      </View>

      {/* Daily Challenge */}
      <View style={styles.challengeSection}>
        <Text style={styles.sectionTitle}>🎯 Today's Challenge</Text>
        <View style={styles.challengeCard}>
          <Text style={styles.challengeEmoji}>🎤</Text>
          <Text style={styles.challengeTitle}>Learn 3 New Words</Text>
          <Text style={styles.challengeDescription}>
            Pick three new words from the Learning section and practice them!
          </Text>
          <TouchableOpacity style={styles.challengeButton}>
            <Text style={styles.challengeButtonText}>Start Challenge</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Age Milestones */}
      <View style={styles.milestoneSection}>
        <Text style={styles.sectionTitle}>🌱 This Month's Milestones</Text>
        <View style={styles.milestoneBox}>
          <View style={styles.milestoneBullet}>
            <Icon name="checkmark-circle" size={20} color="#667eea" />
            <Text style={styles.milestoneText}>Babbling with consonants</Text>
          </View>
          <View style={styles.milestoneBullet}>
            <Icon name="checkmark-circle" size={20} color="#667eea" />
            <Text style={styles.milestoneText}>Responding to simple words</Text>
          </View>
          <View style={styles.milestoneBullet}>
            <Icon name="checkmark-circle" size={20} color="#667eea" />
            <Text style={styles.milestoneText}>Gaining interest in colors</Text>
          </View>
          <View style={styles.milestoneBullet}>
            <Icon name="checkmark-circle" size={20} color="#667eea" />
            <Text style={styles.milestoneText}>Starting to recognize shapes</Text>
          </View>
        </View>
      </View>

      {/* Support & Resources */}
      <View style={styles.resourceSection}>
        <Text style={styles.sectionTitle}>📖 Resources</Text>
        <View style={styles.resourceBox}>
          <Icon name="help-circle" size={24} color="#667eea" />
          <View style={styles.resourceText}>
            <Text style={styles.resourceTitle}>Parent Guide</Text>
            <Text style={styles.resourceDescription}>
              Tips for supporting language development at home
            </Text>
          </View>
          <Icon name="chevron-forward" size={24} color="#999" />
        </View>
        <View style={styles.resourceBox}>
          <Icon name="settings" size={24} color="#667eea" />
          <View style={styles.resourceText}>
            <Text style={styles.resourceTitle}>Settings</Text>
            <Text style={styles.resourceDescription}>
              Customize reminders and learning preferences
            </Text>
          </View>
          <Icon name="chevron-forward" size={24} color="#999" />
        </View>
      </View>

      {/* Encouragement Message */}
      <View style={styles.encouragement}>
        <Text style={styles.encouragementEmoji}>🌟</Text>
        <Text style={styles.encouragementText}>
          You're doing an amazing job! Keep nurturing your child's development.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FF',
  },
  banner: {
    backgroundColor: '#667eea',
    paddingVertical: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  bannerWelcome: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  bannerSubtitle: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.95,
    marginBottom: 15,
    textAlign: 'center',
  },
  bannerAge: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
    backgroundColor: 'rgba(0,0,0,0.1)',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  quickAccessSection: {
    marginHorizontal: 15,
    marginVertical: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  buttonsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickButton: {
    width: '48%',
    borderRadius: 20,
    padding: 18,
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  quickButtonEmoji: {
    fontSize: 40,
    marginBottom: 8,
  },
  quickButtonName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  quickButtonDesc: {
    fontSize: 11,
    color: '#fff',
    opacity: 0.85,
    textAlign: 'center',
  },
  featuresSection: {
    marginHorizontal: 15,
    marginBottom: 25,
  },
  featureCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginBottom: 12,
    borderLeftWidth: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  featureEmojiBox: {
    width: 60,
    height: 60,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  featureEmoji: {
    fontSize: 30,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 12,
    color: '#666',
    lineHeight: 18,
  },
  tipsSection: {
    marginHorizontal: 15,
    marginBottom: 25,
  },
  tipBox: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 1,
  },
  tipText: {
    flex: 1,
    marginLeft: 12,
  },
  tipTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  tipDescription: {
    fontSize: 12,
    color: '#666',
    lineHeight: 18,
  },
  challengeSection: {
    marginHorizontal: 15,
    marginBottom: 25,
  },
  challengeCard: {
    backgroundColor: '#FFF9E6',
    borderRadius: 15,
    padding: 25,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFD93D',
  },
  challengeEmoji: {
    fontSize: 50,
    marginBottom: 12,
  },
  challengeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  challengeDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 15,
  },
  challengeButton: {
    backgroundColor: '#FFD93D',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 25,
  },
  challengeButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  milestoneSection: {
    marginHorizontal: 15,
    marginBottom: 25,
  },
  milestoneBox: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  milestoneBullet: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  milestoneText: {
    fontSize: 14,
    color: '#333',
    marginLeft: 10,
    flex: 1,
  },
  resourceSection: {
    marginHorizontal: 15,
    marginBottom: 25,
  },
  resourceBox: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 1,
  },
  resourceText: {
    flex: 1,
    marginLeft: 15,
  },
  resourceTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 3,
  },
  resourceDescription: {
    fontSize: 12,
    color: '#999',
  },
  encouragement: {
    marginHorizontal: 15,
    marginBottom: 30,
    backgroundColor: '#667eea',
    borderRadius: 15,
    paddingVertical: 25,
    alignItems: 'center',
  },
  encouragementEmoji: {
    fontSize: 40,
    marginBottom: 10,
  },
  encouragementText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
    paddingHorizontal: 20,
    lineHeight: 24,
  },
});