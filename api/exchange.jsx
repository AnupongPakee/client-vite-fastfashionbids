import axios from "axios";

export const getExchange = async () =>
  await axios.get(import.meta.env.VITE_API_MYSQL + "/exchange");

export const readExchange = async (id) => {
  return await axios.get(
    import.meta.env.VITE_API_MYSQL + "/" + id + "/exchange"
  );
};

export const viewExchange = async (id_ex, id) => {
  return await axios.get(
    import.meta.env.VITE_API_MYSQL + "/exchange/" + id_ex + "/" + id
  );
};

export const getAddr = async (id) => {
  return await axios.get(import.meta.env.VITE_API_MYSQL + "/address/" + id);
};

export const addExchange = async (id, data) =>
  await axios.post(
    import.meta.env.VITE_API_MYSQL + "/" + id + "/addexchange",
    data
  );

export const deleteExchange = async (id, id_ex) =>
  await axios.delete(
    import.meta.env.VITE_API_MYSQL + "/" + id + "/removeexchange/" + id_ex
  );

export const deleteExchangeAll = async (id_exchange, id_store) =>
  await axios.delete(
    import.meta.env.VITE_API_MYSQL + "/delid/" + id_exchange + "/" + id_store
  );

export const readExchangeOne = async (id) => {
  return await axios.get(import.meta.env.VITE_API_MYSQL + "/detail/" + id);
};

export const sendId = async (id, data) =>
  await axios.post(import.meta.env.VITE_API_MYSQL + "/success/" + id, data);
