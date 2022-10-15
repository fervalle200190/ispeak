import React, { useState, useEffect, useRef, useContext } from "react";
import { Link } from "wouter";
import "./styles.css";
import VideocamIcon from "@mui/icons-material/Videocam";
import SendIcon from "@mui/icons-material/Send";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import getAllUsers from "services/getAllUsers";
import CallLogo from "../../assets/boton-llamada.png";
import HeaderIcons from "../../components/HeaderIcons";
import getCoursesByProfessor from "services/getCoursesByProfessorId";
import SideBarTopic from "components/SideBarTopic";
import Mensaje from "../../components/TopicMessage/index";
import firebaseApp, { uploadFile } from "../../firebase/credentials";
import {
     getFirestore,
     doc,
     setDoc,
     collection,
     getDocs,
     query,
     where,
     addDoc,
     onSnapshot,
} from "firebase/firestore";
import { SizeContext } from "context/SizeContext";
import { Grid, Typography } from "@mui/material";

const firestore = getFirestore(firebaseApp);

const StudentsPage = ({ materialId }) => {
     const [listaNombres, setListaNombres] = useState([]);
     const [file, setFile] = useState("");
     const [students, setStudents] = useState([]);
     const [teacher, setTeacher] = useState([]);
     const [course_id, setCourse_id] = useState([]);
     const [inputMensaje, setinputMensaje] = useState([]);
     const [listaMensaje, setListaMensaje] = useState([]);
     const { secondBar, showBar, size } = useContext(SizeContext);
     const chatDiv = useRef();

     const user = JSON.parse(localStorage.getItem("loggedAppUser"));

     //obtenemos el id de la url
     const id = materialId;

     let newid = parseInt(id, 10);

     let nombre;

     let profesor;

     let courso_id;

     //Funcion para obtener el nombre del topic

     // const getName = async () => {
     //      try {
     //           const q = query(
     //                collection(firestore, "topics"),
     //                where("id", "==", newid)
     //           );

     //           const querySnapshot = await getDocs(q);
     //           console.log(querySnapshot);
     //           querySnapshot.forEach((doc) => {
     //                console.log(doc.data(), "holaaa");
     //                nombre = doc.data().nombre.trim();
     //                profesor = doc.data().author.trim();
     //                courso_id = doc.data().course_id;
     //                console.log(courso_id);
     //           });
     //      } catch (e) {
     //           console.log("error ", e);
     //      }

     //      setListaNombres(nombre);
     //      setTeacher(profesor);
     //      setCourse_id(courso_id);

     //      getListaMensajes();
     //      getCantidadAlumnos(courso_id);
     // };

     //Funcion para obtener la lista de mensajes

     const getListaMensajes = async () => {
          onSnapshot(
               collection(firestore, "topics", `${materialId}`, "messages"),
               (querySnapshot) => {
                    if (querySnapshot.empty) {
                         setListaMensaje([]);
                         return;
                    }
                    const mensajesArr = [];
                    querySnapshot.forEach((doc) => {
                         mensajesArr.push(doc.data());
                    });
                    setListaMensaje([...mensajesArr]);
               }
          );
     };

     const enviarMensaje = async (e) => {
          e.preventDefault();
          let image;
          if (inputMensaje === "" && file === "") {
               return;
          }
          if (file !== "") {
               const res = await uploadFile(file);
               image = res;
          }
          setDoc(
               doc(
                    firestore,
                    "topics",
                    `${materialId}`,
                    `messages`,
                    `${new Date().getTime()}`
               ),
               {
                    foto: "comun",
                    usuario: user.nombre,
                    mensaje: inputMensaje,
                    image: image? image: "",
                    id: new Date().getTime(),
               }
          );
          setinputMensaje("");
     };

     const getStudents = async () => {
          await getAllUsers().then((data) => {
               // setStudents(data);
               // console.log(students);
          });
     };

     let filtro;

     const getCantidadAlumnos = async (course_id) => {
          await getCoursesByProfessor().then((data) => {
               filtro = data.filter((alumno) => alumno.id === course_id);
          });

          setStudents(filtro);

          /* filtro.map((canal) => {
          console.log(canal.alumnos.nombre);
        });*/
     };

     useEffect(() => {
          // getName();
          getListaMensajes();
          //  getStudents();
     }, []);

     useEffect(() => {
          getListaMensajes();
     }, [materialId]);

     useEffect(() => {
          chatDiv.current.scrollTop =
               chatDiv.current.scrollHeight - chatDiv.current.clientHeight;
     }, [listaMensaje]);
     return (
          <>
               <div
                    className={`chat-box relative max-h-[600px] w-full overflow-hidden rounded-[12px] bg-[#F3F3F3] lg:w-[30%] ${
                         secondBar || (showBar && size < 1550)
                              ? "hidden"
                              : "app"
                    }`}
               >
                    <div
                         className="min-h-full w-full overflow-y-scroll pb-[87px]"
                         ref={chatDiv}
                    >
                         <div
                              className={`chatHeader absolute top-0 h-[80px] w-full border-b border-b-zinc-400 bg-[#F3F3F3] ${
                                   (secondBar || showBar) &&
                                   size < 1550 &&
                                   size > 1024
                                        ? "hidden"
                                        : ""
                              }`}
                         >
                              <div className="chatHeader__left">
                                   <h3 className="text-[#0d2e68]">
                                        Comunidad
                                        {/* <span className="chatHeader__hash font-semibold">
                                             {listaNombres}
                                        </span> */}
                                   </h3>
                              </div>

                              <div className="chatHeader__right">
                                   <Link
                                        href={`/JitsiMeet/${id}`}
                                        className="a-right"
                                   >
                                        {" "}
                                        <span className="chatHeader__video">
                                             Join a room.
                                             <img
                                                  src={CallLogo}
                                                  alt="call logo"
                                             />
                                        </span>{" "}
                                   </Link>
                              </div>
                         </div>

                         <div
                              className={`chat__messages pt-[80px] ${
                                   (secondBar || showBar) &&
                                   size < 1550 &&
                                   size > 1024
                                        ? "hidden"
                                        : ""
                              }`}
                         >
                              {listaMensaje &&
                                   listaMensaje.map((mensaje) => {
                                        return (
                                             <Mensaje
                                                  key={mensaje.id}
                                                  mensajeFirebase={mensaje}
                                                  user_name={user.nombre}
                                             />
                                        );
                                   })}

                              {/* <div style={{ marginBottom: "75px" }}></div> */}
                         </div>
                         {listaMensaje.length <= 0 && (
                              <Grid
                                   container
                                   justifyContent={"center"}
                                   sx={{
                                        position: "absolute",
                                        bottom: "100px",
                                   }}
                              >
                                   <Typography
                                        variant="h6"
                                        fontSize={14}
                                        color={"#0d2e68"}
                                   >
                                        be the first to share your insights
                                   </Typography>
                              </Grid>
                         )}
                    </div>
                    <div className="chat-input-container absolute bottom-0">
                         <div className="chat__input !m-0 w-[80%]">
                              <form onSubmit={enviarMensaje}>
                                   <input
                                        type="text"
                                        value={inputMensaje}
                                        onChange={(e) =>
                                             setinputMensaje(e.target.value)
                                        }
                                        placeholder="Type to reply..."
                                   />
                                   <button
                                        className="chat__inputButton"
                                        type="submit"
                                   >
                                        Enviar mensaje
                                   </button>
                              </form>

                              <div className="chat__inputIcons">
                                   <label>
                                        <input
                                             type="file"
                                             name="file"
                                             id="input-file"
                                             onChange={(e) =>
                                                  setFile(e.target.files[0])
                                             }
                                        />
                                        <AttachFileIcon
                                             fontSize="large"
                                             sx={{ cursor: "pointer" }}
                                        />
                                   </label>
                                   <SendIcon
                                        onClick={enviarMensaje}
                                        className="sideicon__top"
                                        fontSize="large"
                                   />
                              </div>
                         </div>
                    </div>
                    <SideBarTopic students={students} profesor={teacher} />
               </div>
          </>
     );
};

export default StudentsPage;
