import { useSelector } from 'react-redux';
import { RootState } from '../stores/types/rootState';
import { API } from '../lib/api';
import { useHooks } from './useHooks';

export function useLike() {
  const { fetchData } = useHooks();
  const threads = useSelector((state: RootState) => state.thread);

  async function handleLikePost(id: number, is_liked: boolean) {
    try {
      if (!is_liked) {
        const response = await API.post('/like', { thread_id: id });
        // dispatch(SET_THREAD_LIKE({id: id, is_liked: is_liked}))
        console.log('successfull like a thread', response.data);
        if (response.data) {
          fetchData();
        }
      } else {
        const response = await API.delete(`/like/${id}`);
        // dispatch(SET_THREAD_LIKE({id: id, is_liked: is_liked}))
        console.log('successfull delete like on a thread', response.data);
        if (response.data) {
          fetchData();
        }
      }
    } catch (error) {
      console.log('failed to update like', error);
    }
  }
  return { threads, handleLikePost };
}
