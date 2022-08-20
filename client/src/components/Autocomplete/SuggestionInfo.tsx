import React from 'react';

interface IProps {
  userInput: string;
  allResults: string[];
  limit: number;
}
export default function SuggestionInfo({ userInput, allResults, limit }: IProps) {
  if (allResults.length === 0)
    return (
      <div className="autocomplete-ac__suggestion-info">
        No results for "{userInput}". Maybe something else?
      </div>
    );

  if (allResults.length > limit)
    return (
      <div className="autocomplete-ac__suggestion-info">
        {limit} of {allResults.length} results for "{userInput}".
      </div>
    );

  return (
    <div className="autocomplete-ac__suggestion-info">
      {allResults.length} result
      {allResults.length > 1 ? 's' : ''} for "{userInput}".
    </div>
  );
}
