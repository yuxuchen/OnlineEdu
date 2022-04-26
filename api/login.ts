import axiosInstance from '../services/apiServices'
import { AES } from 'crypto-js'

export const login = (email: string, password: string, role: string) => {
    return axiosInstance({
        url: '/login',
        method: 'post',
        data: {email: email,
               password: AES.encrypt(password,"cms").toString(),
               role: role,
        }
    })
}