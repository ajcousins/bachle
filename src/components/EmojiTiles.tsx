import React from 'react';

interface EmojiIProps {
  stats: any;
  gameData: any;
}

export default function EmojiTiles({ stats, gameData }: EmojiIProps) {
  return (
    <div style={{ marginBottom: '2em' }}>
      {gameData.works.map((work: any, i: number) => {
        if (!stats.guessList[i]) return <span>⬜</span>;
        if (stats.guessList[i].isCorrect) return <span>🟩</span>;
        return <span>🟨</span>;
      })}
    </div>
  );
}
