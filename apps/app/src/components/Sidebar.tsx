import {
  Avatar,
  Box,
  chakra,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Skeleton,
  Text,
} from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import { FiSettings } from 'react-icons/fi';
import { MdAddCircleOutline, MdStorefront } from 'react-icons/md';
import { useLocation, useSearchParams } from 'react-router-dom';

import { useUser } from '../context/user';
import { routes as utilityRoutes } from '../pages/utilities';
import Link from './Link';
import LinkButton from './LinkButton';

const Sidebar: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const [searchText, setSearchText] = useState(searchParams.get('search') || '');
  const searchRef = useRef<HTMLInputElement>(null);
  const { user, clearUser, loadingUser } = useUser();
  const [routes] = useState([
    ...utilityRoutes,
    { path: '/util/test/counter', name: 'Counter', icon: undefined },
  ]);
  const name = 'John Doe The Third III';
  const email = user?.email;

  useEffect(() => {
    if (!searchText) {
      setSearchParams({});
      return;
    }

    setSearchParams({ search: searchText });
  }, [searchText]);

  return (
    <chakra.aside d="flex" flexDir="column" w="3xs" p="2" borderRightWidth={1}>
      <Link to="/">
        <Text
          fontSize="xl"
          d="inline"
          fontWeight="bold"
          mx="1"
          px="1"
          bg="purple.800"
          color="white">
          U
        </Text>
        <Text fontSize="lg" d="inline">
          tool
        </Text>
        <Text fontSize="xs" d="inline">
          .com
        </Text>
      </Link>
      <InputGroup my="2">
        {/* <InputRightElement>
          <Kbd>/</Kbd>
        </InputRightElement> */}
        <InputLeftElement>
          <Icon as={BsSearch} />
        </InputLeftElement>
        <Input
          placeholder="Search"
          ref={searchRef}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </InputGroup>
      <Box flex="1" maxH="full" overflow="auto" p="1">
        {/* Content */}
        {/* <Link to="/util/base64">base64</Link> */}
        {routes.map(({ path, name, icon }) => (
          <LinkButton
            key={path}
            leftIcon={<Icon boxSize={5} as={icon} />}
            w="full"
            justifyContent="flex-start"
            variant={location.pathname.includes(path) ? 'solid' : 'outline'}
            mb="2"
            to={path}>
            {name}
          </LinkButton>
        ))}
      </Box>
      <LinkButton
        leftIcon={<Icon boxSize={5} as={MdAddCircleOutline} />}
        w="full"
        justifyContent="flex-start"
        variant="ghost"
        mt="2"
        to="/util/new">
        Create
      </LinkButton>
      <LinkButton
        leftIcon={<Icon boxSize={5} as={MdStorefront} />}
        w="full"
        justifyContent="flex-start"
        variant="ghost"
        my="2"
        to="/marketplace">
        Marketplace
      </LinkButton>
      <LinkButton
        leftIcon={<Icon boxSize={5} as={FiSettings} />}
        w="full"
        justifyContent="flex-start"
        variant="ghost"
        to="/settings">
        Settings
      </LinkButton>
      <Box borderTopWidth={1} mb="2" mt="4"></Box>
      <Skeleton isLoaded={!loadingUser}>
        {user ? (
          <Menu placement="top">
            <MenuButton aria-label="Options" as="div">
              <Box
                d="flex"
                alignItems="center"
                p="2"
                pointerEvents="all"
                cursor="pointer">
                <Avatar
                  name="John Doe"
                  size="sm"
                  src="https://bit.ly/dan-abramov"
                  mr="2"
                />
                <Box overflow="hidden">
                  {/* <Link to="/login"> */}
                  <Text fontWeight="semibold" isTruncated title={name}>
                    {name}
                  </Text>
                  <Text fontSize="sm" isTruncated title={email}>
                    {email}
                  </Text>
                  {/* </Link> */}
                </Box>
              </Box>
            </MenuButton>
            <MenuList>
              <MenuItem onClick={clearUser}>Log out</MenuItem>
            </MenuList>
          </Menu>
        ) : (
          <LinkButton to="/login" w="full">
            Log in
          </LinkButton>
        )}
      </Skeleton>
    </chakra.aside>
  );
};

export default Sidebar;
