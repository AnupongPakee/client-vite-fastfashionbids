import axios from "axios";

export const viewProfile = async (id) => {
    return await axios.get(import.meta.env.VITE_API_MYSQL + "/user/" + id);
}

export const editProfile = async (id, data) => {
    return await axios.put(import.meta.env.VITE_API_MYSQL + "/edit/profile/" + id, data);
}