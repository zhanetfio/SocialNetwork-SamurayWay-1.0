import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        'API-KEY': 'e752a7cb-47a3-4c25-9f40-74c312d56809'
    }
})

export const usersAPI = {
    getUsers(currentPage: number, pageSize: number) {
        return (
            instance.get(`users?page=${currentPage}&count=${pageSize}`)
                .then((res) => {
                    return res.data;
                })
        )
    },
    addUser(userId: number) {
        return (
            instance.post(`follow/${userId}`, {})
                .then((res) => {
                    return res.data;
                })
        )
    },

}