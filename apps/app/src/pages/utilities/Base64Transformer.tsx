import { Box, Text } from '@chakra-ui/react';
import { Button, TextArea } from '@utool/components';
import React, { useEffect, useState } from 'react';

const placeholderText = {
  to: 'Enter a string to encode to base64',
  from: 'Enter a Base64 string to decode',
};

const Base64Transformer: React.FC = () => {
  const [input, setInput] = useState('');
  const [base64, setBase64] = useState('');
  const [mode, setMode] = useState<'to' | 'from'>('to');
  const converterFunction = mode === 'to' ? btoa : atob;

  useEffect(() => {
    try {
      setBase64(converterFunction(input));
    } catch {
      setBase64('Invalid String');
    }
  }, [input, mode]);

  const reset = () => setInput('');

  const toogleMode = () => setMode(mode === 'to' ? 'from' : 'to');

  return (
    <Box h="full" d="flex" flexDirection="column">
      <Box mb="2" d="flex">
        <Text fontSize="2xl">Convert</Text>
        <Button
          variant="outline"
          size="sm"
          alignSelf="center"
          onClick={toogleMode}
          mx="2">
          {mode} Base64
        </Button>
        <Button variant="ghost" onClick={reset} ml="auto">
          Reset
        </Button>
        <Button variant="ghost" onClick={reset} ml="2">
          Copy To Clipboard
        </Button>
      </Box>
      <Box wordBreak="break-all" flex="1" d="flex" flexDirection="column">
        <TextArea
          flex="1"
          mb="4"
          placeholder={placeholderText[mode]}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <TextArea flex="1" readOnly value={base64} />
      </Box>
    </Box>
  );
};

export const name = 'Base64 Transformer';

export default Base64Transformer;
