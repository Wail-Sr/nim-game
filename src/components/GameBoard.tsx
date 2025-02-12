import React from "react";
import { Pile } from "./Pile";
import { Strategy } from "./Stategy";
import trophyIcon from "../assets/icons/trophy.svg";

interface GameBoardProps {
  piles: Array<{ id: number; pieces: number }>;
  currentPlayer: PlayerType;
  selectedPile: number | null;
  piecesToRemove: number;
  winner: PlayerType;
  onPileSelect: (id: number) => void;
  onPiecesToRemoveChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onMove: () => void;
  onReset: () => void;
}

export function GameBoard({
  piles,
  currentPlayer,
  selectedPile,
  piecesToRemove,
  winner,
  onPileSelect,
  onPiecesToRemoveChange,
  onMove,
  onReset,
}: GameBoardProps) {
  return (
    <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-2xl p-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Jeu de Nim</h1>
        {!winner ? (
          <div className="text-xl text-gray-600">
            Tour du Joueur {currentPlayer}
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2 text-2xl text-green-600 font-bold">
            <img src={trophyIcon} className="w-8 h-8" alt="Trophy" />
            Le Joueur {winner} Gagne !
          </div>
        )}

        <Strategy piles={piles} currentPlayer={currentPlayer} />

      </div>

      <div className="flex flex-wrap gap-8 mb-8 justify-center">
        {piles.map((pile) => (
          <Pile
            key={pile.id}
            id={pile.id}
            pieces={pile.pieces}
            isSelected={selectedPile === pile.id}
            onClick={() => onPileSelect(pile.id)}
          />
        ))}
      </div>

      {selectedPile !== null && !winner && (
        <div className="max-w-md mx-auto mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Pièces à retirer (1-
            {piles.find((p) => p.id === selectedPile)?.pieces || 0}) :
          </label>
          <input
            type="number"
            min={1}
            max={piles.find((p) => p.id === selectedPile)?.pieces || 0}
            value={piecesToRemove || ""}
            onChange={onPiecesToRemoveChange}
            className="w-full p-2 border rounded-md"
          />
        </div>
      )}

      <div className="flex justify-center gap-4">
        {selectedPile !== null && !winner && (
          <button
            onClick={onMove}
            disabled={piecesToRemove < 1}
            className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Confirmer le Coup
          </button>
        )}
        {winner && (
          <button
            onClick={onReset}
            className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            Rejouer
          </button>
        )}
      </div>
    </div>
  );
}
