import React, { useState } from 'react';
import { composers } from '../data/composers';
import AutocompleteAC from './Autocomplete/Autocomplete';

interface IProps {
  handleAnswer: (answer: string, skipped?: boolean) => void;
  playingControl: any;
}

export default function AnswerInput({ handleAnswer, playingControl }: IProps) {
  const [autocompleteKey, setAutocompleteKey] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const handleSubmit = (e: any) => {
    stopPlayingTracks();
    e.preventDefault();
    if (e.target[0].value === '') return;
    if (suggestions.length > 1 || suggestions.length === 0) return;

    // submit answer to handler
    handleAnswer(suggestions[0]);

    // clear text input
    setUserInput('');
    setAutocompleteKey(autocompleteKey + 1);
  };

  const handleSkip = (e: any) => {
    stopPlayingTracks();

    // submit answer to handler
    handleAnswer('', true);

    // clear text input
    setUserInput('');
    setAutocompleteKey(autocompleteKey + 1);
  };

  const stopPlayingTracks = () => {
    const worksPlayingCopy = playingControl.worksPlaying.map(() => ({
      isPlaying: false,
    }));
    playingControl.setWorksPlaying(worksPlayingCopy);
  };

  return (
    <form className="answer-input" onSubmit={handleSubmit}>
      <AutocompleteAC
        options={composers}
        userInput={userInput}
        setUserInput={setUserInput}
        suggestions={suggestions}
        setSuggestions={setSuggestions}
      />
      <div className="bottom-bar">
        <button className="btn-mid" type="button" onClick={handleSkip}>
          SKIP
        </button>
        <button className="btn-full" type="submit">
          SUBMIT
        </button>
      </div>
    </form>
  );
}
