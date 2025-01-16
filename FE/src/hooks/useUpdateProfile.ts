import { useState } from 'react';
import { API } from '../lib/api';
import { useNavigate, useParams } from 'react-router-dom';

export function useUpdateProfile() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [dataUsername, setUsername] = useState('');
  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setUsername(value);
  };

  const [dataDescription, setDescription] = useState('');
  const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setDescription(value);
  };

  const [dataName, setName] = useState('');
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setName(value);
  };

  const [dataProfilePicture, setDataProfilePicture] = useState<File | null | Blob | string>(null);
  const handleProfilePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedProfilePicture = event.target.files && event.target.files[0];
    setDataProfilePicture(selectedProfilePicture);
    handlePreviewImage(event);
  };

  const [previewImage, setPreviewImage] = useState<string | undefined>();

  function handlePreviewImage(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
      // console.log("preview", previewImage)
    }
  }

  const UpdateUser = async (event: React.FormEvent) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('username', dataUsername);
    formData.append('full_name', dataName);
    formData.append('description', dataDescription);
    if (dataProfilePicture) {
      formData.append('picture', dataProfilePicture);
    }

    try {
      const response = await API.patch(`/editProfile/${id}`, formData);
      const updatedUserData = await API.get(`/profile/${id}`);
      navigate('/');
      console.log('ini update user bos', response.data);
      console.log('ini update user bos', updatedUserData.data);
    } catch (error) {
      console.log('error bos', error);
    }
  };
  return { UpdateUser, handleUsernameChange, handleNameChange, handleDescriptionChange, handleProfilePictureChange, handlePreviewImage, previewImage };
}
