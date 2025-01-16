'use client';

import {
  Heading,
  Avatar,
  Box,
  Center,
  Image,
  Flex,
  Text,
  Stack,
  Button,
  // useColorModeValue,
  Grid,
  SimpleGrid,
} from '@chakra-ui/react';
import SimpleSidebar from '../features/thread/components/SimpleSidebar';
import { MdVerified } from 'react-icons/Md';

import { useDispatch, useSelector } from 'react-redux';
import { GET_THREADS } from '../stores/RootReducer';
import { useState, useEffect } from 'react';
import { API } from '../lib/api';
import { useParams } from 'react-router-dom';

import { IUser } from '../interfaces/User';
import { RootState } from '../stores/types/rootState';
import ThreadCard from '../features/thread/components/ThreadCard';

export default function DetailProfileById() {
  const threads = useSelector((state: RootState) => state.thread);
  const dispatch = useDispatch();
  const [user, setUser] = useState<IUser>();
  const { id } = useParams();
  const DetailProfileByThread = async () => {
    try {
      const response = await API.get(`/profile/${id}`);
      setUser(response.data);
      dispatch(
        GET_THREADS({
          threads: response.data.threads,
        })
      );
      console.log('ini isi threads broo:', response.data.threads);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {
    DetailProfileByThread();
  }, [id]);

  return user ? (
    <>
      <SimpleGrid
        minChildWidth={'250px'}
        spacing={'7'}
      >
        <Box>
          <SimpleSidebar />
        </Box>
        <Box
          ml={{ base: '0', md: '-20%', lg: '-20%' }}
          p={3}
        >
          <Box>
            <div key={user.id}></div>
            <Box
              w={'100%'}
              display={'flex'}
              flexDirection={'column'}
              bgColor={'#F2F5F9'}
              boxShadow="md"
              border={'1px solid #a3ced1'}
              rounded={'md'}
              overflow={'hidden'}
              justifyContent={'center'}
              alignItems={'center'}
            >
              <Image
                h={'180px'}
                w={'full'}
                src={'https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'}
                objectFit="cover"
                alt="#"
              />
              <Flex
                justify={'start'}
                mt={'-100px'}
              >
                <Avatar
                  w={'220px'}
                  h={'220px'}
                  src={user.picture}
                  css={{
                    border: '2px solid white',
                  }}
                />
              </Flex>
              <Stack
                spacing={1}
                align={'center'}
                direction={'column'}
              >
                <Box
                  display="flex"
                  alignItems="center"
                  fontSize={25}
                >
                  <Heading
                    fontSize={'2xl'}
                    fontWeight={500}
                    fontFamily={'body'}
                  >
                    {user.full_name}
                  </Heading>
                  <MdVerified color={'blue'} />
                </Box>
                <Text color={'gray.500'}>@{user.username}</Text>
                <Text color={'gray.900'}>{user.description}</Text>
                <Stack
                  direction={'row'}
                  alignItems={'center'}
                  display={'flex'}
                  justifyContent={'center'}
                  mt={2}
                >
                  <Text
                    fontWeight={600}
                    fontSize={'md'}
                  >
                    23k
                  </Text>
                  <Text
                    fontSize={'md'}
                    color={'gray.500'}
                  >
                    Followers
                  </Text>
                  <Text
                    fontWeight={600}
                    fontSize={'md'}
                  >
                    23k
                  </Text>
                  <Text
                    fontSize={'md'}
                    color={'gray.500'}
                  >
                    Followers
                  </Text>
                </Stack>
              </Stack>

              <Box
                p={3}
                display={'flex'}
                w={'100%'}
                justifyContent={'space-between'}
                alignItems={'center'}
              >
                <Button
                  margin={5}
                  w={'50%'}
                  mt={8}
                  bg={'blue.500'}
                  color={'white'}
                  rounded={'md'}
                  _hover={{
                    transform: 'translateY(-2px)',
                    boxShadow: 'lg',
                    bgColor: '#F2F5F9',
                    border: '1px solid black',
                    color: 'black',
                  }}
                >
                  Follow
                </Button>
                <Button
                  margin={5}
                  w={'50%'}
                  mt={8}
                  bg={'green.500'}
                  color={'white'}
                  rounded={'md'}
                  _hover={{
                    transform: 'translateY(-2px)',
                    boxShadow: 'lg',
                    bgColor: '#F2F5F9',
                    border: '1px solid black',
                    color: 'black',
                  }}
                >
                  Unfollow
                </Button>
              </Box>
            </Box>
            <Box>
              {threads?.map((item, index) => {
                if (user.id === item.user.id)
                  return (
                    <ThreadCard
                      key={index}
                      replies_count={item.replies_count}
                      content={item.content}
                      image={item.image}
                      id={item.id}
                      likes_count={item.likes_count}
                      user={item.user}
                      is_liked={item.is_liked}
                      posted_at={item.posted_at}
                    />
                  );
              })}
            </Box>
          </Box>
        </Box>
        <Box
          bgColor="#dfe9f0"
          p="20px"
          h="400px"
          mt={3}
          mx={3}
          borderRadius={10}
        >
          <Heading
            as="h5"
            size="sm"
            color="black"
            pl="15px"
          >
            Suggest For You
          </Heading>
          <Box
            mt="20px"
            display="flex"
            justifyContent="space-around"
            alignItems="center"
            p="0 8px"
          >
            <Image
              w="40px"
              h="40px"
              objectFit="cover"
              borderRadius="50%"
              src="https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fFBFT1BMRXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60"
            ></Image>
            <Box
              marginRight="15px"
              w="65%"
              pl="2"
            >
              <Text
                color="black"
                fontSize="12px"
                fontWeight="bold"
              >
                Muhammad Ikhsan
              </Text>
              <Text
                color="#788189"
                fontSize="12px"
              >
                @mrramdhan56
              </Text>
            </Box>
            <Button size="xs">Following</Button>
          </Box>
          <Box
            mt="20px"
            display="flex"
            justifyContent="space-around"
            alignItems="center"
            p="0 8px"
          >
            <Image
              w="40px"
              h="40px"
              objectFit="cover"
              borderRadius="50%"
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60"
            ></Image>
            <Box
              marginRight="15px"
              w="65%"
              pl="2"
            >
              <Text
                color="black"
                fontSize="12px"
                fontWeight="bold"
              >
                Anwar Ahmad
              </Text>
              <Text
                color="#788189"
                fontSize="12px"
              >
                @anwar34
              </Text>
            </Box>
            <Button size="xs">Follow</Button>
          </Box>
          <Box
            mt="20px"
            display="flex"
            justifyContent="space-around"
            alignItems="center"
            p="0 8px"
          >
            <Image
              w="40px"
              h="40px"
              objectFit="cover"
              borderRadius="50%"
              src="https://plus.unsplash.com/premium_photo-1668399855680-1ee24ade4a29?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60"
            ></Image>
            <Box
              marginRight="15px"
              w="65%"
              pl="2"
            >
              <Text
                color="black"
                fontSize="12px"
                fontWeight="bold"
              >
                Angel Francis
              </Text>
              <Text
                color="#788189"
                fontSize="12px"
              >
                @aangel78
              </Text>
            </Box>
            <Button size="xs">Follow</Button>
          </Box>
          <Box
            mt="20px"
            display="flex"
            justifyContent="space-around"
            alignItems="center"
            p="0 8px"
          >
            <Image
              w="40px"
              h="40px"
              objectFit="cover"
              borderRadius="50%"
              src="https://plus.unsplash.com/premium_photo-1673957923985-b814a9dbc03d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzV8fHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60"
            ></Image>
            <Box
              marginRight="15px"
              w="65%"
              pl="2"
            >
              <Text
                color="black"
                fontSize="12px"
                fontWeight="bold"
              >
                Maya Nur Diana
              </Text>
              <Text
                color="#788189"
                fontSize="12px"
              >
                @diana_nur
              </Text>
            </Box>
            <Button size="xs">Follow</Button>
          </Box>
          <Box
            mt="20px"
            display="flex"
            justifyContent="space-around"
            alignItems="center"
            p="0 8px"
          >
            <Image
              w="40px"
              h="40px"
              objectFit="cover"
              borderRadius="50%"
              src="https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fFBFT1BMRXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60"
            ></Image>
            <Box
              marginRight="15px"
              w="65%"
              pl="2"
            >
              <Text
                color="black"
                fontSize="12px"
                fontWeight="bold"
              >
                Muhammad Ikhsan
              </Text>
              <Text
                color="#788189"
                fontSize="12px"
              >
                @mrramdhan56
              </Text>
            </Box>
            <Button size="xs">Follow</Button>
          </Box>
        </Box>
      </SimpleGrid>
    </>
  ) : null;
}
