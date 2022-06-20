import React, { useEffect, useState } from 'react';

interface IProps {
  options: { name: string }[];
}

export default function AutocompleteAC({ options }: IProps) {

  const [ userInput, setUserInput ] = useState("");

  const handleChange = (e:any) => {
    // console.log("Change:", e);
    setUserInput(e.target.value)
  }

  useEffect(() => {
    console.log("userInput:", userInput);
    
  }, [userInput])

  return (
    <div className="autocomplete-ac__wrapper">
      <div className="autocomplete-ac__suggestion-abs-wrapper">
        <div className="autocomplete-ac__suggestion">Wolfgang Amadeus Mozart</div>
        <div className="autocomplete-ac__suggestion">Alvin James Cousins</div>
        <div className="autocomplete-ac__suggestion">Alvin James Cousins</div>
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
