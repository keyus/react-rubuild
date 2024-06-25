import { createRoot } from 'react-dom/client';
import App from './App';
import './dayjs'
import '@/style/style.scss';

const root = createRoot(document.getElementById('root'));
root.render(<App />);
