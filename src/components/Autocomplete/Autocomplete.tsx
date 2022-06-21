import React, { useEffect, useState } from 'react';
import Suggestion from './Suggestion';
import makeSuggestions from './makeSuggestions';

interface IProps {
  options: { name: string }[];
  userInput: string;
  setUserInput: any;
}

export default function AutocompleteAC({
  options,
  userInput,
  setUserInput,
}: IProps) {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [focused, setFocused] = useState(false);

  const handleChange = (e: any) => {
    setUserInput(e.target.value);
  };

  useEffect(() => {
    setSuggestions(makeSuggestions(userInput, options, 5));
  }, [userInput, options]);

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
