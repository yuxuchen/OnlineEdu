import axiosInstanceConfig from '../services/apiServicesConfig'

export const getStudentList = (page: number) => {
    return axiosInstanceConfig({
        url: `/students?page=${page}&limit=150`,
})
}

export const deleteStudent = (id: number) => {
    return axiosInstanceConfig({
        url: `/students/${id}`,
        params:{Id: id}
    })
}

export const addStudent =(name: string, country: string, email: string, type: number) => {
    return axiosInstanceConfig({
        url:'/students',
        params: {
            name:name,
            country: country,
            email: email,
            type: type
        }
    })
}