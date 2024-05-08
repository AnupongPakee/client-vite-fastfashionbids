import axios from "axios";

export const read = async (id) => {
    return await axios.get(import.meta.env.VITE_API_MYSQL + "/user/" + id);
}

export const update = async (id, data) => {
    return await axios.put(import.meta.env.VITE_API_MYSQL + "/edit/profile/" + id, data);
}