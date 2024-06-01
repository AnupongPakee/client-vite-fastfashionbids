import axios from "axios";

export const readComment = async (id_ex) => {
  return await axios.get(import.meta.env.VITE_API_MYSQL + "/getcomment/" + id_ex)
}

export const addComment = async (id_ex, id, data) =>
  await axios.post(
    import.meta.env.VITE_API_MYSQL + "/comment/" + id_ex + "/" + id,
    data
  );
