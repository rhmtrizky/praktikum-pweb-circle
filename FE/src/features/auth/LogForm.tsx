'use client'

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { useLogin } from './hooks/useLogin'
import { Navigate, useNavigate } from 'react-router-dom'
import { useHooks } from '../../hooks/useHooks'

export default function SimpleCard() {
    const {handleChange, handleLogin} = useLogin()
    const {isLoading} = useHooks()
    const navigate = useNavigate()
  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8}  maxW={'md'} py={12} px={6} >
        <Stack align={'center'}>
          <Heading fontSize={'50px'}>Circle.</Heading>
          <Box display={'flex'}>
          <Text fontSize={'lg'} color={'gray.800'} mr={'6px'}>Login to</Text>
          <Text fontSize={'lg'} color={'green'} fontWeight={'bold'}>circle</Text>
          </Box>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input type="email" name="email" onChange={handleChange}/>
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input type="password" name="password" onChange={handleChange}/>
            </FormControl>
            <Stack spacing={5}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'end'}>
                <Text color={'gray.700'}>Forgot password?</Text>
              </Stack>
              <Button
                onClick={handleLogin}
                bg={'green'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}>
              {isLoading ? <Navigate to="/"/> : 'Sign In'}
              </Button>
              <Flex justifyContent={'space-between'}>
              <Text mr={2}>Don't have an account yet?</Text>
              <Text color={'green'} fontWeight={'600'} cursor={'pointer'} onClick={() => navigate('/register')}>Create Account</Text>
              </Flex>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}