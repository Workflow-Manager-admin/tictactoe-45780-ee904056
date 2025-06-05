import React, { useState } from "react";

/**
 * MainTicTacToe: A self-contained main container for the TicTacToe game.
 * Features:
 *  - 3x3 clickable grid
 *  - Two player mode (X and O)
 *  - Win and draw detection
 *  - Status display (current player's turn or outcome)
 *  - Game reset button
 *  - Light theme using custom palette
 */

/*
 * MainTicTacToe (RETRO/PIXEL ARCADE STYLE)
 * Refactored to use retro color, blocky font, thick borders, pixel buttons, and classic drop-shadow look.
 */

// Retro palette for possible use in inline, but most colors taken from App.css retro classes
const COLORS = {
  primary: "#f3e5ab",         // off-white/beige
  secondary: "#262626",       // dark text
  accent: "#3AFF1D",          // pixel green for status
  shadow: "#7c654c",
  border: "#100a02",
  board: "#C2B280",
  btn: "#a43c18",
  red: "#be332a",
  blue: "#1749be",
};

// Helper: all winning line indices for a 3x3 board
const WINNING_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// PUBLIC_INTERFACE
function MainTicTacToe() {
  /** 
   * board: Array of 9 elements, each 'X', 'O', or null
   * xIsNext: Boolean, true if next move is X
   * status: Win/draw/turn status message
   */
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);

  // PUBLIC_INTERFACE
  function getStatus(board, xIsNext) {
    // Check for winner
    for (let [a, b, c] of WINNING_LINES) {
      if (
        board[a] &&
        board[a] === board[b] &&
        board[a] === board[c]
      ) {
        return {winner: board[a], draw: false};
      }
    }
    // Draw: no winner and no empty squares
    if (board.every(cell => cell !== null)) {
      return {winner: null, draw: true};
    }
    return {winner: null, draw: false};
  }

  // Handle cell click
  const handleCellClick = idx => {
    if (board[idx] || gameOver) return; // Don't override
    const newBoard = board.slice();
    newBoard[idx] = xIsNext ? "X" : "O";
    setBoard(newBoard);

    const result = getStatus(newBoard, !xIsNext);
    if (result.winner) {
      setWinner(result.winner);
      setGameOver(true);
    } else if (result.draw) {
      setWinner(null);
      setGameOver(true);
    } else {
      setXIsNext(!xIsNext);
    }
  };

  // PUBLIC_INTERFACE
  function handleReset() {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
    setGameOver(false);
    setWinner(null);
  }

  // Prepare display status
  let statusMsg = "";
  if (gameOver) {
    statusMsg = winner 
      ? `Winner: ${winner}` 
      : "It's a draw!";
  } else {
    statusMsg = `Current Player: ${xIsNext ? "X" : "O"}`;
  }

  // Render
  return (
    <div
      style={{
        width: "100%",
        minHeight: "calc(100vh - 120px)",
        background: "none",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "17px 0 20px 0",
      }}
    >
      {/* Status bar */}
      <div
        className={
          "retro-statusbar" +
          (gameOver && !winner ? " draw" : "")
        }
        data-testid="status-bar"
        style={{
          marginTop: 6,
        }}
      >
        {statusMsg}
      </div>

      {/* 3x3 Grid */}
      <div
        className="retro-board"
        data-testid="tic-tac-toe-board"
        style={{
          marginBottom: 32,
        }}
      >
        {board.map((cell, idx) => (
          <button
            key={idx}
            onClick={() => handleCellClick(idx)}
            className={
              "retro-cell-btn" +
              (cell === "X"
                ? " retro-cell-x"
                : cell === "O"
                ? " retro-cell-o"
                : "")
            }
            aria-label={
              cell
                ? `Cell ${idx + 1} marked ${cell}`
                : `Cell ${idx + 1}, empty`
            }
            data-testid={`cell-${idx}`}
            disabled={!!cell || gameOver}
          >
            {cell || ""}
          </button>
        ))}
      </div>

      {/* Reset Button */}
      <button
        className="btn"
        style={{
          background: COLORS.btn,
          color: "#ffe5c2",
          fontSize: "1.19rem",
          boxShadow: "0 4px 0 #730808",
          marginTop: 8,
        }}
        onClick={handleReset}
        data-testid="reset-btn"
      >
        Reset
      </button>
    </div>
  );
}

export default MainTicTacToe;
