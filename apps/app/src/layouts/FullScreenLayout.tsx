import { Box, useColorModeValue } from '@chakra-ui/react';
import React from 'react';

import Head from '../components/Head';

const FullScreenLayout: React.FC = ({ children }) => {
  return (
    <Box
      bg={useColorModeValue('gray.50', 'inherit')}
      minH="100vh"
      py="12"
      px={{ base: '4', lg: '8' }}
      d="flex">
      <Head />
      {children}
    </Box>
  );
};

export default FullScreenLayout;
