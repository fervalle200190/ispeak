import getAllUsers from "./getAllUsers";
import { API_URL } from "./settings";

export default function postRegisterUser({
  name,
  birthday,
  phone,
  country,
  city,
  occupation,
  email,
  password,
  programID,
}) {
  const URL = `${API_URL}/Usuario/RegistrarAlumno`;

  const userInfo = {
    nombre: name,
    fechaNacimiento: birthday,
    telefono: phone,
    paisId: country,
    ciudad: city,
    ocupacion: occupation,
    email: email,
    password: password,
    programaId: programID,
  };

  //   return fetch(URL, {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(userInfo),
  //   });
}
