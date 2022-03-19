import './App.css';

import { Box, chakra, useColorMode } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';

import Head from './components/Head';
import Sidebar from './components/Sidebar';

function App() {
  const { colorMode } = useColorMode();

  return (
    <Box d="flex" h="100vh" css={{ colorScheme: colorMode }}>
      <Head />
      {/* <Navbar /> */}
      <Sidebar />
      <chakra.main
        p={4}
        w="full"
        overflow="auto"
        // minH="calc(100vh - 4rem - 1px)"
        // bg={useColorModeValue('gray.100', 'gray.900')}
      >
        <Outlet />
      </chakra.main>
    </Box>
  );
}

export default App;
