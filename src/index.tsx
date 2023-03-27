import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';

import { AuthContextProvider } from 'context/authContext';

import 'config/axios';

import './assets/scss/style.scss';

import App from './App';

import store from 'redux/store';

const container = document.querySelector('#root');

const root = createRoot(container);

const queryClient = new QueryClient();

root.render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </QueryClientProvider>
  </Provider>
);
