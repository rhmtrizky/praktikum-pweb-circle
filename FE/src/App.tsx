import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import LogForm from './features/auth/LogForm';
import RegisterForm from './features/auth/RegisterForm';
import { useEffect, useState } from 'react';
import { API, setAuthToken } from './lib/api';
import Loading from './features/thread/components/Loading';
import { DetailPage } from './pages/DetailPage';
import { useDispatch } from 'react-redux';
import { AUTH_CHECK } from './stores/RootReducer';
import Posting from './pages/Posting';
import DetailProfile from './pages/DetailProfile';
import DetailProfileById from './pages/DetailProfileByThread';
import FormEditProfile from './pages/FormEditProfile';
import Follows from './pages/FollowPage';

export default function App() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function authCheck() {
    try {
      setAuthToken(localStorage.token);
      const response = await API.get('/check');
      dispatch(AUTH_CHECK(response.data.user));
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      navigate('/login');
      console.log('login gagal', error);
    }
  }

  useEffect(() => {
    if (localStorage.token) {
      authCheck();
    } else {
      setIsLoading(false);
    }
  }, []);

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <Routes>
          <Route
            path="/"
            element={localStorage.token ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/register/"
            element={<RegisterForm />}
          />
          <Route
            path="/login/"
            element={!localStorage.token ? <LogForm /> : <Navigate to="/" />}
          />
          <Route
            path="/posting/"
            element={<Posting />}
          />
          <Route
            path="/thread/:id"
            element={<DetailPage />}
          />
          <Route
            path="/thread/update/:id"
            element={<Posting />}
          />
          <Route
            path="/loading"
            element={<Loading />}
          />
          <Route
            path="/logout"
            element={<LogForm />}
          />
          <Route
            path="/DetailProfile"
            element={<DetailProfile />}
          />
          <Route
            path="/profile/:id"
            element={<DetailProfileById />}
          />
          <Route
            path="/editProfile/:id"
            element={<FormEditProfile />}
          />
          <Route
            element={
              <main>
                <Follows />
              </main>
            }
            path="/follows"
          />
        </Routes>
      )}
    </div>
  );
}
