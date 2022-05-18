import axiosInstanceConfig from '../services/apiServicesConfig'

export const getStudentList = (page: number) => {
    return axiosInstanceConfig({
        url: `/students?page=${page}&limit=10`,
})
}

export const deleteStudent = (id: number) => {
    return axiosInstanceConfig({
        url: `/students/${id}`,
        params:{id: id},
        method:'delete'
    })
}

export const getStudent = (id: string) => {
    return axiosInstanceConfig({
        url: `/students/${id}`,
        params:{id: id},
        method:'get'
    })
}

export const addStudent =(name: string, country: string, email: string, studentType: number) => {
    return axiosInstanceConfig({
        url:'/students',
        method:'post',
        data:{
            name: name,
            country: country,
            email: email,
            type: studentType
        },
        
    })
}

export const editStudent =(name: string, country: string, email: string, type: number) => {
    return axiosInstanceConfig({
        url:'/students',
        data: {
            name:name,
            country: country,
            email: email,
            type: type
        },
        method:'post'
    })
}