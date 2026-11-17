
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { useTranslation } from 'react-i18next';

import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useCharacter } from '../contexts/CharacterContext';

type Props = {
  onBack: () => void;
};

export default function GameScreen({ onBack }: Props) {
  const { t } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const { language, changeLanguage } = useLanguage();
  const { character, changeHP, addItem } = useCharacter();

  const isDark = theme === 'dark';

  const backgroundColor = isDark ? '#151522' : '#F5F5F5';
  const cardColor = isDark ? '#252538' : '#FFFFFF';
  const textColor = isDark ? '#FFFFFF' : '#222222';

  const className =
    character.characterClass === 'Warrior'
      ? t('warrior')
      : t('mage');

  const toggleLanguage = () => {
    changeLanguage(language === 'en' ? 'tr' : 'en');
  };

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { backgroundColor },
      ]}
    >
      <Text style={[styles.title, { color: textColor }]}>
        ⚔️ {t('gameTitle')}
      </Text>

      <View style={[styles.card, { backgroundColor: cardColor }]}>
        <Text style={[styles.greeting, { color: textColor }]}>
          {t('greeting', {
            playerName: character.name,
            hp: character.hp,
          })}
        </Text>

        <Text style={[styles.story, { color: textColor }]}>
          {t('story')}
        </Text>
      </View>

      <View style={[styles.card, { backgroundColor: cardColor }]}>
        <Text style={[styles.sectionTitle, { color: textColor }]}>
          {t('characterInfo')}
        </Text>

        <Text style={{ color: textColor }}>
          {t('name')}: {character.name}
        </Text>

        <Text style={{ color: textColor }}>
          {t('class')}: {className}
        </Text>

        <Text style={{ color: textColor }}>
          {t('health')}: {character.hp}/100 HP
        </Text>

        <View style={styles.healthBackground}>
          <View
            style={[
              styles.healthFill,
              { width: `${character.hp}%` },
            ]}
          />
        </View>
      </View>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#B83B45' }]}
        onPress={() => changeHP(-10)}
      >
        <Text style={styles.buttonText}>
          {t('takeDamage')}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#27865B' }]}
        onPress={() => changeHP(10)}
      >
        <Text style={styles.buttonText}>
          {t('heal')}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#6750A4' }]}
        onPress={() => addItem('potion')}
      >
        <Text style={styles.buttonText}>
          {t('findItem')}
        </Text>
      </TouchableOpacity>

      <View style={[styles.card, { backgroundColor: cardColor }]}>
        <Text style={[styles.sectionTitle, { color: textColor }]}>
          🎒 {t('inventory')}
        </Text>

        {character.inventory.length === 0 ? (
          <Text style={{ color: textColor }}>
            {t('emptyInventory')}
          </Text>
        ) : (
          character.inventory.map((item, index) => (
            <Text key={index} style={{ color: textColor }}>
              • {t(item)}
            </Text>
          ))
        )}
      </View>

      <View style={styles.settingsRow}>
        <TouchableOpacity
          style={[styles.button, styles.settingsButton]}
          onPress={toggleLanguage}
        >
          <Text style={styles.buttonText}>
            🌍 {language.toUpperCase()}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.settingsButton]}
          onPress={toggleTheme}
        >
          <Text style={styles.buttonText}>
            {isDark ? '☀️' : '🌙'} {t(theme)}
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#555577' }]}
        onPress={onBack}
      >
        <Text style={styles.buttonText}>
          {t('backToWelcome')}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 22,
    paddingTop: 55,
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 22,
  },
  card: {
    padding: 20,
    borderRadius: 14,
    marginBottom: 18,
    gap: 10,
  },
  greeting: {
    fontSize: 19,
    fontWeight: 'bold',
  },
  story: {
    fontSize: 15,
    lineHeight: 23,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  healthBackground: {
    height: 12,
    backgroundColor: '#777777',
    borderRadius: 8,
    overflow: 'hidden',
    marginTop: 8,
  },
  healthFill: {
    height: '100%',
    backgroundColor: '#35B56A',
    borderRadius: 8,
  },
  button: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
  settingsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  settingsButton: {
    flex: 1,
    backgroundColor: '#555577',
  },
});
