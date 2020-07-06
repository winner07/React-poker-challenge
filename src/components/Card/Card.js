import React from 'react';
import cn from 'classnames';
import './Card.css';

export const Card = ({ card }) => (
  <div className={cn('Card', card.className)} style={{ color: card.color }}>
    <span className="Card__rank">{card.rank}</span>
    <span className="Card__suit">{card.suit}</span>
  </div>
);
