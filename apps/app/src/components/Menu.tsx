import { Stack, useOutsideClick } from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';

export type MenuProps = {
  isOpen: boolean;
  onClose: () => void;
  offset?: {
    x: number;
    y: number;
  };
};

const Menu: React.FC<MenuProps> = ({
  isOpen,
  children,
  onClose,
  offset = { x: 0, y: 0 },
}) => {
  if (!isOpen) return null;
  const menuRef = useRef<HTMLDivElement>(null);
  const [focusedIndex, setFocusedIndex] = useState(0);

  useEffect(() => {
    if (!menuRef.current || !isOpen) return;

    setFocusedIndex(0);
  }, [isOpen]);

  useEffect(() => {
    if (!menuRef.current || !isOpen || focusedIndex === -1) return;

    const node = menuRef.current.childNodes[focusedIndex];
    (node as any)?.focus();
  }, [focusedIndex]);

  useOutsideClick({
    ref: menuRef,
    handler: onClose,
  });

  useEffect(() => {
    if (!menuRef.current || !isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (!menuRef.current) return;
      const totalChildren = menuRef.current.childNodes.length;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setFocusedIndex((focusedIndex + 1) % totalChildren);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setFocusedIndex(focusedIndex - 1 < 0 ? totalChildren - 1 : focusedIndex - 1);
      } else if (e.key === 'Escape') {
        e.preventDefault();
        closeMenu();
      }
    };

    window.addEventListener('keydown', onKeyDown);

    return () => window.removeEventListener('keydown', onKeyDown);
  }, [focusedIndex, isOpen]);

  const closeMenu = () => {
    setFocusedIndex(-1);
    onClose();
  };

  const onBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (e.target.parentElement !== menuRef.current) {
      closeMenu();
    }
  };

  const onClick = () => {
    closeMenu();
  };

  return (
    <Stack
      position="absolute"
      ref={menuRef}
      onBlur={onBlur}
      onClick={onClick}
      left={offset.x}
      top={offset.y}>
      {children}
    </Stack>
  );
};

export default Menu;
