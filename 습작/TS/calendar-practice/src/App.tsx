import React from 'react';
import styled from 'styled-components';
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  differenceInDays,
  getWeeksInMonth,
  addWeeks,
  addMonths,
} from 'date-fns';

function App() {
  const today = addMonths(new Date(), 1);
  const firstDayOfMonth = startOfMonth(today);
  const firstDayOfWeek = startOfWeek(firstDayOfMonth);
  Array.from({ length: getWeeksInMonth(today) }, (v, k) => k).forEach(
    (val: number, indexa: number) => {
      Array.from({ length: 7 }, (w, l) => l).forEach(
        (valb: number, indexb: number) => {
          console.log(addDays(addWeeks(firstDayOfWeek, indexa), indexb));
        },
      );
    },
  );
  return <h1>foo</h1>;
}

export default App;
