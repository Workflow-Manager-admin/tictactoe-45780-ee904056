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

// Define the color palette as constants
const COLORS = {
  primary: "#ffffff",     // background
  secondary: "#000000",   // text
  accent: "#2196f3",      // highlights/buttons
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
    <div style={{
      width: "100%",
      minHeight: "calc(100vh - 120px)",
      background: COLORS.primary,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px 0",
      color: COLORS.secondary,
    }}>
      {/* Status bar */}
      <div
        style={{
          marginBottom: 30,
          fontSize: 22,
          fontWeight: 600,
          minHeight: 36,
          color: gameOver
            ? (winner ? COLORS.accent : "#999")
            : COLORS.secondary,
          letterSpacing: "0.5px"
        }}
        data-testid="status-bar"
      >
        {statusMsg}
      </div>

      {/* 3x3 Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 64px)",
          gridTemplateRows: "repeat(3, 64px)",
          gap: "8px",
          marginBottom: 32,
          boxShadow: "0px 2px 8px rgba(0,0,0,0.06)",
          background: "#f8faff",
          borderRadius: 12,
          padding: 12,
        }}
        data-testid="tic-tac-toe-board"
      >
        {board.map((cell, idx) => (
          <button
            key={idx}
            onClick={() => handleCellClick(idx)}
            style={{
              width: 64,
              height: 64,
              fontSize: "2rem",
              fontWeight: 700,
              color:
                cell === "X"
                  ? COLORS.accent
                  : cell === "O"
                  ? COLORS.secondary
                  : "#bbb",
              background: COLORS.primary,
              border: `2px solid ${COLORS.accent}`,
              borderRadius: 8,
              cursor: cell || gameOver ? "default" : "pointer",
              transition: "background 0.15s",
              outline: "none",
              boxShadow: cell ? "0 1px 4px rgba(33,150,243,0.06)" : undefined,
              userSelect: "none",
            }}
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
        style={{
          background: COLORS.accent,
          color: COLORS.primary,
          border: "none",
          borderRadius: 6,
          padding: "12px 36px",
          fontSize: "1.1rem",
          fontWeight: 600,
          marginTop: 4,
          letterSpacing: "0.5px",
          cursor: "pointer",
          boxShadow: "0 2px 6px rgba(33,150,243,0.08)",
          transition: "background 0.16s",
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
