import React, {SetStateAction} from 'react';
import TextField from '@mui/material/TextField';
// import InputUnstyled from '@mui/base/InputUnstyled'
import Autocomplete from '@mui/material/Autocomplete';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import { composers } from '../data/composers';

interface IProps {
  curUserAnswer: string;
  setCurUserAnswer: React.Dispatch<SetStateAction<string>>;
}

export default function AnswerInput({curUserAnswer, setCurUserAnswer}:IProps) {

  const handleChange = (e:any) => {
    console.log("change");
    
    console.log("e.target.value:", e.target.value);
    console.log("e:", e);
  }

  return (
    <div className="text-field-wrapper">
      <Autocomplete
        id="highlights-demo"
        // sx={{ width: 300 }}
        
        freeSolo
        fullWidth
        options={composers}
        getOptionLabel={(option) => {
          if (typeof option === 'string' || option instanceof String) return '';
          else return option.name;
        }}
        renderInput={(params) => <TextField {...params} margin="normal" onChange={handleChange}/>}
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
                      backgroundColor: part.highlight ? 'yellow' : '',
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
    </div>
  );
}
