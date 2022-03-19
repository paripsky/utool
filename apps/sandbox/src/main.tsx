import './index.css';

import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom';

import EmbedPage from './pages/EmbedPage';
import theme from './theme';

// const embedMode = window.location.href.includes('/embed');
// let currentApp;

// if (embedMode) {
//   window.React = React;
//   currentApp = <EmbedPage />;
// } else {
//   currentApp = (
//     <HelmetProvider>
//       <BrowserRouter>
//         <UserProvider>
//           <Routes>
//             <Route path="/" element={<App />}>
//               <Route index element={<HomePage />} />
//               <Route path="login" element={<LoginPage />} />
//               <Route path="settings" element={<SettingsPage />} />
//               <Route path="item/:itemId" element={<ItemPage />} />
//               <Route path="*" element={<div>Not Found</div>} />
//             </Route>
//           </Routes>
//         </UserProvider>
//       </BrowserRouter>
//     </HelmetProvider>
//   );
// }

// cypress. jest

// const availablePackages = {
//   '@utilso/components': {
//     Card,
//   },
// };

window.React = React;
// window.require = (p: string) => {
//   return availablePackages[p as keyof typeof availablePackages];
// };

ReactDOM.render(
  <React.StrictMode>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <ChakraProvider theme={theme}>
      <EmbedPage />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
