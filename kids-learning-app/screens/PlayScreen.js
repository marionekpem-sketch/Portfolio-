import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Sound from 'react-native-sound';

const GAMES = [
  {
    id: 1,
    name: 'Balloon Pop',
    emoji: '🎈',
    color: '#FF6B9D',
    description: 'Tap the balloons!',
  },
  {
    id: 2,
    name: 'Shapes Match',
    emoji: '🔷',
    color: '#4ECDC4',
    description: 'Match the shapes!',
  },
  {
    id: 3,
    name: 'Color Fun',
    emoji: '🎨',
    color: '#FFD93D',
    description: 'Learn colors!',
  },
  {
    id: 4,
    name: 'Animal Sounds',
    emoji: '🐷',
    color: '#FF7675',
    description: 'Hear animal sounds!',
  },
  {
    id: 5,
    name: 'Music Dance',
    emoji: '🎵',
    color: '#A29BFE',
    description: 'Dance to music!',
  },
  {
    id: 6,
    name: 'Number Tap',
    emoji: '1️⃣',
    color: '#74B9FF',
    description: 'Tap the numbers!',
  },
];

export default function PlayScreen() {
  const [selectedGame, setSelectedGame] = useState(null);
  const [score, setScore] = useState(0);

  const playGame = (game) => {
    setSelectedGame(game);
    setScore(0);
  };

  const closeGame = () => {
    setSelectedGame(null);
  };

  if (selectedGame) {
    return <GameView game={selectedGame} onClose={closeGame} score={score} />;
  }

  return (
    <ScrollView style={styles.container}>
      {/* Header Banner */}
      <View style={styles.banner}>
        <Text style={styles.bannerEmoji}>🎮</Text>
        <Text style={styles.bannerTitle}>Let's Play!</Text>
        <Text style={styles.bannerSubtitle}>
          Have fun while learning!
        </Text>
      </View>

      {/* Game Grid */}
      <View style={styles.gameGrid}>
        {GAMES.map((game) => (
          <TouchableOpacity
            key={game.id}
            style={[styles.gameCard, { backgroundColor: game.color }]}
            onPress={() => playGame(game)}
            activeOpacity={0.8}
          >
            <Text style={styles.gameEmoji}>{game.emoji}</Text>
            <Text style={styles.gameName}>{game.name}</Text>
            <Text style={styles.gameDescription}>{game.description}</Text>
            <View style={styles.playButton}>
              <Icon name="play" size={20} color={game.color} />
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Fun Facts */}
      <View style={styles.factsSection}>
        <Text style={styles.factsTitle}>🌟 Fun Facts</Text>
        <View style={styles.factCard}>
          <Icon name="bulb" size={24} color="#FFD93D" />
          <Text style={styles.factText}>
            Playing helps your brain grow stronger every day!
          </Text>
        </View>
        <View style={styles.factCard}>
          <Icon name="happy" size={24} color="#FF6B9D" />
          <Text style={styles.factText}>
            Laughing and smiling make learning more fun!
          </Text>
        </View>
        <View style={styles.factCard}>
          <Icon name="star" size={24} color="#A29BFE" />
          <Text style={styles.factText}>
            You're doing amazing! Keep playing and learning!
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

function GameView({ game, onClose, score }) {
  return (
    <View style={styles.gameViewContainer}>
      <View style={[styles.gameViewHeader, { backgroundColor: game.color }]}>
        <TouchableOpacity onPress={onClose}>
          <Icon name="close" size={30} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.gameViewTitle}>{game.name}</Text>
        <Text style={styles.scoreText}>Score: {score}</Text>
      </View>

      <View style={styles.gameArea}>
        <Text style={styles.gameEmoji}>{game.emoji}</Text>
        <Text style={styles.gameInstruction}>
          {game.name === 'Balloon Pop' && 'Tap the balloons as fast as you can!'}
          {game.name === 'Shapes Match' && 'Match the shapes with the same color!'}
          {game.name === 'Color Fun' && 'Tap the color when you hear the word!'}
          {game.name === 'Animal Sounds' && 'Match the sound to the animal!'}
          {game.name === 'Music Dance' && 'Tap to the beat of the music!'}
          {game.name === 'Number Tap' && 'Tap the numbers in order!'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FF',
  },
  banner: {
    backgroundColor: '#667eea',
    paddingVertical: 30,
    alignItems: 'center',
    marginBottom: 20,
  },
  bannerEmoji: {
    fontSize: 60,
    marginBottom: 10,
  },
  bannerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  bannerSubtitle: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
  },
  gameGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    marginBottom: 30,
  },
  gameCard: {
    width: '48%',
    borderRadius: 20,
    padding: 20,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  gameEmoji: {
    fontSize: 50,
    marginBottom: 10,
  },
  gameName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
    textAlign: 'center',
  },
  gameDescription: {
    fontSize: 12,
    color: '#fff',
    opacity: 0.9,
    marginBottom: 10,
  },
  playButton: {
    backgroundColor: '#fff',
    borderRadius: 50,
    padding: 10,
    marginTop: 10,
  },
  factsSection: {
    marginHorizontal: 15,
    marginBottom: 30,
  },
  factsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  factCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  factText: {
    fontSize: 14,
    color: '#333',
    marginLeft: 15,
    flex: 1,
  },
  gameViewContainer: {
    flex: 1,
    backgroundColor: '#F8F9FF',
  },
  gameViewHeader: {
    paddingVertical: 20,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 0,
  },
  gameViewTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  scoreText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  gameArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  gameEmoji: {
    fontSize: 80,
    marginBottom: 20,
  },
  gameInstruction: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginVertical: 20,
  },
});