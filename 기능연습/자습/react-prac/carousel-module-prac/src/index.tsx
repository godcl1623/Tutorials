import { createRoot } from 'react-dom/client';
import App from './App';

const rootCnt = document.querySelector('#root');
const root = createRoot(rootCnt!);

root.render(<App />);