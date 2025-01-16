import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Heading, Text, Image, Button, IconButton, Flex, Avatar, Box, SimpleGrid } from '@chakra-ui/react';
// import {FaCommentDots, FaHeart} from "react-icons/fa"
import { BsThreeDotsVertical } from 'react-icons/bs';
import { BiChat, BiLike } from 'react-icons/bi';
import { Card, CardBody, CardFooter, CardHeader } from '@chakra-ui/react';
import SimpleSidebar from '../features/thread/components/SimpleSidebar';
import SideRight from '../features/thread/components/SideRight';
import { Grid } from '@chakra-ui/react';
import { IThreadCard } from '../interfaces/ThreadCard';
import { API } from '../lib/api';
import ReplyPage from './ReplyPage';
import Loading from '../features/thread/components/Loading';
import { useLike } from '../hooks/useLike';
import moment from 'moment';

export function DetailPage() {
  const navigate = useNavigate();
  const { handleLikePost } = useLike();
  const [showImage, setShowImage] = useState<boolean>(true);
  const { id } = useParams();
  const [thread, setThread] = useState<IThreadCard | null>(null);
  async function getThread() {
    try {
      const response = await API.get(`/thread/${id}`);
      // console.log("test api:", response.data)
      setThread(response.data);
    } catch (error) {
      console.error('error nih', error);
    }
  }

  // const [likesCount, setLikesCount] = useState(thread?.likes_count || 0);
  // const [isLiked, setIsLiked] = useState(thread?.is_liked || false);

  //     const likehandler = () => {
  //         if (isLiked) {
  //             setLikesCount(likesCount - 1);
  //         } else {
  //             setLikesCount(likesCount + 1);
  //         }
  //         setIsLiked(!isLiked);
  //     }

  useEffect(() => {
    getThread();
  }, [id]);

  return thread ? (
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
      >
        <Box
          display={'flex'}
          flexDirection="column"
        >
          <Card
            bgColor="#F2F5F9"
            mt="5"
            border={'1px solid #a3ced1'}
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
                    onClick={() => navigate('/profile/' + thread.user.id)}
                    cursor={'pointer'}
                    name="Segun Adebayo"
                    src={thread.user?.picture}
                  />
                  <Box>
                    <Box
                      display="flex"
                      alignItems="center"
                    >
                      <Heading
                        onClick={() => navigate('/profile/' + thread.user.id)}
                        cursor={'pointer'}
                        size="sm"
                        mr="2"
                        color="black"
                      >
                        {thread.user?.full_name}
                      </Heading>
                      <Text color="gray">{moment(thread.posted_at).startOf('minute').fromNow()} </Text>
                    </Box>
                    <Text color="gray">@{thread.user?.username} </Text>
                  </Box>
                </Flex>
                <IconButton
                  variant="ghost"
                  colorScheme="gray"
                  aria-label="See menu"
                  icon={<BsThreeDotsVertical color="black" />}
                />
              </Flex>
            </CardHeader>
            <CardBody>
              <Text color="black">{thread.content}</Text>
            </CardBody>
            {showImage && (
              <Image
                w="100%"
                h="400px"
                borderRadius="2px"
                mb="10px"
                objectFit="cover"
                src={thread.image}
                onError={() => setShowImage(false)}
                alt="Chakra UI"
              />
            )}
            <CardFooter
              w="100%"
              ml={'50px'}
              justify="space-between"
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
                {thread.likes_count} Like
              </Button>
              <Button
                color="#1E2022"
                flex="1"
                variant="ghost"
                leftIcon={<BiChat />}
              >
                {thread?.replies_count} Replies
              </Button>
            </CardFooter>
          </Card>
          <ReplyPage />
        </Box>
      </Box>
      <Box>
        <SideRight />
      </Box>
    </SimpleGrid>
  ) : (
    <>
      <Loading />
    </>
  );
}
