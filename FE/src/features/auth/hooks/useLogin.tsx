import { useNavigate } from "react-router-dom"
import { API, setAuthToken} from "../../../lib/api"
import { ChangeEvent, useState} from 'react'
import { IUserLogin } from "../../../interfaces/User"
import { AUTH_LOGIN, AUTH_LOGOUT } from "../../../stores/RootReducer"
import { useDispatch } from "react-redux"
import { useHooks } from "../../../hooks/useHooks"



export function useLogin() {
    const {setIsLoading} = useHooks()

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [formData, setFormData] = useState<IUserLogin>({
        email: '',
        password: '',
    })

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
    }

    async function handleLogin() {
        // event.preventDefault
        setIsLoading(true)
        try {
            const response = await API.post('/login', formData)
            dispatch(AUTH_LOGIN(response.data))
            // console.log("login berhasil nih", response)
            // localStorage.setItem("token", response.data.token)
            setAuthToken(localStorage.token)
            navigate('/')
        } catch (error) {
            console.log("data login ga dapet", error)
        } finally {
            setIsLoading(false)
        }
        
    }

    async function handleLogout() {
        setIsLoading(true);
        try {
            const response = await API.get('/logout');
            dispatch(AUTH_LOGOUT(response.data));
            // localStorage.removeItem('token');
            navigate('/login');
        } catch (error) {
            console.log("Error loading out:", error);
        } finally {
            setIsLoading(false);
        }
        
    }
    return {handleChange, handleLogin, handleLogout}
}