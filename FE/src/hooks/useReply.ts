import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { IThreadCard } from '../interfaces/ThreadCard';
import { IReplyPost } from '../interfaces/Reply';
import { useParams } from 'react-router-dom';
import { API } from '../lib/api';

export function useReply() {
  const [replies, setReplies] = useState<IThreadCard[]>();
  const { id } = useParams();

  const [formData, setFormData] = useState<IReplyPost>({
    content: '',
    thread_id: +(id as string),
  });
  console.log('ini isi formData:', formData);
  async function handlePostReply(event: FormEvent<HTMLFormElement>) {
    try {
      event.preventDefault();
      const response = await API.post('/reply', formData);
      console.log('succesfull add a reply', response.data);
      getReplies();
    } catch (error) {
      console.log('failed to add reply', error);
    }
  }

  async function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  async function getReplies() {
    try {
      const response = await API.get(`/replies?thread_id=${id}`);
      setReplies(response.data);
      console.log('get reply by id', response.data);
    } catch (error) {
      // console.log("failed to get reply by id", error)
    }
  }

  useEffect(() => {
    getReplies();
  }, []);

  return {
    handlePostReply,
    replies,
    handleChange,
    formData,
    getReplies,
  };
}
