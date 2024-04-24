import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { persistor, store } from './redux/store';
import App from './App';
import './index.css';
import { BrowserRouter, RouterProvider } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ConfigProvider } from 'antd';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  // <ConfigProvider
  //   theme={{
  //     token: {
  //       // Seed Token
  //       colorPrimary: '#1aa94c',
  //       borderRadius: 5,

  //       // Alias Token
  //       colorBgContainer: '#fff',
  //     },
  //   }}
  // >
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <ConfigProvider
          theme={{
            token: {
              // Seed Token
              colorPrimary: 'rgb(255, 87, 34)',
              borderRadius: 2,

              // Alias Token
              colorBgContainer: '#fff',
            },
          }}
        >
          {' '}
          <App />
        </ConfigProvider>

        <ToastContainer />
      </BrowserRouter>
    </PersistGate>
  </Provider>
  // </ConfigProvider>
);
