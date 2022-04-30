import axios from 'axios';
import getToken from './storages'



{/*send cookies when cross-domain requests */}

const getBaseUrl = () => {
        if(process.env.NODE_ENV === 'development'){
                return process.env.NEXT_PUBLIC_API || 'http://ec2-13-239-60-161.ap-southeast-2.compute.amazonaws.com:3001/api'
        }
}

const baseURL = getBaseUrl();


const axiosInstanceConfig = axios.create({
    baseURL,
    headers:{ Authorization: "Bearer " + getToken(),},
    withCredentials: true,
});

// axiosInstanceConfig.interceptors.request.use(
//         config => {
//           const user = getToken('token');
//                 if(user){
//                 config.headers = {
//                         Authentication: user
//                 }
//                 }
//         return config
//         },
//         error => {
//                 return Promise.reject(error)
//         }
// )

// axiosInstance.interceptors.response.use(
//         res =>{
//                 if(res.data.code === 200){
//                     console.log('success')
//                     {/* window.location.href = '' */}
//                 }
//         },
//         error => {
//                 return Promise.reject(error)
//         }
// )

export default axiosInstanceConfig;