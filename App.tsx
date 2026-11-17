
import React, { useState } from 'react';

import './i18n';

import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { CharacterProvider } from './contexts/CharacterContext';

import WelcomeScreen from './screens/WelcomeScreen';
import GameScreen from './screens/GameScreen';

function GameApp() {
  const [gameStarted, setGameStarted] = useState(false);

  if (!gameStarted) {
    return (
      <WelcomeScreen
        onStart={() => setGameStarted(true)}
      />
    );
  }

  return (
    <GameScreen
      onBack={() => setGameStarted(false)}
    />
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <CharacterProvider>
          <GameApp />
        </CharacterProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
