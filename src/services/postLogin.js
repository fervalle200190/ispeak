import { API_KEY, API_URL, USER_ID } from "./settings";

const saveData = (res) => {
     const { id, email, nombre, rol } = res;
     const data = { id, email, nombre, rol };
     window.localStorage.setItem("loggedAppUser", JSON.stringify(data));
     return data;
};

const postLogin = async ({ email, password }) => {
     const URL = `${API_URL}/User/Login/${API_KEY}`;

     const credentials = {
          email: email,
          password: password,
     };

     try {
          const loginRes = await fetch(URL, {
               method: "POST",
               headers: { "Content-Type": "application/json" },
               body: JSON.stringify(credentials),
          });
          if (loginRes.status === 400) {
               throw loginRes;
          }
          const res = await loginRes.json();
          saveData(res);
          return true
     } catch (error) {
          const errorRes = await error.json();
          if (errorRes.statusDetail) {
               return errorRes;
          }
          return false;
     }
};

export default postLogin;
