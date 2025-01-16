import { useState } from 'react';
import { Heading, Text, Image, Button, IconButton, Flex, Avatar, Box, Card, CardBody, CardFooter, CardHeader } from '@chakra-ui/react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { BiChat, BiLike, BiShare } from 'react-icons/bi';
import { Link, useNavigate } from 'react-router-dom';
import { IThreadCard } from '../../../interfaces/ThreadCard';
import { useLike } from '../../../hooks/useLike';
import moment from 'moment';

function ThreadCard(props: IThreadCard) {
  let replyName = '';
  if (props.replies_count > 1) {
    replyName = 'Replies';
  } else {
    replyName = 'Reply';
  }

  let likeName = '';
  if (props.likes_count > 1) {
    likeName = 'Likes';
  } else {
    likeName = 'Like';
  }
  const navigate = useNavigate();
  const { handleLikePost } = useLike();
  const [showImage, setShowImage] = useState<boolean>(true);

  return (
    <Card
      bgColor="#F2F5F9"
      mt="3"
      boxShadow="md"
      border={'1px solid #a3ced1'}
    >
      <CardHeader>
        <Flex gap={4}>
          <Flex
            flex="1"
            gap="3"
            alignItems="center"
            flexWrap="wrap"
          >
            <Avatar
              onClick={() => navigate('/profile/' + props.user.id)}
              cursor={'pointer'}
              name="Segun Adebayo"
              src={props.user?.picture}
            />
            <Box>
              <Box
                display="flex"
                alignItems="center"
              >
                <Heading
                  onClick={() => navigate('/profile/' + props.user.id)}
                  cursor={'pointer'}
                  size="sm"
                  mr="2"
                  color="black"
                >
                  {props.user?.full_name}
                </Heading>
                <Text color="gray">{moment(props.posted_at).startOf('minute').fromNow()} </Text>
              </Box>
              <Text
                color="gray"
                onClick={() => navigate('/profile/' + props.user.id)}
                cursor={'pointer'}
              >
                @{props.user?.username}{' '}
              </Text>
            </Box>
          </Flex>
        </Flex>
      </CardHeader>
      <Link to={'/thread/' + props.id}>
        <CardBody>
          <Text color="black">{props.content}</Text>
        </CardBody>
      </Link>
      <Link to={'/thread/' + props.id}>
        {showImage && (
          <Image
            w="100%"
            h="400px"
            borderRadius="2px"
            mb="10px"
            objectFit="cover"
            src={props?.image}
            onError={() => setShowImage(false)}
            alt="Chakra UI"
          />
        )}
      </Link>
      <CardFooter
        w={{ base: '85%', sm: '100%', md: '90%', lg: '90%' }}
        justify="space-around"
        bg={'yelllow'}
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
          onClick={() => handleLikePost(props.id, props.is_liked)}
          leftIcon={<BiLike style={props.is_liked ? { color: 'red' } : { color: 'black' }} />}
        >
          {props.likes_count} {likeName}
        </Button>
        <Link to={'/thread/' + props.id}>
          <Button
            color="#1E2022"
            variant="ghost"
            leftIcon={<BiChat />}
          >
            {props?.replies_count} {replyName}
          </Button>
        </Link>
        <Link to={'/thread/update/' + props.id}>
          <Button
            cursor={'pointer'}
            color="#1E2022"
            variant="ghost"
            leftIcon={<BiShare />}
          >
            Share
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}

export default ThreadCard;
