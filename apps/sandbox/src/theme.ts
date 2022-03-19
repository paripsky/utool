import { extendTheme } from '@chakra-ui/react';

const colorMode = new URL(window.location.href).searchParams.get('colorMode');

if (colorMode) {
  localStorage.setItem('chakra-ui-color-mode', colorMode);
}

const theme = extendTheme({
  config: {
    initialColorMode: colorMode,
    useSystemColorMode: false,
  },
});

export default theme;
