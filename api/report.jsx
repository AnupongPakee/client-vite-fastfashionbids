import axios from "axios";

export const readReport = async (id_me) => {
  return await axios.get(
    import.meta.env.VITE_API_MYSQL + "/getreport/" + id_me
  );
};

export const addReport = async (id_us, id_me, data) =>
  await axios.post(
    import.meta.env.VITE_API_MYSQL + "/report/" + id_us + "/" + id_me,
    data
  );
