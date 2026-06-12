import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProgressScreen() {
  const [learnedWords, setLearnedWords] = useState([]);
  const [stats, setStats] = useState({
    totalPlayTime: 0,
    totalLearningTime: 0,
    gamesPlayed: 0,
    wordsLearned: 0,
    daysActive: 0,
  });

  useEffect(() => {
    loadProgress();
  }, []);

  const loadProgress = async () => {
    try {
      const words = await AsyncStorage.getItem('learnedWords');
      const savedStats = await AsyncStorage.getItem('childStats');

      if (words) {
        const wordList = JSON.parse(words);
        setLearnedWords(wordList);
        setStats((prev) => ({ ...prev, wordsLearned: wordList.length }));
      }

      if (savedStats) {
        setStats((prev) => ({ ...prev, ...JSON.parse(savedStats) }));
      }
    } catch (error) {
      console.log('Error loading progress:', error);
    }
  };

  const achievements = [
    {
      id: 1,
      name: 'First Words',
      description: 'Learn your first 5 words',
      emoji: '🎤',
      unlocked: stats.wordsLearned >= 5,
      progress: Math.min(stats.wordsLearned / 5, 1),
    },
    {
      id: 2,
      name: 'Word Master',
      description: 'Learn 10 words',
      emoji: '📚',
      unlocked: stats.wordsLearned >= 10,
      progress: Math.min(stats.wordsLearned / 10, 1),
    },
    {
      id: 3,
      name: 'Play Champion',
      description: 'Play 10 games',
      emoji: '🏆',
      unlocked: stats.gamesPlayed >= 10,
      progress: Math.min(stats.gamesPlayed / 10, 1),
    },
    {
      id: 4,
      name: 'Learning Streak',
      description: '7 days active',
      emoji: '🔥',
      unlocked: stats.daysActive >= 7,
      progress: Math.min(stats.daysActive / 7, 1),
    },
    {
      id: 5,
      name: 'Superstar',
      description: 'Learn 20 words',
      emoji: '⭐',
      unlocked: stats.wordsLearned >= 20,
      progress: Math.min(stats.wordsLearned / 20, 1),
    },
    {
      id: 6,
      name: 'Learning Legend',
      description: 'Play 30 games',
      emoji: '👑',
      unlocked: stats.gamesPlayed >= 30,
      progress: Math.min(stats.gamesPlayed / 30, 1),
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.statsSection}>
        <Text style={styles.sectionTitle}>📊 Development Progress</Text>
        <View style={styles.statsGrid}>
          <View style={[styles.statCard, { backgroundColor: '#FF6B9D' }]}>
            <Icon name="book" size={32} color="#fff" />
            <Text style={styles.statNumber}>{stats.wordsLearned}</Text>
            <Text style={styles.statLabel}>Words Learned</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: '#4ECDC4' }]}>
            <Icon name="game-controller" size={32} color="#fff" />
            <Text style={styles.statNumber}>{stats.gamesPlayed}</Text>
            <Text style={styles.statLabel}>Games Played</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: '#FFD93D' }]}>
            <Icon name="flame" size={32} color="#fff" />
            <Text style={styles.statNumber}>{stats.daysActive}</Text>
            <Text style={styles.statLabel}>Days Active</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: '#667eea' }]}>
            <Icon name="time" size={32} color="#fff" />
            <Text style={styles.statNumber}>
              {Math.round(stats.totalLearningTime / 60)}h
            </Text>
            <Text style={styles.statLabel}>Learning Time</Text>
          </View>
        </View>
      </View>

      <View style={styles.achievementsSection}>
        <Text style={styles.sectionTitle}>🏅 Achievements</Text>
        <View style={styles.achievementsGrid}>
          {achievements.map((achievement) => (
            <View
              key={achievement.id}
              style={[
                styles.achievementCard,
                !achievement.unlocked && styles.achievementCardLocked,
              ]}
            >
              <Text style={styles.achievementEmoji}>{achievement.emoji}</Text>
              <Text style={styles.achievementName}>{achievement.name}</Text>
              <Text style={styles.achievementDescription}>
                {achievement.description}
              </Text>
              <View style={styles.progressBarAndroid}>
                <View
                  style={[
                    styles.progressFill,
                    {
                      width: `${achievement.progress * 100}%`,
                      backgroundColor: achievement.unlocked ? '#667eea' : '#ccc',
                    },
                  ]}
                />
              </View>
              {achievement.unlocked && (
                <View style={styles.unlockedBadge}>
                  <Icon name="checkmark-circle" size={20} color="#667eea" />
                </View>
              )}
            </View>
          ))}
        </View>
      </View>

      <View style={styles.tipsSection}>
        <Text style={styles.sectionTitle}>💡 Tips for Healthy Development</Text>
        <View style={styles.tipCard}>
          <Icon name="mic" size={20} color="#FF6B9D" />
          <View style={styles.tipContent}>
            <Text style={styles.tipTitle}>Speech Development</Text>
            <Text style={styles.tipDescription}>
              Talk to your child throughout the day.
            </Text>
          </View>
        </View>
        <View style={styles.tipCard}>
          <Icon name="music" size={20} color="#4ECDC4" />
          <View style={styles.tipContent}>
            <Text style={styles.tipTitle}>Language Skills</Text>
            <Text style={styles.tipDescription}>
              Sing songs and nursery rhymes daily.
            </Text>
          </View>
        </View>
        <View style={styles.tipCard}>
          <Icon name="game-controller" size={20} color="#FFD93D" />
          <View style={styles.tipContent}>
            <Text style={styles.tipTitle}>Interactive Learning</Text>
            <Text style={styles.tipDescription}>
              Use this app daily for 15-20 minutes.
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.encouragementSection}>
        <Text style={styles.encouragementEmoji}>🌟</Text>
        <Text style={styles.encouragementText}>
          Your child is doing amazing! Every little step counts! 💪
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FF',
    paddingBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  statsSection: {
    marginHorizontal: 15,
    marginVertical: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    width: '48%',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  statNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginVertical: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#fff',
    textAlign: 'center',
    opacity: 0.9,
  },
  achievementsSection: {
    marginHorizontal: 15,
    marginBottom: 25,
  },
  achievementsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  achievementCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#667eea',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  achievementCardLocked: {
    opacity: 0.6,
    borderColor: '#ddd',
  },
  achievementEmoji: {
    fontSize: 40,
    marginBottom: 10,
  },
  achievementName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  achievementDescription: {
    fontSize: 11,
    color: '#999',
    textAlign: 'center',
    marginBottom: 10,
  },
  progressBarAndroid: {
    width: '100%',
    height: 6,
    backgroundColor: '#ddd',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  unlockedBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  tipsSection: {
    marginHorizontal: 15,
    marginBottom: 25,
  },
  tipCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  tipContent: {
    flex: 1,
    marginLeft: 15,
  },
  tipTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  tipDescription: {
    fontSize: 12,
    color: '#666',
    lineHeight: 18,
  },
  encouragementSection: {
    marginHorizontal: 15,
    backgroundColor: '#667eea',
    borderRadius: 15,
    padding: 25,
    alignItems: 'center',
    marginBottom: 20,
  },
  encouragementEmoji: {
    fontSize: 50,
    marginBottom: 15,
  },
  encouragementText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 24,
  },
});