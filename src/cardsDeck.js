const ranks = [ 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A' ];
const suits = [ '♦', '♠', '♥', '♣' ];
const ranksCount = ranks.length;
const cardsCount = ranksCount * suits.length;
export const cardsDeck = [];

for (let i = 0; i < cardsCount; i++) {
  const rankI = i % ranksCount;
  const suitI = Math.floor(i / ranksCount);

  cardsDeck.push({
    rank: ranks[rankI],
    value: rankI + 1,
    suit: suits[suitI],
    color: suitI % 2 ? 'black' : 'red'
  });
}
