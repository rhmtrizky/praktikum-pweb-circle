import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../stores/types/rootState';
import { GET_FOLLOWS, SET_FOLLOW_STATE } from '../stores/RootReducer';
import { API } from '../lib/api';
import { FollowCard } from '../features/follow/component/FollowCard';

export default function Follows() {
  const dispatch = useDispatch();
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
    <>
      <Box
        bg={'white'}
        display={'flex'}
        justifyContent={'center'}
      >
        <Tabs
          isFitted
          variant="enclosed"
          width="600px"
          marginTop={'20px'}
        >
          <TabList mb="1em">
            <Tab onClick={() => dispatch(SET_FOLLOW_STATE('followers'))}>Followers {followingsCount}</Tab>
            <Tab onClick={() => dispatch(SET_FOLLOW_STATE('followings'))}>Followings {followingsCount}</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              {follows.map((follow, index) => (
                <FollowCard
                  key={index}
                  id={follow.id}
                  user_id={follow.user_id}
                  full_name={follow.full_name}
                  username={follow.username}
                  email={follow.email}
                  picture={follow.picture ? follow.picture : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'}
                  description={follow.description}
                  is_followed={follow.is_followed}
                />
              ))}
            </TabPanel>
            <TabPanel>
              {follows.map((follow, index) => (
                <FollowCard
                  key={index}
                  id={follow.id}
                  user_id={follow.user_id}
                  full_name={follow.full_name}
                  username={follow.username}
                  email={follow.email}
                  picture={follow.picture ? follow.picture : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'}
                  description={follow.description}
                  is_followed={follow.is_followed}
                />
              ))}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </>
  );
}
