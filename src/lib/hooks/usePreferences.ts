"use client";

import { useState, useEffect } from 'react';

export type Color = {
  name: string;
  code: string;
};

export type UserPreferences = {
  selectedColor: Color;
  selectedSize: string;
};

const PREFERENCES_STORAGE_KEY = 'userPreferences';

const defaultPreferences: UserPreferences = {
  selectedColor: { name: "Brown", code: "bg-[#4F4631]" },
  selectedSize: "Large"
};

const getInitialPreferences = (): UserPreferences => ({ ...defaultPreferences });

export const usePreferences = () => {
  const [preferences, setPreferences] = useState<UserPreferences>(getInitialPreferences());
  const [isLoading, setIsLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);

  // Vérifier si nous sommes côté client
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Charger les préférences depuis localStorage
  useEffect(() => {
    if (!isClient) return;

    try {
      const savedPreferences = localStorage.getItem(PREFERENCES_STORAGE_KEY);
      if (savedPreferences) {
        const parsedPreferences = JSON.parse(savedPreferences);
        // Valider la structure des préférences
        if (parsedPreferences && 
            typeof parsedPreferences === 'object' && 
            parsedPreferences.selectedColor && 
            parsedPreferences.selectedSize) {
          setPreferences(parsedPreferences);
        } else {
          // Utiliser les préférences par défaut si la structure est invalide
          localStorage.removeItem(PREFERENCES_STORAGE_KEY);
        }
      }
    } catch (error) {
      console.warn('Error loading preferences from localStorage:', error);
      localStorage.removeItem(PREFERENCES_STORAGE_KEY);
    } finally {
      setIsLoading(false);
    }
  }, [isClient]);

  // Sauvegarder les préférences dans localStorage
  const savePreferences = (newPreferences: UserPreferences) => {
    if (!isClient) return;

    try {
      // Vérifier que l'objet est sérialisable
      const serialized = JSON.stringify(newPreferences);
      localStorage.setItem(PREFERENCES_STORAGE_KEY, serialized);
      setPreferences(newPreferences);
    } catch (error) {
      console.error('Error saving preferences to localStorage:', error);
      // En cas d'erreur, utiliser les préférences par défaut
      const defaultPrefs = getInitialPreferences();
      localStorage.setItem(PREFERENCES_STORAGE_KEY, JSON.stringify(defaultPrefs));
      setPreferences(defaultPrefs);
    }
  };

  // Mettre à jour la couleur sélectionnée
  const setSelectedColor = (color: Color) => {
    if (!isClient) return;

    try {
      const newPreferences = { ...preferences, selectedColor: color };
      savePreferences(newPreferences);
    } catch (error) {
      console.error('Error setting color preference:', error);
    }
  };

  // Mettre à jour la taille sélectionnée
  const setSelectedSize = (size: string) => {
    if (!isClient) return;

    try {
      const newPreferences = { ...preferences, selectedSize: size };
      savePreferences(newPreferences);
    } catch (error) {
      console.error('Error setting size preference:', error);
    }
  };

  // Réinitialiser les préférences
  const resetPreferences = () => {
    if (!isClient) return;

    try {
      savePreferences(defaultPreferences);
    } catch (error) {
      console.error('Error resetting preferences:', error);
    }
  };

  return {
    preferences: isClient ? preferences : getInitialPreferences(),
    isLoading: !isClient || isLoading,
    selectedColor: isClient ? preferences.selectedColor : defaultPreferences.selectedColor,
    selectedSize: isClient ? preferences.selectedSize : defaultPreferences.selectedSize,
    setSelectedColor,
    setSelectedSize,
    resetPreferences
  };
}; 