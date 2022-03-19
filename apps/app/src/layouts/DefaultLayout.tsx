import { Box, chakra } from '@chakra-ui/react';
import React from 'react';

import Head from '../components/Head';
import Sidebar from '../components/Sidebar';

const DefaultLayout: React.FC = ({ children }) => {
  return (
    <Box d="flex" minH="100vh">
      <Head />
      <Sidebar />
      <chakra.main
        p={4}
        // minH="calc(100vh - 4rem - 1px)"
        // bg={useColorModeValue('gray.100', 'gray.900')}
      >
        {children}
      </chakra.main>
    </Box>
  );
};

export default DefaultLayout;
