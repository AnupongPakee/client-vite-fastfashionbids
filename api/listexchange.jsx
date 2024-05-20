import axios from "axios";

export const addList = async (id, id_ex, data) =>
  await axios.post(
    import.meta.env.VITE_API_MYSQL + "/" + id + "/poststore/" + id_ex,
    data
  );

export const readList = async (id) => {
  return await axios.get(
    import.meta.env.VITE_API_MYSQL + "/getstore/" + id
  );
};
