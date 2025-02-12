import minusIcon from "../assets/icons/minus.svg";
import plusIcon from "../assets/icons/plus.svg";

interface PileProps {
  id: number;
  pieces: number;
  isSetup?: boolean;
  isSelected?: boolean;
  onPieceChange?: (id: number, pieces: number) => void;
  onRemove?: (id: number) => void;
  onClick?: () => void;
  showRemoveButton?: boolean;
}

export function Pile({
  id,
  pieces,
  isSetup = false,
  isSelected = false,
  onPieceChange,
  onRemove,
  onClick,
  showRemoveButton = false,
}: PileProps) {
  if (isSetup) {
    return (
      <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg w-[200px]">
        <span className="font-semibold text-gray-700 mb-2">Tas {id}</span>
        <div className="flex items-center gap-2 mb-3">
          <button
            onClick={() => onPieceChange?.(id, pieces - 1)}
            className="p-1 rounded-full hover:bg-gray-200"
          >
            <img src={minusIcon} className="w-4 h-4" alt="Decrease" />
          </button>
          <input
            type="number"
            min="1"
            value={pieces}
            onChange={(e) => onPieceChange?.(id, parseInt(e.target.value) || 1)}
            className="w-20 p-2 border rounded-md text-center"
          />
          <button
            onClick={() => onPieceChange?.(id, pieces + 1)}
            className="p-1 rounded-full hover:bg-gray-200"
          >
            <img src={plusIcon} className="w-4 h-4" alt="Increase" />
          </button>
        </div>
        {showRemoveButton && (
          <button
            onClick={() => onRemove?.(id)}
            className="text-red-600 hover:text-red-800"
          >
            Supprimer
          </button>
        )}
      </div>
    );
  }

  return (
    <div
      className={`p-6 rounded-lg border-2 transition-all w-[200px] ${
        isSelected
          ? "border-indigo-500 bg-indigo-50"
          : "border-gray-200 hover:border-indigo-300"
      } cursor-pointer`}
      onClick={onClick}
    >
      <div className="text-center mb-4">
        <span className="font-semibold text-gray-700 block">Tas {id}</span>
        <span className="text-gray-600 block">{pieces} pièces</span>
      </div>
      <div className="flex flex-wrap gap-2 justify-center">
        {Array.from({ length: pieces }).map((_, i) => (
          <div
            key={`pile-${id}-piece-${i}`}
            className="w-4 h-4 rounded-full bg-indigo-500"
          ></div>
        ))}
      </div>
    </div>
  );
}
