import React, { useState } from 'react';
import Header from './components/Header';
import './App.css';
import LoginModal from './components/LoginModal';

const App: React.FC = () => {
  const [color, setColor] = useState<string>('blue');
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const handleColorChange = (selectedColor: string) => {
    setColor(selectedColor);
    document.documentElement.style.setProperty(
      '--primary-color',
      selectedColor
    );
  };

  return (
    <div className="App" style={{ backgroundColor: `var(--primary-color)` }}>
      {isLoggedIn && (
        <LoginModal
          onClose={() => {}}
          onLoginSuccess={() => {}}
        />
      )}
      <Header onColorChange={handleColorChange} />
      {/* Rest of your components */}
    </div>
  );
};

export default App;
