import { CSSProperties } from '@emotion/serialize';
import React, { useEffect, useState } from 'react';

interface IProps {
  options: { name: string }[];
}

export default function AutocompleteAC({ options }: IProps) {
  const [userInput, setUserInput] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const handleChange = (e: any) => {
    // console.log("Change:", e);
    setUserInput(e.target.value);
  };

  useEffect(() => {
    // console.log("userInput:", userInput);
    setSuggestions(makeSuggestions(userInput, options, 5))
  }, [userInput]);

  const suggestionStyles:any = {
    display: 'flex',
    'flexDirection': 'column'
  };

  return (
    <div className="autocomplete-ac__wrapper">
      <div
        style={userInput.length && suggestions.length ? suggestionStyles : {}}
        className="autocomplete-ac__suggestion-abs-wrapper"
      >
        {suggestions.map((suggestion) => {
          return <Suggestion text={suggestion} />
        })}
      </div>
      <input
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
}

const Suggestion = ({ text }: SProps) => {
  return <div className="autocomplete-ac__suggestion">{text}</div>;
};

function makeSuggestions(userInput: string, options: { name: string }[], limit?: number): string[] {

  const textRef = userInput.toLowerCase();

  let arr = options.map((option) => {
    return option.name
  }).filter((option:string) => {
    return option.toLowerCase().includes(textRef)
  })

  if (limit && arr.length > 6) {
    arr = arr.slice(0, limit)
  }

  return arr
  
}
