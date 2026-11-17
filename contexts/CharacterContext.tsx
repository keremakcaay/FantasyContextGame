
import React, { createContext, useContext, useState } from 'react';

type Character = {
  name: string;
  characterClass: string;
  hp: number;
  inventory: string[];
};

type CharacterContextType = {
  character: Character;
  setName: (name: string) => void;
  setClass: (characterClass: string) => void;
  changeHP: (amount: number) => void;
  addItem: (item: string) => void;
};

const CharacterContext = createContext<CharacterContextType | undefined>(undefined);

export function CharacterProvider({ children }: { children: React.ReactNode }) {
  const [character, setCharacter] = useState<Character>({
    name: '',
    characterClass: 'Warrior',
    hp: 100,
    inventory: [],
  });

  const setName = (name: string) => {
    setCharacter(current => ({ ...current, name }));
  };

  const setClass = (characterClass: string) => {
    setCharacter(current => ({ ...current, characterClass }));
  };

  const changeHP = (amount: number) => {
    setCharacter(current => ({
      ...current,
      hp: Math.max(0, Math.min(100, current.hp + amount)),
    }));
  };

  const addItem = (item: string) => {
    setCharacter(current => ({
      ...current,
      inventory: [...current.inventory, item],
    }));
  };

  return (
    <CharacterContext.Provider
      value={{ character, setName, setClass, changeHP, addItem }}
    >
      {children}
    </CharacterContext.Provider>
  );
}

export function useCharacter() {
  const context = useContext(CharacterContext);

  if (!context) {
    throw new Error('useCharacter must be used inside CharacterProvider');
  }

  return context;
}
