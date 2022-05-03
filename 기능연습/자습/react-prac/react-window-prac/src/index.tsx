import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import App from './App';

const root = ReactDOMClient.createRoot(document.querySelector('#root') as Element);
root.render(<App />);