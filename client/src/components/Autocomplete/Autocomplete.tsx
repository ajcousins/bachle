import React, { useEffect, useState, Dispatch, SetStateAction } from 'react';
import Suggestion from './Suggestion';
import makeSuggestions from './makeSuggestions';

interface IProps {
  options: { name: string }[];
  userInput: string;
  setUserInput: any;
  suggestions: string[];
  setSuggestions: Dispatch<SetStateAction<string[]>>;
}

export default function AutocompleteAC({
  options,
  userInput,
  setUserInput,
  suggestions,
  setSuggestions,
}: IProps) {
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
    <div
      className="autocomplete-ac__wrapper"
      style={focused ? { border: '2px solid hsl(300, 100%, 67%)' } : {}}
    >
      <div
        className="autocomplete-ac__suggestion-abs-wrapper"
        style={
          userInput.length && suggestions.length && focused
            ? suggestionStyles
            : {}
        }
      >
        {suggestions.map((suggestion, i) => {
          return (
            <Suggestion
              key={`suggestion-${i}`}
              text={suggestion}
              highlight={userInput}
              setUserInput={setUserInput}
              setFocused={setFocused}
            />
          );
        })}
      </div>
      <input
        className="autocomplete-ac"
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChange={handleChange}
        type="text"
        placeholder="Know the composer?"
        value={userInput}
      />
    </div>
  );
}
