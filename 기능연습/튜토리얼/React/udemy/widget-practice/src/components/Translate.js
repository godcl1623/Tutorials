import React, { useState } from 'react';
import Dropdown from './Dropdown';

const options = [
  {
    label: 'Afrikaans',
    value: 'af'
  },
  {
    label: 'Arabic',
    value: 'ar'
  },
  {
    label: 'Hindi',
    value: 'hi'
  }
];

const Translate = () => {
  const [language, setLanguage] = useState(options[0]);
  const [text, setText] = useState('');

  return(
    <div>
      <Dropdown
        label='Select a Language'
        options={options}
        selected={language}
        onSelectedChange={setLanguage}
      />
      <input
        value={text}
        onChange={event => {
          setText(event.target.value)
        }}
      />
    </div>
  );
}

export default Translate;