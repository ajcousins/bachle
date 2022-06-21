import { CSSProperties } from '@emotion/serialize';
import React, { useEffect, useState, useRef } from 'react';

interface IProps {
  options: { name: string }[];
  userInput: string;
  setUserInput: any;
}

export default function AutocompleteAC({ options, userInput, setUserInput }: IProps) {
  // const [userInput, setUserInput] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [focused, setFocused] = useState(false);

  const handleChange = (e: any) => {
    // console.log("Change:", e);
    setUserInput(e.target.value);
  };

  useEffect(() => {
    console.log('userInput:', userInput);
    setSuggestions(makeSuggestions(userInput, options, 5));
  }, [userInput]);

  // useEffect(() => {
  //   console.log("document.activeElement:", document.activeElement);
  //   console.log("searchInput.current:", searchInput.current);

  // }, [document.activeElement, searchInput.current])

  const suggestionStyles: any = {
    display: 'flex',
    flexDirection: 'column',
  };

  return (
    <div className="autocomplete-ac__wrapper">
      <div
        style={
          userInput.length && suggestions.length && focused
            ? suggestionStyles
            : {}
        }
        className="autocomplete-ac__suggestion-abs-wrapper"
      >
        {suggestions.map((suggestion) => {
          return (
            <Suggestion
              text={suggestion}
              highlight={userInput}
              setUserInput={setUserInput}
              setFocused={setFocused}
            />
          );
        })}
      </div>
      <input
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChange={handleChange}
        className="autocomplete-ac"
        type="text"
        placeholder="Know the composer?"
        value={userInput}
      />
    </div>
  );
}

interface SProps {
  text: string;
  highlight: string;
  setUserInput: any;
  setFocused: any;
}

const Suggestion = ({ text, highlight, setUserInput, setFocused }: SProps) => {
  const idx = text.toLowerCase().indexOf(highlight.toLowerCase());

  // console.log("text:", text, "highlight:", highlight, "idx:", idx);

  const start: string = text.slice(0, idx);
  const light: string = text.slice(idx, idx + highlight.length);
  const end: string = text.slice(idx + highlight.length);
  // const end: string =

  // console.log('start:', start, 'light:', light, 'end:', end);

  const handleClick = () => {
    console.log('text:', text);
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
};

function makeSuggestions(
  userInput: string,
  options: { name: string }[],
  limit?: number
): string[] {
  const textRef = userInput.toLowerCase();

  let arr = options
    .map((option) => {
      return option.name;
    })
    .filter((option: string) => {
      return option.toLowerCase().includes(textRef);
    });

  if (limit && arr.length > limit) {
    arr = arr.slice(0, limit);
  }

  // console.log('arr:', arr);

  return arr;
}
