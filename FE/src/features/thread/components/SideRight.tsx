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
  Link,
  // useColorModeValue,
} from '@chakra-ui/react';
import { MdVerified } from 'react-icons/Md';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../../stores/types/rootState';
import { API } from '../../../lib/api';
import { GET_FOLLOWS } from '../../../stores/RootReducer';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

export default function SideRight() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state: RootState) => state.auth);
  const followState = useSelector((state: RootState) => state.follow.followState);
  const follows = useSelector((state: RootState) => state.follow.follows);
  const followingsCount = follows.length;

  async function getFollowData() {
    const response = await API.get(`/follows?type=${followState}`);
    dispatch(GET_FOLLOWS(response.data));
  }

  useEffect(() => {
    getFollowData();
  }, [followState]);
  return (
    <Box
      bgColor="#F0F5F9"
      p={{ md: '10px 10px', lg: '10px 20px' }}
    >
      <Center py={2}>
        <Box
          w={'full'}
          bg={'#dfe9f0'}
          // boxShadow={'xl'}
          rounded={'md'}
          overflow={'hidden'}
        >
          <Image
            h={'120px'}
            w={'full'}
            src={'https://images.unsplash.com/photo-1675218719517-b20e5bade63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8M3w0NTc2MTk1fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=600&q=60'}
            objectFit="cover"
            alt="#"
          />
          <Link to={'/DetailProfile/'}>
            <Flex
              justify={'start'}
              mt={-12}
              ml={5}
              mb={0}
            >
              <Avatar
                onClick={() => navigate('/DetailProfile')}
                cursor={'pointer'}
                size={'xl'}
                src={auth.picture}
                css={{
                  border: '2px solid white',
                }}
              />
            </Flex>
          </Link>

          <Box
            p={6}
            pt={0}
          >
            <Stack
              spacing={0}
              align={'start'}
              mb={1}
            >
              <Heading
                onClick={() => navigate('/DetailProfile')}
                cursor={'pointer'}
                fontSize={'md'}
                fontWeight={650}
                display={'flex'}
                flexDirection={'row'}
                alignItems={'center'}
              >
                {auth.full_name}
                <MdVerified color={'blue'} />
              </Heading>
              <Text
                color={'gray.500'}
                fontSize={'13px'}
              >
                @{auth.username}
              </Text>
              <Text
                color={'gray.900'}
                fontSize={'sm'}
              >
                {auth.description}
              </Text>
            </Stack>

            <Stack
              direction={'row'}
              justifyContent={'space-between'}
              w={'70%'}
            >
              <Flex
                alignItems={'center'}
                display={'flex'}
                w={'50%'}
              >
                <Text
                  fontSize={'16px'}
                  fontWeight={600}
                  mr={'1'}
                >
                  {followingsCount}
                </Text>
                <Text
                  fontSize={'16px'}
                  color={'gray.500'}
                >
                  Followers
                </Text>
              </Flex>
              <Flex
                alignItems={'center'}
                display={'flex'}
                w={'50%'}
              >
                <Text
                  fontSize={'16px'}
                  fontWeight={600}
                  mr={'1'}
                >
                  {followingsCount}
                </Text>
                <Text
                  fontSize={'16px'}
                  color={'gray.500'}
                >
                  Following
                </Text>
              </Flex>
            </Stack>

            {/* <Button
            w={'full'}
            mt={5}
            bg={'gray.900'}
            color={'white'}
            rounded={'md'}
            _hover={{
              transform: 'translateY(-2px)',
              boxShadow: 'lg',
            }}>
            Follow
          </Button> */}
            <Box justifyContent={'space-between'}>
              <Link to={'/editProfile' + auth.id}>
                <Button
                  cursor={'pointer'}
                  onClick={() => navigate('/editProfile/' + auth.id)}
                  w={'48%'}
                  mr={3}
                  mt={3}
                  bg={'transparent'}
                  bgColor={'gray.600'}
                  color={'white'}
                  rounded={'2xl'}
                  _hover={{
                    transform: 'translateY(-2px)',
                    boxShadow: 'lg',
                    color: 'white',
                    bgColor: '#52616B',
                  }}
                >
                  Edit Profile
                </Button>
              </Link>
              <Button
                cursor={'pointer'}
                onClick={() => navigate('/posting')}
                w={'48%'}
                mt={3}
                bg={'transparent'}
                bgColor={'blue.500'}
                color={'white'}
                rounded={'2xl'}
                _hover={{
                  transform: 'translateY(-2px)',
                  boxShadow: 'lg',
                  color: 'white',
                  // bgColor: '#52616B'
                }}
              >
                Upload Thread
              </Button>
            </Box>
          </Box>
        </Box>
      </Center>
      <Box
        bgColor="#dfe9f0"
        p="20px"
        h="400px"
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
    </Box>
  );
}
