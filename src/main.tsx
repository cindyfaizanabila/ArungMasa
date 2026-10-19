import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import {PhoneFrame} from './components/PhoneFrame.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <PhoneFrame>
    <App />
  </PhoneFrame>,
);
