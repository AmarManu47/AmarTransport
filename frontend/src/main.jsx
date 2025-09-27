import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux';
import { store } from './store';
import App from './App';
import { UIProvider } from './context/UIContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <UIProvider>
        <App />
      </UIProvider>
    </Provider>
  </React.StrictMode>
);
