# Fantasy Context Game – Laboratory 5

## Project Description

This project is a simple fantasy adventure game made with React Native, Expo and TypeScript.

The main purpose of this project is to learn how to use Context API in React Native.

## Features

- The player can enter a name.
- The player can choose Warrior or Mage.
- The game supports English and Turkish.
- The player can change between Light and Dark themes.
- Language and theme settings work independently.
- The player can take damage and heal.
- The player can collect health potions.
- Character information is managed with Context API.

## Context API

The application uses three contexts:

**ThemeContext:** Manages the Light and Dark themes.

**LanguageContext:** Manages English and Turkish language selection.

**CharacterContext:** Stores the player's name, class, health points and inventory.

## Translation System

The game uses react-i18next and JSON files for translations.

The application also supports dynamic text. For example, the player's name and HP are automatically updated in the welcome message.

## Technologies

- React Native
- Expo
- TypeScript
- React Context API
- i18next
- react-i18next
- JSON

## How to Run

Install dependencies:

`npm install`

Start the application:

`npx expo start`

Open the application with Expo Go or an Android emulator.

## Conclusion

In this laboratory, I learned how to use Context API to share information between different screens. I also learned how to change the language and theme without restarting the application.