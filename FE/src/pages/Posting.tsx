'use client';

import { Button, Flex, FormControl, FormLabel, Heading, Input, Stack, useColorModeValue } from '@chakra-ui/react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useHooks } from '../hooks/useHooks';
import { BiImageAdd } from 'react-icons/bi';

export default function Posting() {
  const { createThread, handleContentChange, handleImageChange, previewImage, handleUploadCheck, isLoading } = useHooks();
  const navigate = useNavigate();

  return (
    <div>
      <form
        action=""
        onSubmit={createThread}
      >
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
              Upload Thread
            </Heading>
            <FormControl>
              <FormLabel>Caption</FormLabel>
              <Input
                placeholder="what's your feel today?"
                _placeholder={{ color: 'gray.500' }}
                type="text"
                name="content"
                onChange={handleContentChange}
              />
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
                  name="image"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </FormLabel>
            </FormControl>
            {previewImage && <img src={previewImage} />}
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
                onClick={handleUploadCheck}
                type="submit"
                bg={'blue.400'}
                color={'white'}
                w="full"
                _hover={{
                  bg: 'blue.500',
                }}
              >
                {isLoading ? <Navigate to="/loading" /> : 'Upload'}
              </Button>
            </Stack>
          </Stack>
        </Flex>
      </form>
    </div>
  );
}
