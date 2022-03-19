import { Box, Button } from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';

import { transform } from '../utils/transform';

// const plugin = `
// export default function Comp({ pluginContext }) {
//     const { Button } = pluginContext.components;
//     return <Button onClick={() => console.log('clicked')}>ok</Button>;
//   }
//   `;

const pluginContext = {
  components: {
    Button,
    Box,
  },
  hooks: {
    useState,
  },
};

/**
 * Structure is {author/id} ?
 */
// const builtInEmbeds = {
//   'builtins/base64': base64Embed,
// };

const EmbedPage: React.FC = () => {
  const code = new URL(window.location.href).searchParams.get('code');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  //   const [, forceUpdate] = useReducer((x) => x + 1, 0);
  const componentRef = useRef<React.FC<{ pluginContext: typeof pluginContext }> | null>(
    null,
  );
  const Component = componentRef.current;

  const fetchComponent = async (code: string) => {
    try {
      setError(false);
      setLoading(true);
      // fetch script and babel transform
      const transformedCode = (transform(code) || '').replaceAll('/*#__PURE__*/', '');
      const dataUri = `data:text/javascript;charset=utf-8,${transformedCode}`;
      const module = await import(dataUri);
      componentRef.current = module.default;
      setLoading(false);
    } catch (e) {
      console.error(e);
      setLoading(false);
      setError(true);
    }
  };

  // useEffect(() => {
  //   fetchComponent();
  // }, []);

  useEffect(() => {
    window.addEventListener('message', (event) => {
      // TODO: add the check for the origin
      // if (isOriginAllowed(event.origin)) {
      if (event.data.name === 'code') {
        console.log('code', event.data);
        fetchComponent(event.data.code);
      }
    });
    // TODO: change target origin
    window.top?.postMessage('ready', '*');
  }, []);

  if (loading || !Component) {
    return <div>loading...</div>;
  }

  if (error) {
    return <div>Something went wrong.</div>;
  }

  return (
    <Box p={4}>
      <Component pluginContext={pluginContext} />
      {code}
    </Box>
  );
};

export default EmbedPage;
