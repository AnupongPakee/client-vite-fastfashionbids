import axios from "axios";

export const getExchange = async () =>
  await axios.get(import.meta.env.VITE_API_MYSQL + "/exchange");

export const readExchange = async (id) => {
  return await axios.get(import.meta.env.VITE_API_MYSQL + "/" + id + "/exchange")
}

export const viewExchange = async (id_ex, id) => {
  return await axios.get(import.meta.env.VITE_API_MYSQL + "/exchange/" + id_ex + "/" + id)
}

export const addExchange = async (id, data) =>
  await axios.post(
    import.meta.env.VITE_API_MYSQL + "/" + id + "/addexchange",
    data
  );

export const deleteExchange = async (id, id_ex) =>
  await axios.delete(
    import.meta.env.VITE_API_MYSQL + "/" + id + "/removeexchange/" + id_ex
  );
