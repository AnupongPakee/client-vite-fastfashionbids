import axios from "axios";

export const viewUser = async (id) =>
  await axios.get(
    import.meta.env.VITE_API_MYSQL + "/" + id + "/admin/viewuser"
  );

export const deleteUser = async (id) =>
  await axios.delete(
    import.meta.env.VITE_API_MYSQL + "/removeuser/" + id
  );
