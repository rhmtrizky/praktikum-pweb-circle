
import { Box, Text } from '@chakra-ui/react';
import ReactLoading from 'react-loading';
 

const Loading = () => (
    <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} margin={'auto'} bgColor={'white'}>
    <ReactLoading type={'bubbles'}  color={'gray.800'} height={400} width={375} />
    <Text color={'gray.500'} fontSize={'md'} fontWeight={'800'}>Please wait a second...</Text>
    </Box>
);
 
export default Loading;