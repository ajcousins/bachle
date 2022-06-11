import React, { SetStateAction, useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import { composers } from '../data/composers';

interface IProps {
  handleAnswer: (answer: string, skipped?: boolean) => void;
  playingControl: any;
}

export default function AnswerInput({ handleAnswer, playingControl }: IProps) {
  const [curInput, setCurInput] = useState('');
  const [autocompleteKey, setAutocompleteKey] = useState(0);

  const handleSubmit = (e: any) => {
    stopPlayingTracks();
    e.preventDefault();
    if (e.target[0].value === '') return;

    // submit answer to handler
    handleAnswer(e.target[0].value);

    // clear text input
    setCurInput('');
    setAutocompleteKey(autocompleteKey + 1);
  };

  const handleSkip = (e: any) => {
    stopPlayingTracks();
    console.log('skip');

    // submit answer to handler
    handleAnswer('', true);

    // clear text input
    setCurInput('');
    setAutocompleteKey(autocompleteKey + 1);
  };

  const stopPlayingTracks = () => {
    const worksPlayingCopy = playingControl.worksPlaying.map(() => ({ isPlaying: false }));
    playingControl.setWorksPlaying(worksPlayingCopy);
  }

  return (
    <div className="text-field-wrapper">
      <form onSubmit={handleSubmit}>
        <Autocomplete
          id="highlights-demo"
          key={autocompleteKey}
          fullWidth
          options={composers}
          getOptionLabel={(option) => {
            if (typeof option === 'string' || option instanceof String)
              return '';
            else return option.name;
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Know the composer?"
              margin="normal"
              onChange={(e) => {
                setCurInput(e.target.value);
              }}
              value={curInput}
            />
          )}
          renderOption={(props, option, { inputValue }) => {
            const matches = match(option.name, inputValue);
            const parts = parse(option.name, matches);

            if (inputValue.length < 1) return null;
            return (
              <li {...props}>
                <div>
                  {parts.map((part, index) => (
                    <span
                      key={index}
                      style={{
                        backgroundColor: part.highlight ? '#f2cfd5' : '',
                      }}
                    >
                      {part.text}
                    </span>
                  ))}
                </div>
              </li>
            );
          }}
        />
        <button type="button" onClick={handleSkip}>
          Skip
        </button>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
