'use client'
import {
  Button,
  Box,
  Flex,
  Text,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Image,
} from '@chakra-ui/react'

import { useNavigate } from 'react-router-dom'
import { useLogin } from './hooks/useLogin'

export default function LoginForm() {

  const {handleChange, handleLogin} = useLogin()
  
  const navigate = useNavigate()

  return (
    <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
      <Flex p={8} flex={1} align={'center'} justify={'center'}>
        <Stack spacing={4} w={'full'} maxW={'md'}>
          <Box display={"flex"} justifyContent={"space-evenly"} bgColor={'gray.200'} w="70%" mb={5}>
                <Button fontFamily={'heading'} bg={'grey.200'}  bgGradient="linear(to-r, red.400,pink.400)" color={'white'} w="50%">
                    Sign In
                </Button>
                <Button fontFamily={'heading'} bg={'grey.200'} w="50%" onClick={() =>  navigate('/register')}>
                    Sign Up
                </Button>
            </Box>
          <FormControl id="email">
            <FormLabel>Email address</FormLabel>
            <Input type="email" name="email" onChange={handleChange} />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input type="password" name="password" onChange={handleChange}/>
          </FormControl>
          <Stack spacing={6}>
            <Stack
              direction={{ base: 'column', sm: 'row' }}
              align={'start'}
              justify={'space-between'}>
              <Text color={'blue.500'} cursor={'pointer'} onClick={() =>  navigate('/register')}>Belum punya akun?</Text>
            </Stack>
            <Button bgGradient="linear(to-r, red.400,pink.400)" color={'white'} variant={'solid'} onClick={handleLogin}>
              Sign in
            </Button>
          </Stack>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image
          alt={'Login Image'}
          objectFit={'cover'}
          src={
            'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80'
          }
        />
      </Flex>
    </Stack>
  )
}