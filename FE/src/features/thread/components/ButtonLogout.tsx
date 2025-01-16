'use client';

import { Button, Flex } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useLogin } from '../../auth/hooks/useLogin';
import { RiLogoutCircleLine } from 'react-icons/ri';

export default function ButtonLogout() {
  const navigate = useNavigate();
  const { handleLogout } = useLogin();
  return (
    <Flex
      h="100vh"
      alignItems="center"
    >
      <Button
        style={{ cursor: 'pointer' }}
        onClick={() => {
          handleLogout();
          navigate('/login');
        }}
        pos="fixed"
        ml="25px"
        mt="5em "
        px={9}
        fontSize={'sm'}
        rounded={'full'}
        bg={'green'}
        color={'white'}
        gap={1}
        // boxShadow={
        //   '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
        // }
        _hover={{
          bg: 'blue.500',
        }}
        _focus={{
          bg: 'blue.500',
        }}
      >
        <RiLogoutCircleLine fontSize={'18'} />
        Logout
      </Button>
    </Flex>
  );
}
