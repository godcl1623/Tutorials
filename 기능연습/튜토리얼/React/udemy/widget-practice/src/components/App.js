import React, { useState } from 'react';
import Accordion from './Accordion';
import Search from './Search';
import Dropdown from './Dropdown';
import Translate from './Translate';
import Route from './Route';

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

// const router = () => {
//   switch(window.location.pathname) {
//     case '/search':
//       return <Search />;
//     // case '/dropdown':
//     //   return(
//     //     <Dropdown
//     //       label='Select a Color'
//     //       options={options}
//     //       selected={selected}
//     //       onSelectedChange={setSelected}
//     //       example='폰트 색상 미리보기'
//     //     />
//     //   );
//     case '/translate':
//       return <Translate />;
//     default:
//       return <Accordion items={items} />;
//   }
// }

const App = () => {
  const [selected, setSelected] = useState('');
  const [showDropdown, setShowDropdown] = useState(true);

  return(
    <div>
      {/* <Accordion items={items} /> */}
      {/* <Search /> */}
      {/* <button onClick={() => setShowDropdown(!showDropdown)}>Toggle Dropdown</button>
      {showDropdown ?
        <Dropdown
          label='Select a Color'
          options={options}
          selected={selected}
          onSelectedChange={setSelected}
          example='폰트 색상 미리보기'
        /> : null
      } */}
      {/* <Translate /> */}
      {/* {router()} */}
      <Route path="/">
        <Accordion items={items} />
      </Route>
      <Route path="/search">
        <Search />
      </Route>
      <Route path="/dropdown">
        <Dropdown
          label='Select a Color'
          options={options}
          selected={selected}
          onSelectedChange={setSelected}
          example='폰트 색상 미리보기'
        />
      </Route>
      <Route path="/translate">
        <Translate />
      </Route>
    </div>
  );
}

export default App;