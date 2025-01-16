'use client';

import { Box, Center, Text, Stack, Avatar, Input, Button } from '@chakra-ui/react';
import { BiChat, BiLike } from 'react-icons/bi';
import { useReply } from '../hooks/useReply';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

export default function ReplyPage() {
  const { handlePostReply, handleChange, replies } = useReply();
  const navigate = useNavigate();
  return (
    <Center py={2}>
      <Box
        maxW={'500px'}
        w={'full'}
        boxShadow="md"
        bgColor={'#F2F5F9'}
        rounded={'md'}
        p={'0px 15px'}
        overflow={'hidden'}
      >
        <Box
          mt="3"
          borderRadius={10}
        >
          <form
            action=""
            onSubmit={handlePostReply}
          >
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                {/* <Avatar mr="2" name='Segun Adebayo' src="https://images.unsplash.com/photo-1488161628813-04466f872be2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fFBFT1BMRXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60"/> */}
                <Input
                  name="content"
                  onChange={handleChange}
                  borderStyle="none"
                  color="black"
                  type="text"
                  placeholder="Reply..."
                />
                {/* <Input name='image' borderStyle="none" bgColor="#F0F5F970" color="black" accept='image/*' onChange={handleImageChange} type="file" placeholder="Your favorite image"/> */}
              </Box>
              {/* <BiImageAdd fontSize="30px" color="#1E2022"/> */}
              <Button
                type="submit"
                w="15%"
                size="sm"
                bgColor="#52616B"
                color="white"
                borderRadius="20px"
                ml="2"
                _hover={{ bg: 'blue.500' }}
              >
                Post
              </Button>
            </Box>
          </form>
        </Box>
        {replies?.map((reply) => {
          return (
            <Stack
              mt={0}
              direction={'row'}
              spacing={4}
              align={'center'}
              mb={'2'}
            >
              <Avatar
                src={reply.user?.picture}
                mb={10}
                onClick={() => navigate('/profile/' + reply.user.id)}
                cursor={'pointer'}
              />
              <Box>
                <Stack
                  direction={'row'}
                  spacing={3}
                  fontSize={'sm'}
                  display={'flex'}
                  mb={'5px'}
                  mt={5}
                >
                  <Text
                    onClick={() => navigate('/profile/' + reply.user.id)}
                    cursor={'pointer'}
                    fontWeight={600}
                  >
                    {reply.user?.full_name}
                  </Text>
                  <Text color={'gray.500'}>{moment(reply.posted_at).startOf('minute').fromNow()} </Text>
                </Stack>
                <Text
                  color={'gray.700'}
                  fontSize={'13px'}
                >
                  {reply.content}
                </Text>
                <Stack
                  pb={'5'}
                  display={'flex'}
                  direction={'row'}
                  w="28%"
                  ml={'50px'}
                  justify="space-around"
                  sx={{
                    '& > button': {
                      minW: '136px',
                    },
                  }}
                >
                  <Button
                    color="#1E2022"
                    variant="ghost"
                    leftIcon={
                      <BiLike
                        color={'red'}
                        marginRight={'5px'}
                      />
                    }
                  >
                    Like
                  </Button>
                  <Button
                    color="#1E2022"
                    flex="1"
                    variant="ghost"
                    leftIcon={<BiChat />}
                  >
                    {' '}
                    Replies
                  </Button>
                </Stack>
              </Box>
            </Stack>
          );
        })}
      </Box>
    </Center>
  );
}
