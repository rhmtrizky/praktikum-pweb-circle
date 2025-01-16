import { useState, useEffect } from 'react';
import { API, setAuthToken } from '../lib/api';
import { IThreadCard } from '../interfaces/ThreadCard';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { GET_THREADS } from '../stores/RootReducer';

export function useHooks() {
  const [threads, setThreads] = useState<IThreadCard[]>([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchData = async () => {
    try {
      const response = await API.get('/threads');
      setThreads(response.data);
      dispatch(
        GET_THREADS({
          threads: response.data,
        })
      );
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [formData, setFormData] = useState({
    content: '',
    image: '',
  });

  const [contentData, setContentData] = useState('');

  const handleContentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setContentData(value);
  };

  const [imageData, setImageData] = useState<File | null | Blob | string>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];

    if (file) {
      setImageData(file);
      handlePreviewImage(event);
    }
  };

  const [previewImage, setPreviewImage] = useState<string | undefined>();

  function handlePreviewImage(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
      // console.log("preview", previewImage)
    }
  }

  const createThread = async (event: React.FormEvent) => {
    event.preventDefault();

    setAuthToken(localStorage.token);

    const formData = new FormData();
    formData.append('content', contentData);

    if (imageData !== null) {
      formData.append('image', imageData);
    } else {
      formData.append('image', '');
    }

    try {
      const response = await API.post('/threads', formData);
      console.log('Response from createThread:', response.data);
      if (response.data) {
        navigate('/loading');
        setTimeout(() => {
          navigate('/');
        }, 9000);
        await fetchData();
      }
    } catch (error) {
      console.error('Error creating data:', error);
    } finally {
      setContentData('');
      setImageData(null);
      setPreviewImage(undefined);
    }
  };

  const [isLoading, setIsLoading] = useState(false);
  const handleUploadCheck = async () => {
    setIsLoading(true);
    try {
      createThread;
    } catch (error) {
      console.error('set loading is error', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return {
    threads,
    handleChange,
    createThread,
    formData,
    setFormData,
    handleContentChange,
    handleImageChange,
    previewImage,
    handleUploadCheck,
    isLoading,
    setIsLoading,
    fetchData,
    handlePreviewImage,
  };
}

// export function useContentStatus() {

//     const [contentStatus, setContentStatus] = useState('')

//     const handleContentStatus = (event: React.ChangeEvent<HTMLInputElement>) => {
//         const { value } = event.target
//         setContentStatus(value)
//     }

//     const createContentStatus = async (event: React.FormEvent) => {
//         event.preventDefault()

//         setAuthToken(localStorage.token);

//         const formData = new FormData();
//         formData.append('content', contentStatus)
//         console.log("anjay",formData.append)

//         try {
//             const response = await API.post('/threads', formData)
//             console.log('Response from createContentStatus:', response.data)
//         } catch (error) {
//             console.error('Error creating status:', error)
//         }

//     }
//     return {
//         handleContentStatus,
//         createContentStatus,
//         contentStatus,
//         setContentStatus
//     }
//  }
