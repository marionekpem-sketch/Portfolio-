import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Tts from 'react-native-tts';

const LEARNING_WORDS = [
  {
    id: 1,
    word: 'Apple',
    emoji: '🍎',
    color: '#FF6B6B',
    pronunciation: 'app-ul',
    sound: 'apple',
  },
  {
    id: 2,
    word: 'Ball',
    emoji: '⚽',
    color: '#4ECDC4',
    pronunciation: 'bawl',
    sound: 'ball',
  },
  {
    id: 3,
    word: 'Cat',
    emoji: '🐱',
    color: '#FFD93D',
    pronunciation: 'cat',
    sound: 'cat',
  },
  {
    id: 4,
    word: 'Dog',
    emoji: '🐶',
    color: '#A8DADC',
    pronunciation: 'dawg',
    sound: 'dog',
  },
  {
    id: 5,
    word: 'Elephant',
    emoji: '🐘',
    color: '#6C5CE7',
    pronunciation: 'el-uh-funt',
    sound: 'elephant',
  },
  {
    id: 6,
    word: 'Fish',
    emoji: '🐠',
    color: '#FF7675',
    pronunciation: 'fish',
    sound: 'fish',
  },
  {
    id: 7,
    word: 'Giraffe',
    emoji: '🦒',
    color: '#FDCB6E',
    pronunciation: 'juh-raf',
    sound: 'giraffe',
  },
  {
    id: 8,
    word: 'House',
    emoji: '🏠',
    color: '#E17055',
    pronunciation: 'hous',
    sound: 'house',
  },
];

export default function LearningScreen() {
  const [selectedWord, setSelectedWord] = useState(LEARNING_WORDS[0]);
  const [learnedWords, setLearnedWords] = useState([]);
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    loadLearnedWords();
  }, []);

  const loadLearnedWords = async () => {
    try {
      const learned = await AsyncStorage.getItem('learnedWords');
      if (learned) {
        setLearnedWords(JSON.parse(learned));
      }
    } catch (error) {
      console.log('Error loading learned words:', error);
    }
  };

  const saveLearnedWord = async (wordId) => {
    try {
      const updatedLearned = [...new Set([...learnedWords, wordId])];
      setLearnedWords(updatedLearned);
      await AsyncStorage.setItem('learnedWords', JSON.stringify(updatedLearned));
    } catch (error) {
      console.log('Error saving learned word:', error);
    }
  };

  const speakWord = (word) => {
    setIsSpeaking(true);
    Tts.speak(word, {
      androidParams: {
        KEY_PARAM_PAN: -1,
        KEY_PARAM_VOLUME: 0.8,
        KEY_PARAM_STREAM: 'STREAM_MUSIC',
      },
    });
    
    setTimeout(() => {
      setIsSpeaking(false);
      saveLearnedWord(selectedWord.id);
    }, 1500);
  };

  const isWordLearned = learnedWords.includes(selectedWord.id);

  return (
    <ScrollView style={styles.container}>
      {/* Main Learning Card */}
      <View
        style={[styles.mainCard, { backgroundColor: selectedWord.color }]}
      >
        <View style={styles.cardContent}>
          <Text style={styles.emoji}>{selectedWord.emoji}</Text>
          <Text style={styles.wordTitle}>{selectedWord.word}</Text>
          <Text style={styles.pronunciation}>
            ({selectedWord.pronunciation})
          </Text>

          <TouchableOpacity
            style={[
              styles.speakButton,
              isSpeaking && styles.speakButtonActive,
            ]}
            onPress={() => speakWord(selectedWord.word)}
            disabled={isSpeaking}
          >
            <Icon
              name="volume-high"
              size={40}
              color="#fff"
            />
            <Text style={styles.speakButtonText}>
              {isSpeaking ? 'Speaking...' : 'SPEAK'}
            </Text>
          </TouchableOpacity>

          {isWordLearned && (
            <View style={styles.learnedBadge}>
              <Icon name="checkmark-circle" size={24} color="#fff" />
              <Text style={styles.learnedText}>Learned!</Text>
            </View>
          )}
        </View>
      </View>

      {/* Progress Info */}
      <View style={styles.progressSection}>
        <Text style={styles.progressTitle}>
          Words Learned: {learnedWords.length} / {LEARNING_WORDS.length}
        </Text>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              {
                width: `${(learnedWords.length / LEARNING_WORDS.length) * 100}%`,
              },
            ]}
          />
        </View>
      </View>

      {/* Word Selection Grid */}
      <View style={styles.gridSection}>
        <Text style={styles.gridTitle}>Select a Word to Learn</Text>
        <View style={styles.grid}>
          {LEARNING_WORDS.map((word) => (
            <TouchableOpacity
              key={word.id}
              style={[
                styles.wordCard,
                {
                  backgroundColor: word.color,
                  borderWidth: selectedWord.id === word.id ? 4 : 0,
                  borderColor: '#000',
                },
              ]}
              onPress={() => setSelectedWord(word)}
            >
              <Text style={styles.wordCardEmoji}>{word.emoji}</Text>
              <Text style={styles.wordCardText}>{word.word}</Text>
              {learnedWords.includes(word.id) && (
                <Icon
                  name="checkmark-circle"
                  size={20}
                  color="#fff"
                  style={styles.checkmark}
                />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Tips Section */}
      <View style={styles.tipsSection}>
        <Text style={styles.tipsTitle}>💡 Learning Tips</Text>
        <Text style={styles.tipsText}>
          • Say the word slowly after hearing it{"\n"}
          • Point to the picture while speaking{"\n"}
          • Repeat 3-4 times daily for best results{"\n"}
          • Make it fun with gestures and sounds!
        </Text>
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
  mainCard: {
    marginHorizontal: 15,
    marginVertical: 20,
    borderRadius: 25,
    padding: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 12,
  },
  cardContent: {
    alignItems: 'center',
  },
  emoji: {
    fontSize: 120,
    marginBottom: 15,
  },
  wordTitle: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  pronunciation: {
    fontSize: 18,
    color: '#fff',
    opacity: 0.9,
    marginBottom: 30,
  },
  speakButton: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 60,
    paddingVertical: 20,
    paddingHorizontal: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  speakButtonActive: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    transform: [{ scale: 0.95 }],
  },
  speakButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  learnedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.15)',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 20,
    marginTop: 15,
  },
  learnedText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  progressSection: {
    marginHorizontal: 20,
    marginBottom: 30,
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  progressBar: {
    height: 20,
    backgroundColor: '#DDD',
    borderRadius: 10,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#667eea',
    borderRadius: 10,
  },
  gridSection: {
    marginHorizontal: 15,
    marginBottom: 30,
  },
  gridTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  wordCard: {
    width: '48%',
    borderRadius: 20,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 120,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  wordCardEmoji: {
    fontSize: 50,
    marginBottom: 8,
  },
  wordCardText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  checkmark: {
    position: 'absolute',
    top: 5,
    right: 5,
  },
  tipsSection: {
    marginHorizontal: 20,
    backgroundColor: '#FFF9E6',
    borderRadius: 15,
    padding: 20,
    borderLeftWidth: 5,
    borderLeftColor: '#FFD93D',
  },
  tipsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  tipsText: {
    fontSize: 14,
    color: '#555',
    lineHeight: 22,
  },
});