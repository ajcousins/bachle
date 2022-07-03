import React, { useContext } from 'react';
import { GameContext } from '../context/GameContext';

export default function EmojiTiles() {
  const { gameData, userStats } = useContext(GameContext);
  return (
    <div style={{ marginBottom: '2em' }}>
      {gameData.works.map((work: any, i: number) => {
        if (!userStats.guessList[i]) return <span key={i}>⬜</span>;
        if (userStats.guessList[i].isCorrect) return <span key={i}>🟩</span>;
        return <span key={i}>🟨</span>;
      })}
    </div>
  );
}
