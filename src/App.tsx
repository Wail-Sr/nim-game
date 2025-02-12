import React, { useState, useEffect } from "react";
import { SetupPhase } from "./components/SetupPhase";
import { GameBoard } from "./components/GameBoard";


function App() {
  const [phase, setPhase] = useState(1);
  const [piles, setPiles] = useState<PileType[]>([{ id: 1, pieces: 3 }]);
  const [currentPlayer, setCurrentPlayer] = useState<1 | 2>(1);
  const [selectedPile, setSelectedPile] = useState<number | null>(null);
  const [piecesToRemove, setPiecesToRemove] = useState<number>(1);
  const [winner, setWinner] = useState<PlayerType>(null);

  useEffect(() => {
    if (phase === 2) {
      const totalPieces = piles.reduce((sum, pile) => sum + pile.pieces, 0);
      if (totalPieces === 0) {
        setWinner(currentPlayer === 1 ? 2 : 1);
      }
    }
  }, [piles, currentPlayer, phase]);

  const addPile = () => {
    setPiles([...piles, { id: piles.length + 1, pieces: 1 }]);
  };

  const removePile = (id: number) => {
    if (piles.length > 1) {
      const updatedPiles = piles
        .filter((pile) => pile.id !== id)
        .map((pile, index) => ({
          ...pile,
          id: index + 1,
        }));
      setPiles(updatedPiles);
    }
  };

  const updatePilePieces = (id: number, pieces: number) => {
    setPiles(
      piles.map((pile) =>
        pile.id === id ? { ...pile, pieces: Math.max(1, pieces) } : pile
      )
    );
  };

  const startGame = () => {
    if (piles.some((pile) => pile.pieces < 1)) {
      alert("Tous les tas doivent avoir au moins 1 pièce");
      return;
    }
    setPhase(2);
  };

  const handlePileSelect = (pileId: number) => {
    if (winner || piles.find((p) => p.id === pileId)?.pieces === 0) return;
    setSelectedPile(pileId);
    setPiecesToRemove(1);
  };

  const handleMove = () => {
    if (!selectedPile || winner) return;
    const selectedPileObj = piles.find((p) => p.id === selectedPile);
    if (!selectedPileObj || piecesToRemove > selectedPileObj.pieces) return;

    setPiles(
      piles.map((pile) =>
        pile.id === selectedPile
          ? { ...pile, pieces: pile.pieces - piecesToRemove }
          : pile
      )
    );

    setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
    setSelectedPile(null);
    setPiecesToRemove(1);
  };

  const resetGame = () => {
    setPhase(1);
    setPiles([{ id: 1, pieces: 3 }]);
    setCurrentPlayer(1);
    setSelectedPile(null);
    setWinner(null);
  };

  const handlePiecesToRemoveChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value === "" ? "" : parseInt(e.target.value);
    const selectedPileObj = piles.find((p) => p.id === selectedPile);
    const maxPieces = selectedPileObj?.pieces || 0;

    if (value === "") {
      setPiecesToRemove(0);
    } else {
      setPiecesToRemove(Math.min(Math.max(0, value), maxPieces));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 p-8">
      {phase === 1 ? (
        <SetupPhase
          piles={piles}
          currentPlayer={currentPlayer}
          onPileChange={updatePilePieces}
          onPileRemove={removePile}
          onAddPile={addPile}
          onStartGame={startGame}
        />
      ) : (
        <GameBoard
          piles={piles}
          currentPlayer={currentPlayer}
          selectedPile={selectedPile}
          piecesToRemove={piecesToRemove}
          winner={winner}
          onPileSelect={handlePileSelect}
          onPiecesToRemoveChange={handlePiecesToRemoveChange}
          onMove={handleMove}
          onReset={resetGame}
        />
      )}
    </div>
  );
}

export default App;
