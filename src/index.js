import React from 'react';
import ReactDOM from 'react-dom/client';
import { MantineProvider } from '@mantine/core';
import { Provider } from 'react-redux';
import { store } from './store'; // 引入你的 Redux store
import '@mantine/core/styles.css';
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
    <Provider store={store}>
      <MantineProvider withGlobalStyles withNormalizeCSS defaultColorScheme="dark">
        <App />
      </MantineProvider>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();