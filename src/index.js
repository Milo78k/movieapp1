import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App/App';
import '@ant-design/v5-patch-for-react-19';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(<App />);
