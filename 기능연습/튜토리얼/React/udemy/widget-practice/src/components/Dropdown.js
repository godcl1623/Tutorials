import React, { useState, useEffect, useRef } from 'react';

const Dropdown = ({ options, selected, onSelectedChange, label, example }) => {
  const [open, setOpen] = useState(false);
  const [fontColor, setFontColor] = useState('black');

  const ref = useRef();

  useEffect(() => {
    const onBodyClick = event => {
      if (ref.current.contains(event.target)) return;
      setOpen(false);
    };

    document.body.addEventListener('click', onBodyClick, {capture: true});

    return () => {
      document.body.removeEventListener('click', onBodyClick, {capture: true});
    }
  }, []);

  useEffect(() => {
    setFontColor(selected.value);
  }, [fontColor, selected])

  const renderedColors = options.map(option => {
    if (option.value === selected.value) {
      return null;
    }
    return(
      <div
        key={option.value}
        className="item"
        onClick={()=>{
          onSelectedChange(option)
          setFontColor(option.value)
        }}
      >
        {option.label}
      </div>
    );
  });
  return(
    <div ref={ref} className="ui form">
      <div className="field">
        <label className="label">{label}</label>
        <div
          className={`ui selection dropdown ${open ? 'visible active' : ''}`}
          onClick={() => {
            setOpen(!open);
          }}
        >
          <i className="dropdown icon"></i>
          <div className="text">{selected.label}</div>
          <div className={`menu ${open ? 'visible transition' : ''}`}>
            {renderedColors}
          </div>
        </div>
      </div>
      <h2
        style={{color: `${fontColor}`}}
      >
        {example}
      </h2>
    </div>
  );
}

export default Dropdown;