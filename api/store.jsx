import axios from "axios";

export const readStore = async (id) => {
  return await axios.get(import.meta.env.VITE_API_MYSQL + "/" + id + "/store")
}

export const addStore = async (id, data) =>
  await axios.post(
    import.meta.env.VITE_API_MYSQL + "/" + id + "/addstore",
    data
  );

export const deleteStore = async (id, id_st) =>
  await axios.delete(
    import.meta.env.VITE_API_MYSQL + "/" + id + "/removestore/" + id_st
  );
