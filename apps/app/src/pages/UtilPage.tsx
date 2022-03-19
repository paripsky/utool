import { Box, Button, useColorMode } from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
// import { useParams } from 'react-router-dom';

const UtilPage: React.FC = () => {
  // const { authorId, itemId } = useParams();
  const [showIframe, setShowIframe] = useState(false);
  const { colorMode } = useColorMode();
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [routes] = useState([
    {
      path: 'test/counter',
      code: `
  import groupBy from 'https://cdn.jsdelivr.net/npm/lodash-es@4.17.21/groupBy.js';

  export default function Counter({ pluginContext }) {
    console.log(groupBy);
    const { Button, Box } = pluginContext.components;
    const { useState } = pluginContext.hooks;
    const [count, setCount] = useState(0);

    return (
      <Box>
        <Button onClick={() => setCount(count + 1)}>+1</Button>
        <Button mx="2" onClick={() => setCount(count - 1)}>-1</Button>
        {count}
      </Box>
    );
  }
  `,
    },
  ]);

  // }/${authorId}/${itemId}?colorMode=${colorMode}`;
  const url = `${import.meta.env.VITE_EMBED_URL}?colorMode=${colorMode}`;

  const onIframeLoad = () => {
    setShowIframe(true);
  };

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (event.data === 'ready') {
        // TODO: change the targetOrigin to the embed url
        iframeRef.current?.contentWindow?.postMessage(
          { name: 'code', code: routes[0].code },
          '*',
        );
      }
    };
    window.addEventListener('message', onMessage);

    return () => window.removeEventListener('message', onMessage);
  }, []);

  return (
    <>
      <Button pos="absolute" right="10">
        Share
      </Button>
      <Box
        m={-4}
        as="iframe"
        ref={iframeRef}
        src={url}
        w="full"
        h="full"
        d={showIframe ? 'auto' : 'none'}
        onLoad={onIframeLoad}
      />
    </>
  );
};

export default UtilPage;
