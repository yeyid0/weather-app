import React, { useState, useContext } from "react";
import { ThemeContext } from "./ThemeContext";

const darkTheme = {
  background: "#232526",
  color: "#f3f3f3",
  cardBg: "#2c2c34",
  inputBg: "#232526",
  buttonBg: "#764ba2",
  buttonColor: "#fff"
};
const lightTheme = {
  background: "#e3e6f3",
  color: "#333",
  cardBg: "#fff",
  inputBg: "#fff",
  buttonBg: "#667eea",
  buttonColor: "#fff"
};

function App() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const API_KEY = "1acf42fc37649313f7d127d7ead0da54";

  const getWeather = async () => {
    if (!city.trim()) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=tr`
      );
      const data = await res.json();
      if (data.cod === "404") {
        setError("Şehir bulunamadı. Lütfen geçerli bir şehir adı girin.");
        setWeather(null);
      } else if (data.cod === 401) {
        setError("API anahtarı geçersiz. Lütfen geçerli bir API anahtarı kullanın.");
        setWeather(null);
      } else {
        setWeather(data);
        setError("");
      }
    } catch {
      setError("Bağlantı hatası. Lütfen internet bağlantınızı kontrol edin.");
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      getWeather();
    }
  };

  const getWeatherIcon = (weatherCode) => {
    const iconMap = {
      '01d': '☀️', '01n': '🌙',
      '02d': '⛅', '02n': '☁️',
      '03d': '☁️', '03n': '☁️',
      '04d': '☁️', '04n': '☁️',
      '09d': '🌧️', '09n': '🌧️',
      '10d': '🌦️', '10n': '🌧️',
      '11d': '⛈️', '11n': '⛈️',
      '13d': '❄️', '13n': '❄️',
      '50d': '🌫️', '50n': '🌫️'
    };
    return iconMap[weatherCode] || '🌤️';
  };

  // Sade inline stiller
  const currentTheme = theme.name === 'dark' ? darkTheme : lightTheme;

  return (
    <div style={{
      minHeight: '100vh',
      background: currentTheme.background,
      color: currentTheme.color,
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem'
    }}>
      <div style={{
        background: currentTheme.cardBg,
        borderRadius: '18px',
        padding: '2rem',
        maxWidth: '400px',
        width: '100%',
        boxShadow: '0 2px 16px rgba(0,0,0,0.08)'
      }}>
        <h1 style={{ textAlign: 'center', fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Hava Durumu</h1>
        <p style={{ textAlign: 'center', marginBottom: '1.5rem', fontSize: '1rem', fontWeight: 500 }}>Anlık hava durumu bilgisi</p>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
          <button
            onClick={toggleTheme}
            style={{
              background: currentTheme.buttonBg,
              color: currentTheme.buttonColor,
              border: 'none',
              borderRadius: '24px',
              padding: '0.5rem 1.5rem',
              fontWeight: 600,
              cursor: 'pointer',
              fontSize: '1rem'
            }}
            aria-label="Tema Değiştir"
          >
            {theme.name === 'dark' ? '🌞 Aydınlık' : '🌙 Karanlık'}
          </button>
        </div>
        <div style={{ marginBottom: '1.2rem' }}>
          <input
            type="text"
            placeholder="Şehir adı girin (örn. İstanbul, Ankara)"
            value={city}
            onChange={e => setCity(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={loading}
            style={{
              width: '100%',
              padding: '0.7rem 1rem',
              fontSize: '1rem',
              borderRadius: '12px',
              border: '1px solid #ccc',
              background: currentTheme.inputBg,
              color: currentTheme.color,
              marginBottom: '0.7rem',
              outline: 'none'
            }}
          />
          <button
            onClick={getWeather}
            disabled={loading || !city.trim()}
            style={{
              width: '100%',
              padding: '0.7rem',
              fontSize: '1rem',
              borderRadius: '12px',
              border: 'none',
              background: currentTheme.buttonBg,
              color: currentTheme.buttonColor,
              fontWeight: 600,
              cursor: loading || !city.trim() ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? 'Yükleniyor...' : 'Ara'}
          </button>
        </div>
        {error && (
          <div style={{
            background: '#ff6b6b',
            color: '#fff',
            padding: '0.7rem',
            borderRadius: '8px',
            marginBottom: '1rem',
            textAlign: 'center',
            fontWeight: 500
          }}>
            ⚠️ {error}
          </div>
        )}
        {weather && weather.main && (
          <div style={{ marginTop: '1.2rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
              <h2 style={{ fontSize: '1.3rem', fontWeight: 600, margin: 0 }}>{weather.name}</h2>
              <p style={{ fontSize: '1rem', color: '#888', margin: 0 }}>{weather.sys.country}</p>
            </div>
            <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 700 }}>{Math.round(weather.main.temp)}°C</div>
              <div style={{ fontSize: '1rem', color: '#888', marginBottom: '0.5rem' }}>{getWeatherIcon(weather.weather[0].icon)} {weather.weather[0].description}</div>
              <div style={{ fontSize: '1rem', color: '#888' }}>Hissedilen: {Math.round(weather.main.feels_like)}°C</div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.7rem' }}>
              <div style={{ background: '#f3f3f3', borderRadius: '8px', padding: '0.7rem', textAlign: 'center', color: '#333' }}>
                💨<div style={{ fontSize: '0.9rem', color: '#888' }}>Rüzgar</div>
                <div style={{ fontWeight: 600 }}>{weather.wind.speed} m/s</div>
              </div>
              <div style={{ background: '#f3f3f3', borderRadius: '8px', padding: '0.7rem', textAlign: 'center', color: '#333' }}>
                💧<div style={{ fontSize: '0.9rem', color: '#888' }}>Nem</div>
                <div style={{ fontWeight: 600 }}>{weather.main.humidity}%</div>
              </div>
              <div style={{ background: '#f3f3f3', borderRadius: '8px', padding: '0.7rem', textAlign: 'center', color: '#333' }}>
                🌡️<div style={{ fontSize: '0.9rem', color: '#888' }}>Basınç</div>
                <div style={{ fontWeight: 600 }}>{weather.main.pressure} hPa</div>
              </div>
              <div style={{ background: '#f3f3f3', borderRadius: '8px', padding: '0.7rem', textAlign: 'center', color: '#333' }}>
                👁️<div style={{ fontSize: '0.9rem', color: '#888' }}>Görüş</div>
                <div style={{ fontWeight: 600 }}>{weather.visibility ? `${(weather.visibility / 1000).toFixed(1)} km` : 'N/A'}</div>
              </div>
            </div>
          </div>
        )}
        <div style={{ textAlign: 'center', marginTop: '2rem', color: '#888', fontSize: '0.95rem' }}>
          Hava Durumu Uygulaması © {new Date().getFullYear()} | Yiğit Uysal
        </div>
      </div>
    </div>
  );
}

export default App;
