import { IconButton, useColorMode } from '@chakra-ui/react';
import {
  Box,
  Button,
  chakra,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import Editor from '@monaco-editor/react';
import React, { useEffect, useRef, useState } from 'react';
import { MdRefresh } from 'react-icons/md';

export type CreateUtilPageProps = {};

const codeTemplate = `export default function Counter({ pluginContext }) {
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
`;

const CreateUtilPage: React.FC<CreateUtilPageProps> = () => {
  const { colorMode } = useColorMode();
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [showIframe, setShowIframe] = useState(false);
  const [code, setCode] = useState(codeTemplate);
  const [monacoTheme, setMonacoTheme] = useState('vs-dark');
  const [iframeKey, setIframeKey] = useState(0);

  const url = `${import.meta.env.VITE_EMBED_URL}?colorMode=${colorMode}`;

  const sendCodeToIframe = () => {
    // TODO: change target origin
    iframeRef.current?.contentWindow?.postMessage({ name: 'code', code }, '*');
  };

  const onIframeLoad = () => {
    setShowIframe(true);
  };

  const codeChanged = (newCode = codeTemplate) => {
    setCode(newCode);
  };

  const reloadIframe = () => {
    setShowIframe(false);
    setIframeKey(iframeKey + 1);
  };

  useEffect(() => {
    sendCodeToIframe();
  }, [code]);

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (event.data === 'ready') {
        sendCodeToIframe();
      }
    };
    window.addEventListener('message', onMessage);

    return () => window.removeEventListener('message', onMessage);
  }, [code]);

  useEffect(() => {
    setMonacoTheme(colorMode === 'light' ? 'vs-light' : 'vs-dark');
  }, [colorMode]);

  return (
    <Box>
      <chakra.form onSubmit={(e) => e.preventDefault()}>
        <FormControl maxW="xl">
          <FormLabel htmlFor="name">Util name</FormLabel>
          <Input id="name" type="text" placeholder="Util name" />
          <FormHelperText>Pick a name for you util</FormHelperText>
        </FormControl>
        <FormControl maxW="5xl" mt="2">
          <FormLabel htmlFor="name">Code</FormLabel>
          <FormHelperText>Add your util&apos;s code</FormHelperText>
          <Box height="lg" mt="2">
            <Editor
              height="100%"
              defaultLanguage="javascript"
              theme={monacoTheme}
              defaultValue={codeTemplate}
              onChange={codeChanged}
            />
          </Box>
        </FormControl>
        <FormControl maxW="5xl" mt="2">
          <FormLabel htmlFor="name">
            Preview
            <IconButton
              aria-label="Refresh Preview"
              variant="ghost"
              size="xs"
              fontSize="md"
              ml="2"
              onClick={reloadIframe}
              icon={<MdRefresh />}
            />
          </FormLabel>
          <FormHelperText>Test your utility before adding it</FormHelperText>
          <Box mt="4">
            <Box
              key={iframeKey}
              m={-4}
              as="iframe"
              src={url}
              w="full"
              h="full"
              ref={iframeRef}
              d={showIframe ? 'auto' : 'none'}
              onLoad={onIframeLoad}
            />
          </Box>
        </FormControl>
        <Button mt="4" type="submit">
          Create
        </Button>
      </chakra.form>
    </Box>
  );
};

export default CreateUtilPage;
