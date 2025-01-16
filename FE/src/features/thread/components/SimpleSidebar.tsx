'use client';
// import FollowButtonWithShadown from "./FollowButtonWithShadown"
import { IconButton, Box, CloseButton, Flex, Icon, useColorModeValue, Text, Drawer, DrawerContent, useDisclosure, BoxProps, FlexProps, Button } from '@chakra-ui/react';
import { FiHome, FiSearch, FiMenu } from 'react-icons/fi';
import { RiUserFollowLine } from 'react-icons/ri';
import { CgProfile } from 'react-icons/cg';
import { IconType } from 'react-icons';
import { ReactText } from 'react';
import ButtonLogout from './ButtonLogout';

interface LinkItemProps {
  name: string;
  icon: IconType;
  href: string;
}
const LinkItems: Array<LinkItemProps> = [
  { name: 'Home', icon: FiHome, href: '/' },
  { name: 'Search', icon: FiSearch, href: '/search' },
  { name: 'Follows', icon: RiUserFollowLine, href: '/follows' },
  { name: 'Profile', icon: CgProfile, href: '/DetailProfile' },
];

export default function SimpleSidebar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box bg={useColorModeValue('#F0F5F9', 'gray.900')}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* <ButtonLogout /> */}
      {/* mobilenav */}
      <MobileNav
        display={{ base: 'flex', md: 'none' }}
        onOpen={onOpen}
      />
      <Box
        ml={{ base: 0, md: 60 }}
        p="4"
      >
        {/* Content */}
      </Box>
    </Box>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      bg={{ base: 'white', md: 'white', lg: '#dfe9f0' }}
      w={'25%'}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex
        h="20"
        alignItems="center"
        mx="4"
        justifyContent="space-between"
        pl={'7'}
      >
        <Text
          color="#1E2022"
          fontSize="4xl"
          fontWeight="bold"
          display={'flex'}
        >
          cir{' '}
          <Text
            color="green"
            fontSize="4xl"
            fontWeight="bold"
          >
            cle.
          </Text>
        </Text>
        <CloseButton
          display={{ base: 'flex', md: 'none' }}
          onClick={onClose}
        />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem
          key={link.href}
          icon={link.icon}
          href={link.href}
        >
          {link.name}
        </NavItem>
      ))}
      <Button mt={'-30px'}>
        <ButtonLogout />
      </Button>
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactText;
  href: string;
}
const NavItem = ({ icon, children, href, ...rest }: NavItemProps) => {
  return (
    <Box
      as="a"
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}
    >
      <a
        href={href}
        style={{ textDecoration: 'none' }}
      >
        <Flex
          align="center"
          p="4"
          pl={10}
          mx="4"
          borderRadius="lg"
          role="group"
          cursor="pointer"
          _hover={{
            bg: '#C9D6DF',
            color: '#1E2022',
          }}
          {...rest}
        >
          {icon && (
            <Icon
              mr="4"
              fontSize="16"
              _groupHover={{
                color: '#1E2022',
              }}
              as={icon}
            />
          )}
          {children}
        </Flex>
      </a>
    </Box>
  );
};

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      mb={'-50px'}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent="flex-start"
      {...rest}
    >
      <IconButton
        variant="outline"
        onClick={onOpen}
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        fontSize="2xl"
        ml="8"
        fontFamily="monospace"
        fontWeight="bold"
      >
        <Text
          color="#1E2022"
          fontSize="4xl"
          fontWeight="bold"
          display={'flex'}
        >
          cir{' '}
          <Text
            color="green"
            fontSize="4xl"
            fontWeight="bold"
          >
            cle.
          </Text>
        </Text>
      </Text>
    </Flex>
  );
};
