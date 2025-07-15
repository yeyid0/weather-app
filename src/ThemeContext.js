import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();
export { ThemeContext };

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const themes = {
  light: {
    name: 'light',
    colors: {
      primary: '#667eea',
      secondary: '#764ba2',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      cardBackground: 'rgba(255, 255, 255, 0.95)',
      cardHover: 'rgba(255, 255, 255, 0.8)',
      text: '#333',
      textSecondary: '#666',
      textMuted: '#888',
      textPlaceholder: '#999',
      border: '#e1e5e9',
      borderFocus: '#667eea',
      detailCardBg: 'rgba(255, 255, 255, 0.6)',
      mainWeatherBg: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))',
      mainWeatherBorder: 'rgba(102, 126, 234, 0.2)',
      inputBg: 'rgba(255, 255, 255, 0.8)',
      inputBgFocus: 'rgba(255, 255, 255, 1)',
      scrollbarTrack: 'rgba(255, 255, 255, 0.1)',
      scrollbarThumb: 'rgba(255, 255, 255, 0.3)',
      scrollbarThumbHover: 'rgba(255, 255, 255, 0.5)',
      selection: 'rgba(102, 126, 234, 0.3)'
    }
  },
  dark: {
    name: 'dark',
    colors: {
      primary: '#8b9dc3',
      secondary: '#9575cd',
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
      cardBackground: 'rgba(30, 30, 50, 0.95)',
      cardHover: 'rgba(40, 40, 60, 0.9)',
      text: '#e0e0e0',
      textSecondary: '#b0b0b0',
      textMuted: '#888',
      textPlaceholder: '#666',
      border: '#404040',
      borderFocus: '#8b9dc3',
      detailCardBg: 'rgba(40, 40, 60, 0.6)',
      mainWeatherBg: 'linear-gradient(135deg, rgba(139, 157, 195, 0.1), rgba(149, 117, 205, 0.1))',
      mainWeatherBorder: 'rgba(139, 157, 195, 0.2)',
      inputBg: 'rgba(40, 40, 60, 0.8)',
      inputBgFocus: 'rgba(50, 50, 70, 1)',
      scrollbarTrack: 'rgba(255, 255, 255, 0.05)',
      scrollbarThumb: 'rgba(255, 255, 255, 0.2)',
      scrollbarThumbHover: 'rgba(255, 255, 255, 0.3)',
      selection: 'rgba(139, 157, 195, 0.3)'
    }
  }
};

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(() => {
    const savedTheme = localStorage.getItem('weather-app-theme');
    return savedTheme || 'light';
  });

  useEffect(() => {
    localStorage.setItem('weather-app-theme', currentTheme);
  }, [currentTheme]);

  const toggleTheme = () => {
    setCurrentTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const theme = themes[currentTheme];

  const value = {
    theme,
    currentTheme,
    toggleTheme,
    isLight: currentTheme === 'light',
    isDark: currentTheme === 'dark'
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
