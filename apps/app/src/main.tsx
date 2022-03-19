import './index.css';

import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import App from './App';
import { UserProvider } from './context/user';
import CreateUtilPage from './pages/CreateUtilPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SettingsPage from './pages/SettingsPage';
import { routes } from './pages/utilities';
import UtilPage from './pages/UtilPage';
import theme from './theme';

ReactDOM.render(
  <React.StrictMode>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <ChakraProvider theme={theme}>
      <HelmetProvider>
        <BrowserRouter>
          <UserProvider>
            <Routes>
              <Route path="/" element={<App />}>
                <Route index element={<HomePage />} />
                <Route path="login" element={<LoginPage />} />
                <Route path="settings" element={<SettingsPage />} />
                <Route path="util/new" element={<CreateUtilPage />} />
                {routes.map(({ path, component: Component }) => (
                  <Route
                    key={path}
                    path={path}
                    element={
                      <Suspense fallback={<>Loading...</>}>
                        <Component />
                      </Suspense>
                    }
                  />
                ))}
                <Route path="util/:authorId/:itemId" element={<UtilPage />} />
                <Route path="*" element={<div>Not Found</div>} />
              </Route>
            </Routes>
          </UserProvider>
        </BrowserRouter>
      </HelmetProvider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
