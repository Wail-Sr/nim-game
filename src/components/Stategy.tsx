import { useState } from "react";
import { calculateNimSum } from "../utils/NimSum";
import calculatorIcon from "../assets/icons/calculator.svg";

interface StrategyProps {
  piles: PileType[];
  currentPlayer: PlayerType;
}

const Strategy = ({ piles, currentPlayer }: StrategyProps) => {
  const [showStrategy, setShowStrategy] = useState(false);

  const getStrategyMessage = () => {
    const nimSum = calculateNimSum(piles);
    const player = currentPlayer ?? 1;
    const advantagePlayer = nimSum === 0 ? (player % 2) + 1 : player;

    return `Le Joueur ${advantagePlayer} a l'avantage ! (Nim-sum = ${nimSum})`;
  };

  return (
    <>
      <button
        onClick={() => setShowStrategy(!showStrategy)}
        className="mt-4 inline-flex items-center gap-2 px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
      >
        <img src={calculatorIcon} className="w-4 h-4" alt="Calculator" />
        {showStrategy ? "Masquer la stratégie" : "Voir la stratégie"}
      </button>

      {showStrategy && (
        <div className="mt-2 text-sm font-medium text-indigo-600">
          {getStrategyMessage()}
        </div>
      )}
    </>
  );
};

export { Strategy };
