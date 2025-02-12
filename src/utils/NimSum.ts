export const calculateNimSum = (piles: PileType[]) => {
  return piles.reduce((sum, pile) => sum ^ pile.pieces, 0);
};
