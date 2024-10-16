import React from 'react';
import ReactDOM from 'react-dom/client';
import { MantineProvider } from '@mantine/core'; // 引入 MantineProvider
import '@mantine/core/styles.css';
// import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import i18n from './i18n';

const root = ReactDOM.createRoot(document.getElementById('root'));

const savedLanguage = localStorage.getItem('language');
if (savedLanguage) {
  i18n.changeLanguage(savedLanguage);
}

root.render(
  <React.StrictMode>
    <MantineProvider withGlobalStyles withNormalizeCSS defaultColorScheme="dark">
      <App />
    </MantineProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
