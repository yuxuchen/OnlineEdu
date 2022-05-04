import { stringify } from 'querystring'
import axiosInstanceConfig from '../services/apiServicesConfig'

export const getTeacherList = (page: number) => {
    return axiosInstanceConfig({
        url: `/teachers?page=${page}&limit=10`,
})
}

export const deleteTeacher = (id: number) => {
    return axiosInstanceConfig({
        url: `/teachers/${id}`,
        params:{Id: id},
        method:'delete'
    })
}

export const getTeacher = (id: number) => {
    return axiosInstanceConfig({
        url: `/teachers/${id}`,
        params:{Id: id},
        method:'get'
    })
}

export const addTeacher =(name: string, country: string, phone: string, skills:[], email: string) => {
    return axiosInstanceConfig({
        url:'/teachers',
        method:'post',
        data:{
            name: name,
            country: country,
            phone: phone,
            skills: skills,
            email: email,
        },
        
    })
}

export const editTeacher =(name: string, country: string, phone: string, skills:[], email: string) => {
    return axiosInstanceConfig({
        url:'/teachers',
        method:'post',
        data:{
            name: name,
            country: country,
            phone: phone,
            skills: skills,
            email: email,
        },
    })
}