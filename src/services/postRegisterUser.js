import getAllUsers from "./getAllUsers";
import { API_KEY, API_URL, USER_ID } from "./settings";

export default async function postRegisterUser({
     name,
     birthday,
     phone,
     country,
     city,
     occupation,
     email,
     password,
     plan,
     code
}) {
     const URL = `${API_URL}/Usuario/RegistrarAlumno/${API_KEY}`;

     const userInfo = {
          nombre: name,
          fechaNacimiento: birthday,
          telefono: phone,
          paisId: country,
          ciudad: city,
          ocupacion: occupation,
          email: email,
          password: password,
          plan,
          code
     };

     const res = await fetch(URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userInfo),
     });
     const data = await res.json();
     return data;
}
