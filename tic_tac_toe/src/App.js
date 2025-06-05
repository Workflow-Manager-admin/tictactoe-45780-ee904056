import React from 'react';
import './App.css';
import MainTicTacToe from './MainTicTacToe';

// PUBLIC_INTERFACE
function App() {
  return (
    <div className="app">
      {/* Navbar/Header */}
      <nav className="navbar">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <div className="logo">
              <span className="logo-symbol">*</span> TicTacToe
            </div>
            <button className="btn" disabled style={{ background: "#2196f3", color: "#fff", opacity: 0.8 }}>KAVIA Demo</button>
          </div>
        </div>
      </nav>

      {/* Main Game Container */}
      <main>
        <div className="container">
          {/* Center the game vertically (offset for navbar) */}
          <div style={{
            display: "flex",
            flexDirection: "column",
            minHeight: "calc(100vh - 80px)",
            alignItems: "center",
            justifyContent: "center",
          }}>
            <MainTicTacToe />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;