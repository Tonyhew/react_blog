import React from 'react';
import { createRoot } from 'react-dom/client';
import Main from './Pages/Main';

const container = document.getElementById('root');
const root = createRoot(container);
// 装载
root.render(<Main />);

