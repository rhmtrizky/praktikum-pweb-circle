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
  Card,
  CardHeader,
  IconButton,
  CardBody,
  CardFooter,
  SimpleGrid,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '@chakra-ui/react';
import SimpleSidebar from '../features/thread/components/SimpleSidebar';
import { MdVerified } from 'react-icons/Md';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../stores/types/rootState';
import { GET_FOLLOWS, GET_THREADS } from '../stores/RootReducer';
import { useState, useEffect } from 'react';
import { IThreadCard } from '../interfaces/ThreadCard';
import { API } from '../lib/api';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import { BiChat, BiLike, BiShare } from 'react-icons/bi';
import { useLike } from '../hooks/useLike';
import moment from 'moment';

export default function DetailProfile() {
  // const navigate = useNavigate()
  const [threads, setThreads] = useState<IThreadCard[]>();
  const dispatch = useDispatch();

  console.log('threads', threads);

  const followState = useSelector((state: RootState) => state.follow.followState);
  const follows = useSelector((state: RootState) => state.follow.follows);
  const followsCount = follows.length;

  async function getFollowData() {
    const response = await API.get(`/follows?type=${followState}`);
    dispatch(GET_FOLLOWS(response.data));
  }

  useEffect(() => {
    getFollowData();
  }, [followState]);
  const fetchDataByIdUser = async () => {
    try {
      const response = await API.get('/threads/profile');
      setThreads(response.data);
      dispatch(
        GET_THREADS({
          threads: response.data,
        })
      );
      // const item = response.data
      // console.log('Fetched threads WOIIII:', response.data)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchDataByIdUser();
  }, []);

  const [selectedThread, setSelectedThread] = useState<any>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Open the delete modal for a specific thread
  const confirmDelete = (thread: any) => {
    setSelectedThread(thread);
    onOpen();
  };

  // // Handle thread deletion
  const handleDelete = async () => {
    if (selectedThread) {
      await API.delete(`/thread/delete/${selectedThread.id}`);
      fetchDataByIdUser();
      onClose();
    }
  };

  const { handleLikePost } = useLike();
  const [showImage, setShowImage] = useState<boolean>(true);
  const auth = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  return (
    <SimpleGrid
      minChildWidth={'250px'}
      spacing={'7'}
    >
      <Box>
        <SimpleSidebar />
      </Box>
      <Box
        w={{ base: '100%', md: '500px', lg: '500px' }}
        ml={{ base: '0', md: '-20%', lg: '-20%' }}
        px={2}
        pt={'-20'}
      >
        <Box>
          <Center py={3}>
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
                  src={auth.picture}
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
                    {auth.full_name}
                  </Heading>
                  <MdVerified color={'blue'} />
                </Box>
                <Text color={'gray.500'}>@{auth.username}</Text>
                <Text color={'gray.900'}>{auth.description}</Text>
                <Stack
                  direction={'row'}
                  alignItems={'center'}
                  display={'flex'}
                  justifyContent={'center'}
                  my={0}
                >
                  <Text
                    fontWeight={600}
                    fontSize={'md'}
                  >
                    {followsCount}
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
                    {followsCount}
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
                  onClick={() => navigate('/editProfile/' + auth.id)}
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
                  Edit Profile
                </Button>
                <Button
                  onClick={() => navigate('/posting')}
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
                  Upload Thread
                </Button>
              </Box>
            </Box>
          </Center>
          {threads &&
            threads.map((thread) => (
              <Card
                w="100%"
                mr="27px"
                key={thread.id}
                bgColor="#F2F5F9"
                mt={3}
                boxShadow="md"
                border="1px solid #a3ced1"
              >
                <CardHeader>
                  <Flex gap={4}>
                    <Flex
                      flex="1"
                      gap="4"
                      alignItems="center"
                      flexWrap="wrap"
                    >
                      <Avatar
                        name="Segun Adebayo"
                        src={thread.user?.picture}
                      />
                      <Box>
                        <Box
                          display="flex"
                          alignItems="center"
                        >
                          <Heading
                            size="sm"
                            mr="2"
                            color="black"
                          >
                            {thread.user?.full_name}
                          </Heading>
                          <Text color="gray">{moment(thread.posted_at).startOf('minute').fromNow()}</Text>
                        </Box>
                        <Text color="gray">@{thread.user?.username}</Text>
                      </Box>
                    </Flex>

                    <Button
                      style={{ backgroundColor: 'red', color: 'white' }}
                      onClick={() => confirmDelete(thread)}
                    >
                      Delete
                    </Button>
                  </Flex>
                </CardHeader>
                <CardBody>
                  <Text color="black">{thread.content}</Text>
                </CardBody>
                <Link to={'/thread/' + thread.id}>
                  {thread.image && (
                    <Image
                      w="100%"
                      h="400px"
                      borderRadius="2px"
                      mb="10px"
                      objectFit="cover"
                      src={thread.image}
                      alt="Thread Image"
                    />
                  )}
                </Link>
                <CardFooter
                  w="95%"
                  justify="space-around"
                  flexWrap="wrap"
                  sx={{
                    '& > button': {
                      minW: '136px',
                    },
                  }}
                >
                  <Button
                    color="#1E2022"
                    variant="ghost"
                    onClick={() => handleLikePost(thread.id, thread.is_liked)}
                    leftIcon={<BiLike style={thread.is_liked ? { color: 'red' } : { color: 'black' }} />}
                  >
                    {thread.likes_count} Likes
                  </Button>
                  <Link to={'/thread/' + thread.id}>
                    <Button
                      color="#1E2022"
                      variant="ghost"
                      leftIcon={<BiChat />}
                    >
                      {thread.replies_count} Replies
                    </Button>
                  </Link>
                  <Link to={'/thread/update/' + thread.id}>
                    <Button
                      cursor="pointer"
                      color="#1E2022"
                      variant="ghost"
                      leftIcon={<BiShare />}
                    >
                      Share
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
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
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm Delete</ModalHeader>
          <ModalBody>Are you sure you want to delete this thread? This action cannot be undone.</ModalBody>
          <ModalFooter>
            <Button
              colorScheme="red"
              mr={3}
              onClick={handleDelete}
            >
              Yes, Delete
            </Button>
            <Button
              variant="ghost"
              onClick={onClose}
            >
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </SimpleGrid>
  );
}
