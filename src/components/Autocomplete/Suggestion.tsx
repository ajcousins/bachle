import React from 'react';

interface SProps {
  text: string;
  highlight: string;
  setUserInput: any;
  setFocused: any;
}

export default function Suggestion({
  text,
  highlight,
  setUserInput,
  setFocused,
}: SProps) {
  const idx = text.toLowerCase().indexOf(highlight.toLowerCase());
  const start: string = text.slice(0, idx);
  const light: string = text.slice(idx, idx + highlight.length);
  const end: string = text.slice(idx + highlight.length);

  const handleClick = () => {
    setUserInput(text);
    setFocused(false);
  };

  return (
    <div className="autocomplete-ac__suggestion" onMouseDown={handleClick}>
      <span>{start}</span>
      <span className="autocomplete-ac__suggestion__highlight">{light}</span>
      <span>{end}</span>
    </div>
  );
}
