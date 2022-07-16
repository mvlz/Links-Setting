import { Social } from "../ts/interfaces";
import http from "./HttpService";

export function getAllData() {
    return http.get('/socials')
}

export function addNewData(data: Social) {
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

export function updateData(id: number, updatedItem: {}) {
    return http.put(`/socials/${id}/`, updatedItem)
}