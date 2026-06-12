import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Switch,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

const REMINDERS = [
  {
    id: 1,
    name: 'Feeding Time',
    emoji: '🍼',
    icon: 'nutrition',
    color: '#FF6B9D',
    defaultTime: '08:00',
    frequency: 'Every 3 hours',
    description: 'Time to feed your baby',
  },
  {
    id: 2,
    name: 'Water Time',
    emoji: '💧',
    icon: 'water',
    color: '#4ECDC4',
    defaultTime: '10:00',
    frequency: 'Every 2 hours',
    description: 'Make sure baby stays hydrated',
  },
  {
    id: 3,
    name: 'Nap Time',
    emoji: '😴',
    icon: 'moon',
    color: '#9B59B6',
    defaultTime: '13:00',
    frequency: 'Daily',
    description: 'Time for a peaceful sleep',
  },
  {
    id: 4,
    name: 'Diaper Change',
    emoji: '👶',
    icon: 'baby',
    color: '#F1C40F',
    defaultTime: '09:00',
    frequency: 'Every 2-3 hours',
    description: 'Check and change diaper',
  },
  {
    id: 5,
    name: 'Play Time',
    emoji: '🎮',
    icon: 'game-controller',
    color: '#E74C3C',
    defaultTime: '11:00',
    frequency: 'Every 4 hours',
    description: 'Interactive playtime for learning',
  },
  {
    id: 6,
    name: 'Bath Time',
    emoji: '🛁',
    icon: 'water',
    color: '#3498DB',
    defaultTime: '18:00',
    frequency: 'Daily',
    description: 'Time for a relaxing bath',
  },
];

export default function RemindersScreen() {
  const [reminders, setReminders] = useState(
    REMINDERS.map((r) => ({ ...r, enabled: true }))
  );
  const [nextReminder, setNextReminder] = useState(null);

  useEffect(() => {
    loadReminders();
    calculateNextReminder();
    const interval = setInterval(calculateNextReminder, 60000);
    return () => clearInterval(interval);
  }, [reminders]);

  const loadReminders = async () => {
    try {
      const saved = await AsyncStorage.getItem('reminders');
      if (saved) {
        setReminders(JSON.parse(saved));
      }
    } catch (error) {
      console.log('Error loading reminders:', error);
    }
  };

  const saveReminders = async (updatedReminders) => {
    try {
      await AsyncStorage.setItem('reminders', JSON.stringify(updatedReminders));
    } catch (error) {
      console.log('Error saving reminders:', error);
    }
  };

  const toggleReminder = (id) => {
    const updated = reminders.map((r) =>
      r.id === id ? { ...r, enabled: !r.enabled } : r
    );
    setReminders(updated);
    saveReminders(updated);
  };

  const calculateNextReminder = () => {
    const enabledReminders = reminders.filter((r) => r.enabled);
    if (enabledReminders.length === 0) {
      setNextReminder(null);
      return;
    }

    let nextTime = null;
    enabledReminders.forEach((reminder) => {
      const reminderTime = moment(reminder.defaultTime, 'HH:mm');
      if (reminderTime.isAfter(moment())) {
        if (!nextTime || reminderTime.isBefore(nextTime)) {
          nextTime = reminder;
        }
      }
    });

    setNextReminder(nextTime);
  };

  const markAsCompleted = (id) => {
    const reminder = reminders.find((r) => r.id === id);
    Alert.alert(
      '✓ Great Job!',
      `You've completed "${reminder.name}"! 🎉`,
      [{ text: 'OK', style: 'default' }]
    );
  };

  return (
    <ScrollView style={styles.container}>
      {nextReminder && (
        <View style={[styles.nextReminderCard, { backgroundColor: nextReminder.color }]}>
          <Text style={styles.nextReminderLabel}>Next Reminder</Text>
          <Text style={styles.nextReminderEmoji}>{nextReminder.emoji}</Text>
          <Text style={styles.nextReminderName}>{nextReminder.name}</Text>
          <Text style={styles.nextReminderTime}>{nextReminder.defaultTime}</Text>
          <TouchableOpacity
            style={styles.notifyButton}
            onPress={() => markAsCompleted(nextReminder.id)}
          >
            <Icon name="checkmark-circle" size={20} color={nextReminder.color} />
            <Text style={styles.notifyButtonText}>Mark as Done</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📅 Today's Schedule</Text>
        <View style={styles.scheduleOverview}>
          <Text style={styles.scheduleText}>
            {reminders.filter((r) => r.enabled).length} reminders active today
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🔔 Your Reminders</Text>
        {reminders.map((reminder) => (
          <View key={reminder.id} style={styles.reminderCard}>
            <View style={styles.reminderLeft}>
              <View
                style={[styles.reminderEmojiBg, { backgroundColor: reminder.color }]}
              >
                <Text style={styles.reminderEmoji}>{reminder.emoji}</Text>
              </View>
              <View style={styles.reminderInfo}>
                <Text style={styles.reminderName}>{reminder.name}</Text>
                <Text style={styles.reminderTime}>{reminder.defaultTime}</Text>
                <Text style={styles.reminderFrequency}>{reminder.frequency}</Text>
              </View>
            </View>
            <View style={styles.reminderRight}>
              <Switch
                value={reminder.enabled}
                onValueChange={() => toggleReminder(reminder.id)}
                trackColor={{ false: '#ddd', true: '#667eea' }}
                thumbColor={reminder.enabled ? '#fff' : '#999'}
              />
            </View>
          </View>
        ))}
      </View>

      <View style={styles.tipsSection}>
        <Text style={styles.tipsTitle}>💡 Care Tips</Text>
        <View style={styles.tipCard}>
          <Icon name="checkmark-circle" size={20} color="#4ECDC4" />
          <Text style={styles.tipText}>
            Consistency helps baby develop healthy routines
          </Text>
        </View>
        <View style={styles.tipCard}>
          <Icon name="checkmark-circle" size={20} color="#FFD93D" />
          <Text style={styles.tipText}>
            Keep feeding and water times consistent daily
          </Text>
        </View>
        <View style={styles.tipCard}>
          <Icon name="checkmark-circle" size={20} color="#FF6B9D" />
          <Text style={styles.tipText}>
            Watch for signs of tiredness for better naps
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FF',
    paddingBottom: 20,
  },
  nextReminderCard: {
    marginHorizontal: 15,
    marginVertical: 20,
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
  },
  nextReminderLabel: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
    marginBottom: 10,
    fontWeight: '600',
  },
  nextReminderEmoji: {
    fontSize: 60,
    marginBottom: 10,
  },
  nextReminderName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  nextReminderTime: {
    fontSize: 18,
    color: '#fff',
    opacity: 0.95,
    marginBottom: 20,
  },
  notifyButton: {
    backgroundColor: '#fff',
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  notifyButtonText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  section: {
    marginHorizontal: 15,
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  scheduleOverview: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    borderLeftWidth: 5,
    borderLeftColor: '#667eea',
  },
  scheduleText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  reminderCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  reminderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  reminderEmojiBg: {
    width: 60,
    height: 60,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  reminderEmoji: {
    fontSize: 30,
  },
  reminderInfo: {
    flex: 1,
  },
  reminderName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 3,
  },
  reminderTime: {
    fontSize: 14,
    color: '#667eea',
    fontWeight: '600',
    marginBottom: 2,
  },
  reminderFrequency: {
    fontSize: 12,
    color: '#999',
  },
  reminderRight: {
    marginLeft: 10,
  },
  tipsSection: {
    marginHorizontal: 15,
  },
  tipsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  tipCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 4,
    borderLeftColor: '#667eea',
  },
  tipText: {
    fontSize: 14,
    color: '#333',
    marginLeft: 12,
    flex: 1,
  },
});