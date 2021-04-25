import React from 'react';

const getSeason = (lat, month) => {
  if (month > 2 && month < 9) {
    return lat > 0 ? 'summer' : 'winter';
  } else {
    return lat > 0 ? 'winter' : 'summer';
  }
};

const SeasonDisplay = (props) => {
  const season = getSeason(props.lat, new Date().getMonth());
  const printedText = season === 'winter' ? 'Burr, it is chilly' : "Let's hit the beach";
  return (
    <div>
      <h1>{printedText}</h1>
    </div>
  );
}

export default SeasonDisplay;