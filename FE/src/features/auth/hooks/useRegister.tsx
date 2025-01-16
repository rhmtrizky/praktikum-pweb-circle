import { useNavigate } from "react-router-dom"
import { API } from "../../../lib/api"
import { ChangeEvent, useState} from 'react'
import { IUserRegister } from "../../../interfaces/User"


export function useRegister() {

    const navigate = useNavigate()

    const [formData, setFormData] = useState<IUserRegister>({
        full_name: '',
        username: '',
        email: '',
        password: '',
    })

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
    }

    function handleRegister() {
        try {
            const response = API.post('/register', formData)
            console.log("register berhasil nih", response)
            navigate('/login')
        } catch (error) {
            console.log("data register ga dapet", error)
        }
        
    }
    
    return {handleChange, handleRegister, formData}
}