'use client';

import { Button, Flex, FormControl, FormLabel, Heading, Input, Stack, useColorModeValue, HStack, Avatar, AvatarBadge, IconButton, Center } from '@chakra-ui/react';
import { SmallCloseIcon } from '@chakra-ui/icons';
import { useUpdateProfile } from '../hooks/useUpdateProfile';
import { Form, useNavigate } from 'react-router-dom';
import { BiImageAdd } from 'react-icons/bi';
import { useSelector } from 'react-redux';
import { RootState } from '../stores/types/rootState';

export default function FormEditProfile() {
  const navigate = useNavigate();
  const auth = useSelector((state: RootState) => {
    return state.auth;
  });
  const { UpdateUser, handleUsernameChange, handleNameChange, handleDescriptionChange, handleProfilePictureChange, previewImage } = useUpdateProfile();
  return (
    <form onSubmit={UpdateUser}>
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}
      >
        <Stack
          spacing={4}
          w={'full'}
          maxW={'md'}
          bg={useColorModeValue('white', 'gray.700')}
          rounded={'xl'}
          boxShadow={'lg'}
          p={6}
          my={12}
        >
          <Heading
            lineHeight={1.1}
            fontSize={{ base: '2xl', sm: '3xl' }}
          >
            User Profile Edit
          </Heading>

          <FormControl id="userName">
            <FormLabel>User Icon</FormLabel>
            <Stack
              direction={['column', 'row']}
              spacing={6}
            >
              <Center>
                <Avatar
                  size="xl"
                  src={auth.picture}
                >
                  <AvatarBadge
                    as={IconButton}
                    size="sm"
                    rounded="full"
                    top="-10px"
                    colorScheme="red"
                    aria-label="remove Image"
                    icon={<SmallCloseIcon />}
                  />
                </Avatar>
              </Center>
              <Center w="full">
                <Button w="full">Change Icon</Button>
              </Center>
            </Stack>
          </FormControl>
          <FormControl>
            <FormLabel
              display={'flex'}
              alignItems={'center'}
              border={'1px'}
              borderColor={'gray.300'}
              p={2}
              borderRadius={3}
              fontSize={16}
              color={'gray.500'}
              fontWeight={400}
              w={'100%'}
            >
              <BiImageAdd
                fontSize="30px"
                color="#1E2022"
              />{' '}
              Choose your favourite pictrure
              <Input
                hidden
                cursor={'pointer'}
                borderStyle="none"
                bgColor="#F0F5F970"
                color="black"
                type="file"
                placeholder="Your favorite image"
                name="picture"
                accept="image/*"
                onChange={handleProfilePictureChange}
              />
            </FormLabel>
            {previewImage && <img src={previewImage} />}
          </FormControl>

          <FormControl>
            <FormLabel>Full Name</FormLabel>
            <Input
              name="full_name"
              defaultValue={auth.full_name}
              onChange={handleNameChange}
              placeholder="Full name"
              _placeholder={{ color: 'gray.500' }}
              type="text"
              mb={4}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Username</FormLabel>
            <Input
              name="username"
              defaultValue={auth.username}
              onChange={handleUsernameChange}
              placeholder="Username"
              _placeholder={{ color: 'gray.500' }}
              type="text"
              mb={4}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Description</FormLabel>
            <Input
              name="description"
              defaultValue={auth.description}
              onChange={handleDescriptionChange}
              placeholder="Description"
              _placeholder={{ color: 'gray.500' }}
              type="text"
              mb={4}
            />
          </FormControl>
          <Stack
            spacing={6}
            direction={['column', 'row']}
          >
            <Button
              cursor={'pointer'}
              onClick={() => navigate('/')}
              bg={'red.400'}
              color={'white'}
              w="full"
              _hover={{
                bg: 'red.500',
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              bg={'blue.400'}
              color={'white'}
              w="full"
              _hover={{
                bg: 'blue.500',
              }}
            >
              Submit
            </Button>
          </Stack>
        </Stack>
      </Flex>
    </form>
  );
}
