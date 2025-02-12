import { Pile } from "./Pile";
import { Strategy } from "./Stategy";

interface SetupPhaseProps {
  piles: PileType[];
  currentPlayer: PlayerType;
  onPileChange: (id: number, pieces: number) => void;
  onPileRemove: (id: number) => void;
  onAddPile: () => void;
  onStartGame: () => void;
}

export function SetupPhase({
  piles,
  currentPlayer,
  onPileChange,
  onPileRemove,
  onAddPile,
  onStartGame,
}: SetupPhaseProps) {
  console.log({
    piles,
    currentPlayer,
  });
  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl p-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Configuration du Jeu de Nim
        </h1>
        <p className="text-gray-600">
          Configurez les tas avant de commencer la partie
        </p>

        <Strategy piles={piles} currentPlayer={currentPlayer} />
      </div>

      <div className="flex flex-wrap gap-4 mb-8 justify-center">
        {piles.map((pile) => (
          <Pile
            key={pile.id}
            id={pile.id}
            pieces={pile.pieces}
            isSetup={true}
            onPieceChange={onPileChange}
            onRemove={onPileRemove}
            showRemoveButton={piles.length > 1}
          />
        ))}
      </div>

      <div className="flex justify-center gap-4">
        <button
          onClick={onAddPile}
          className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
        >
          Ajouter un Tas
        </button>
        <button
          onClick={onStartGame}
          className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
        >
          Commencer la Partie
        </button>
      </div>
    </div>
  );
}
