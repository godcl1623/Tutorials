import React, { useState } from 'react';
import Accordion from './Accordion';
import Search from './Search';
import Dropdown from './Dropdown';

const items = [
  {
    title: 'What is React?',
    content: 'React is a front end javascript framework'
  },
  {
    title: 'Why use React?',
    content: 'React is a favorite JS library among engineers'
  },
  {
    title: 'How do you use React?',
    content: 'By creating components with React'
  }
];

const options = [
  {
    label: '빨간색',
    value: 'red'
  },
  {
    label: '초록색',
    value: 'green'
  },
  {
    label: '파란색',
    value: 'blue'
  }
];

const App = () => {
  const [selected, setSelected] = useState(options[0]);

  return(
    <div>
      {/* <Accordion items={items} /> */}
      {/* <Search /> */}
      <Dropdown
        options={options}
        selected={selected}
        onSelectedChange={setSelected}
      />
    </div>
  );
}

export default App;