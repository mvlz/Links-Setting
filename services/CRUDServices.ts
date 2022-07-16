import http from "./HttpService";

export function getAllData() {
    return http.get('/socials')
}

export function addNewData(data: {}) {
    const token = 'Secure Token'
    const header = {
        headers: {
            Authorization: `Bearer ${token}`
        },
    }
    return http.post('/socials', data, header)
}

export function deleteData(id: number) {
    return http.delete(`/socials/${id}`)
}

export function getOneData(id: number) {
    return http.get(`/socials/${id}`)
}