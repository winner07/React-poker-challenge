import React, { useState, useRef, useEffect } from 'react';
import { shuffle } from 'lodash';
import cn from 'classnames';
import { cardsDeck } from '../../cardsDeck';
import { Card } from '../Card';
import './Poker.css';

export const Poker = () => {
  const [ cards, setCards ] = useState({
    computer: [],
    player: [],
  });
  const [ pairsCount, setPairsCount ] = useState({
    computer: 0,
    player: 0,
  });
  const isStart = useRef(false);


  const getCards = () => {
    const shuffledCards = shuffle(cardsDeck);
    const computerCardsResult = [];
    const playerCardsResult = [];

    for (let i = 0; i < 10; i++) {
      i % 2 ? playerCardsResult.push(shuffledCards[i]) : computerCardsResult.push(shuffledCards[i]);
    }

    setCards({
      computer: computerCardsResult,
      player: playerCardsResult,
    });
    setPairsCount({
      computer: 0,
      player: 0,
    });
  };


  const getPairs = (cards) => {
    const sortedCards = [ ...cards ].sort((a, b) => a.value - b.value);
    const pairs = [];

    if (sortedCards[0].value === sortedCards[1].value && sortedCards[1].value !== sortedCards[2].value) {
      pairs.push(sortedCards[0].rank);
    }

    if (sortedCards[1].value === sortedCards[2].value
      && sortedCards[0].value !== sortedCards[1].value
      && sortedCards[2].value !== sortedCards[3].value) {
      pairs.push(sortedCards[1].rank);
    }

    if (sortedCards[2].value === sortedCards[3].value
      && sortedCards[1].value !== sortedCards[2].value
      && sortedCards[3].value !== sortedCards[4].value) {
      pairs.push(sortedCards[2].rank);
    }

    if (sortedCards[3].value === sortedCards[4].value && sortedCards[2].value !== sortedCards[3].value) {
      pairs.push(sortedCards[3].rank);
    }

    return pairs;
  };


  const setPairsClasses = (cards, pairs) => {
    if (!pairs.length) {
      return cards;
    }

    const classes = [ 'pair0', 'pair1' ]
    let resultCards = [ ...cards ];

    pairs.forEach((pair, i) => {
      resultCards = resultCards.map((card) => pair === card.rank ? ({
        ...card,
        className: classes[i]
      }) : card);
    });

    return resultCards;
  };


  const determineWinner = () => {
    const computerPairs = getPairs(cards.computer);
    const playerPairs = getPairs(cards.player);
    const resultComputerCards = setPairsClasses(cards.computer, computerPairs);
    const resultPlayerCards = setPairsClasses(cards.player, playerPairs);

    setCards({
      computer: resultComputerCards,
      player: resultPlayerCards,
    });
    setPairsCount({
      computer: computerPairs.length,
      player: playerPairs.length,
    });
    isStart.current = false;
  };


  const handlePlay = () => {
    getCards();
    isStart.current = true;
  };


  useEffect(() => {
    if (cards.computer.length && cards.player.length && isStart.current) {
      determineWinner();
    }
  }, [ cards.computer, cards.player ]);


  return (
    <div className="Poker">
      <div>
        <h2>Computer cards</h2>

        <div className={cn('Poker__hand', { winning: pairsCount.computer > pairsCount.player })}>
          {cards.computer.map((card) => <Card card={card} key={card.rank + card.suit} />)}
        </div>

        <button className="Poker__go-button" onClick={handlePlay}>Play</button>

        <div className={cn('Poker__hand', { winning: pairsCount.player > pairsCount.computer })}>
          {cards.player.map((card) => <Card card={card} key={card.rank + card.suit} />)}
        </div>

        <h2>My cards</h2>
      </div>
    </div>
  );
};
