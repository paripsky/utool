import './App.css';

import { Box, chakra } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <Box d="flex" minH="100vh">
      {/* <Navbar /> */}
      <chakra.main
        p={4}
        // minH="calc(100vh - 4rem - 1px)"
        // bg={useColorModeValue('gray.100', 'gray.900')}
      >
        <Outlet />
      </chakra.main>
    </Box>
  );
}

export default App;
