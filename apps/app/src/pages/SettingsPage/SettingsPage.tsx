import {
  Box,
  chakra,
  Checkbox,
  Flex,
  GridItem,
  Heading,
  Radio,
  RadioGroup,
  SimpleGrid,
  Stack,
  Text,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import React from 'react';

const SettingsPage: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box p={8}>
      <Box mt={[10, 0]}>
        <SimpleGrid
          display={{ base: 'initial', md: 'grid' }}
          columns={{ md: 3 }}
          spacing={{ md: 6 }}>
          <GridItem colSpan={{ md: 1 }}>
            <Box px={[4, 0]}>
              <Heading fontSize="lg" fontWeight="medium" lineHeight="6">
                General
              </Heading>
              <Text
                mt={1}
                fontSize="sm"
                color={useColorModeValue('gray.600', 'gray.400')}>
                Common app options
              </Text>
            </Box>
          </GridItem>
          <GridItem mt={[5, null, 0]} colSpan={{ md: 2 }}>
            <chakra.form
              method="POST"
              shadow="base"
              rounded={[null, 'md']}
              overflow={{ sm: 'hidden' }}>
              <Stack
                px={4}
                py={5}
                p={[null, 6]}
                bg={useColorModeValue('white', 'gray.700')}
                spacing={6}>
                <chakra.fieldset>
                  <Box
                    as="legend"
                    fontSize="md"
                    color={useColorModeValue('gray.900', 'gray.50')}>
                    Theme
                    <Text fontSize="sm" color={useColorModeValue('gray.500', 'gray.400')}>
                      Color theme
                    </Text>
                  </Box>
                  <RadioGroup
                    fontSize="sm"
                    color={useColorModeValue('gray.700', 'gray.50')}
                    mt={4}
                    value={colorMode}
                    onChange={(value) =>
                      value !== colorMode ? toggleColorMode() : null
                    }>
                    <Stack spacing={4}>
                      <Radio spacing={3} value="dark">
                        Dark
                      </Radio>
                      <Radio spacing={3} value="light">
                        Light
                      </Radio>
                    </Stack>
                  </RadioGroup>
                </chakra.fieldset>
                <chakra.fieldset>
                  {/* <Box
                    as="legend"
                    fontSize="md"
                    color={useColorModeValue('gray.900', 'gray.50')}>
                    Send statistics and crash reports
                    <Text fontSize="sm" color={useColorModeValue('gray.500', 'gray.400')}>
                      Color theme
                    </Text>
                  </Box> */}
                  <Flex alignItems="start">
                    <Flex alignItems="center" h={5}>
                      <Checkbox id="comments" rounded="md" />
                    </Flex>
                    <Box ml={3} fontSize="sm">
                      <chakra.label
                        htmlFor="comments"
                        fontWeight="md"
                        color={useColorModeValue('gray.700', 'gray.50')}>
                        Send statistics and crash reports
                      </chakra.label>
                      <Text color={useColorModeValue('gray.500', 'gray.400')}>
                        Get notified when someones posts a comment on a posting.
                      </Text>
                    </Box>
                  </Flex>
                </chakra.fieldset>
              </Stack>
            </chakra.form>
          </GridItem>
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default SettingsPage;
