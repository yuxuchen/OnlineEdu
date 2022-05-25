import axiosInstanceConfig from '../services/apiServicesConfig'

export const getCourseList = (page: number, limit: number) => {
    return axiosInstanceConfig({
        url: `/courses?page=${page}&limit=${limit}`,
})
}

export const deleteCourse = (id: number) => {
    return axiosInstanceConfig({
        url: `/courses/${id}`,
        params:{id: id},
        method:'delete'
    })
}

export const getDetail = (id: number) => {
    return axiosInstanceConfig({
        url: `/courses/detail?id=${id}`,
        params:{id: id},
        method:'get'
    })
}

export const addStudent =(name: string, country: string, email: string, studentType: number) => {
    return axiosInstanceConfig({
        url:'/students',
        method:'put',
        data:{
            name: name,
            country: country,
            email: email,
            type: studentType
        },
        
    })
}

export const editStudent =(
    name: string, 
    uid: string,
    detail: string,
    startTime: {},
    price: 0,
    maxStudents: 0,
    duration: 0,
    durationUnit: 1,
    cover: string,
    teacherId: 0,
    type: {}
    ) => {
    return axiosInstanceConfig({
        url:'/students',
        data: {
            name: name, 
            uid: uid,
            detail: detail,
            startTime: startTime,
            price: price,
            maxStudents: maxStudents,
            duration: duration,
            durationUnit: durationUnit,
            cover: cover,
            teacherId: teacherId,
            type: type
        },
        method:'post'
    })
}