import axiosInstance from '../services/apiServices'

export const getStudentList = (page: number) => {
    return axiosInstance({
        url: `/student?page=${page}&limit=10`,
        params: {
            page: page
        }
})
}

export const deleteStudent = (id: number) => {
    return axiosInstance({
        url: `/students/${id}`,
        params:{Id: id}
    })
}

export const addStudent =(name: string, country: string, email: string, type: number) => {
    return axiosInstance({
        url:'/students',
        params: {
            name:name,
            country: country,
            email: email,
            type: type
        }
    })
}