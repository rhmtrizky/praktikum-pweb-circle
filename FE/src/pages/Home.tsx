import ThreadCard from '../features/thread/components/ThreadCard';
import SimpleSidebar from '../features/thread/components/SimpleSidebar';
import SideRight from '../features/thread/components/SideRight';
import { FormLabel, SimpleGrid, Box, Button, Avatar, Input } from '@chakra-ui/react';
import { useHooks } from '../hooks/useHooks';
import { BiImageAdd } from 'react-icons/bi';
import { useSelector } from 'react-redux';
import { RootState } from '../stores/types/rootState';

function Home() {
  const ThreadRedux = useSelector((state: RootState) => state.thread);
  const auth = useSelector((state: RootState) => state.auth);
  const { createThread, handleContentChange, handleImageChange, handleUploadCheck } = useHooks();
  return (
    <SimpleGrid
      minChildWidth={'250px'}
      spacing={'7'}
    >
      <Box>
        <SimpleSidebar />
      </Box>
      <Box>
        <Box
          w={{ base: '100%', md: '500px', lg: '500px' }}
          ml={{ base: '0', md: '-20%', lg: '-20%' }}
          p={3}
          pt={'-20'}
        >
          <form
            action=""
            onSubmit={createThread}
          >
            <Box
              mt={{ base: '0', md: '-100px', lg: '5' }}
              p="10px"
              border="1px solid #a3ced1"
              borderRadius={10}
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
                  <Avatar
                    mr="2"
                    name="Segun Adebayo"
                    src={auth.picture}
                  />
                  <Input
                    name="content"
                    borderStyle="none"
                    color="black"
                    onChange={handleContentChange}
                    type="text"
                    placeholder="what's happening today?"
                  />
                </Box>
                <Box
                  display={'flex'}
                  mt={2}
                >
                  <FormLabel
                    cursor={'pointer'}
                    fontSize={16}
                    color={'gray.500'}
                    fontWeight={400}
                  >
                    <BiImageAdd
                      fontSize="30px"
                      color="#1E2022"
                    />
                    <Input
                      hidden
                      name="image"
                      borderStyle="none"
                      bgColor="#F0F5F970"
                      color="black"
                      accept="image/*"
                      onChange={handleImageChange}
                      type="file"
                      placeholder="Your favorite image"
                    />
                  </FormLabel>
                  <Button
                    onClick={handleUploadCheck}
                    type="submit"
                    size="sm"
                    bgColor="#52616B"
                    color="white"
                    borderRadius="20px"
                    ml="2"
                    _hover={{ bg: 'blue.500' }}
                    w={'50%'}
                  >
                    Post
                  </Button>
                </Box>
              </Box>
            </Box>
          </form>
          {ThreadRedux?.map((item, index) => {
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
      <Box display={{ base: 'block', md: 'none', lg: 'block' }}>
        <SideRight />
      </Box>
    </SimpleGrid>
  );
}
export default Home;
