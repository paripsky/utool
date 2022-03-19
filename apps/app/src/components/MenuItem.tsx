import { Button, ButtonProps } from '@chakra-ui/react';
import React from 'react';

export type MenuItemProps = ButtonProps;

const MenuItem: React.FC<MenuItemProps> = ({ children, ...otherProps }) => {
  return <Button {...otherProps}>{children}</Button>;
};

export default MenuItem;
