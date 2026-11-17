
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import { useTranslation } from 'react-i18next';

import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useCharacter } from '../contexts/CharacterContext';

type Props = {
  onStart: () => void;
};

export default function WelcomeScreen({ onStart }: Props) {
  const { t } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const { language, changeLanguage } = useLanguage();
  const { character, setName, setClass } = useCharacter();

  const [playerName, setPlayerName] = useState(character.name);

  const isDark = theme === 'dark';

  const backgroundColor = isDark ? '#151522' : '#F5F5F5';
  const textColor = isDark ? '#FFFFFF' : '#222222';
  const cardColor = isDark ? '#252538' : '#FFFFFF';
  const borderColor = isDark ? '#555577' : '#CCCCCC';

  const toggleLanguage = () => {
    changeLanguage(language === 'en' ? 'tr' : 'en');
  };

  const startGame = () => {
    if (!playerName.trim()) {
      Alert.alert(
        t('gameTitle'),
        t('enterName')
      );
      return;
    }

    setName(playerName.trim());
    onStart();
  };

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { backgroundColor },
      ]}
    >
      <Text style={[styles.title, { color: textColor }]}>
        {t('gameTitle')}
      </Text>

      <Text style={[styles.subtitle, { color: textColor }]}>
        {t('welcome')}
      </Text>

      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: cardColor,
            color: textColor,
            borderColor,
          },
        ]}
        placeholder={t('enterName')}
        placeholderTextColor={isDark ? '#AAAAAA' : '#777777'}
        value={playerName}
        onChangeText={setPlayerName}
      />

      <Text style={[styles.label, { color: textColor }]}>
        {t('selectClass')}
      </Text>

      <View style={styles.classRow}>
        {(['Warrior', 'Mage'] as const).map((className) => (
          <TouchableOpacity
            key={className}
            style={[
              styles.classButton,
              {
                backgroundColor:
                  character.characterClass === className
                    ? '#6750A4'
                    : cardColor,
                borderColor,
              },
            ]}
            onPress={() => setClass(className)}
          >
            <Text
              style={{
                color:
                  character.characterClass === className
                    ? '#FFFFFF'
                    : textColor,
                fontWeight: 'bold',
              }}
            >
              {t(className === 'Warrior' ? 'warrior' : 'mage')}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={toggleLanguage}
      >
        <Text style={styles.buttonText}>
          🌍 {t('changeLanguage')}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={toggleTheme}
      >
        <Text style={styles.buttonText}>
          {isDark ? '☀️' : '🌙'} {t('changeTheme')}: {t(theme)}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.startButton]}
        onPress={startGame}
      >
        <Text style={styles.buttonText}>
          ⚔️ {t('startGame')}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 17,
    textAlign: 'center',
    marginBottom: 28,
  },
  input: {
    width: '100%',
    height: 52,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 25,
    fontSize: 16,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 14,
  },
  classRow: {
    flexDirection: 'row',
    width: '100%',
    gap: 12,
    marginBottom: 28,
  },
  classButton: {
    flex: 1,
    padding: 16,
    borderWidth: 1,
    borderRadius: 10,
    alignItems: 'center',
  },
  button: {
    width: '100%',
    backgroundColor: '#555577',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 12,
  },
  startButton: {
    backgroundColor: '#6750A4',
    marginTop: 12,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
