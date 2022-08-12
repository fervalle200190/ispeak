import React, { useState, useEffect, useRef, useContext } from "react";
import { Link } from "wouter";
import "./styles.css";
import VideocamIcon from "@mui/icons-material/Videocam";
import SendIcon from "@mui/icons-material/Send";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import getAllUsers from "services/getAllUsers";
import HeaderIcons from "../../components/HeaderIcons";
import getCoursesByProfessor from "services/getCoursesByProfessorId";
import SideBarTopic from "components/SideBarTopic";
import Mensaje from "../../components/TopicMessage/index";
import firebaseApp from "../../firebase/credentials";
import {
     getFirestore,
     doc,
     setDoc,
     collection,
     getDocs,
     query,
     where,
} from "firebase/firestore";
import { SizeContext } from "context/SizeContext";

const firestore = getFirestore(firebaseApp);

const StudentsPage = (params) => {
     const [listaNombres, setListaNombres] = useState([]);
     const [students, setStudents] = useState([]);
     const [teacher, setTeacher] = useState([]);
     const [course_id, setCourse_id] = useState([]);
     const [inputMensaje, setinputMensaje] = useState([]);
     const [listaMensaje, setListaMensaje] = useState([]);
     const {secondBar, showBar, size} = useContext(SizeContext)
     const chatDiv = useRef()

     const user = JSON.parse(localStorage.getItem("loggedAppUser"));

     //obtenemos el id de la url
     const id = 11;

     let newid = parseInt(id, 10);

     let nombre;

     let profesor;

     let courso_id;

     //Funcion para obtener el nombre del topic

     const getName = async () => {
          try {
               const q = query(
                    collection(firestore, "topics"),
                    where("id", "==", newid)
               );

               const querySnapshot = await getDocs(q);
               console.log(querySnapshot)
               querySnapshot.forEach((doc) => {
                    console.log(doc)
                    nombre = doc.data().nombre.trim();
                    profesor = doc.data().author.trim();
                    courso_id = doc.data().course_id;
                    console.log(courso_id);
               });
          } catch (e) {
               console.log("error ", e);
          }

          setListaNombres(nombre);
          setTeacher(profesor);
          setCourse_id(courso_id);

          getListaMensajes();
          getCantidadAlumnos(courso_id);
     };

     //Funcion para obtener la lista de mensajes

     const getListaMensajes = async () => {
          try {
               const mensajesArr = [];
               console.log(`topics/${nombre || listaNombres}/mensajes/`)
               const collecionRef = collection(
                    firestore,
                    `topics/How to change/mensajes/`
               );
               const mensajes_obtenidos = await getDocs(collecionRef);
               mensajes_obtenidos.forEach((mensaje) => {
                    mensajesArr.push(mensaje.data());
               });

               setListaMensaje([...mensajesArr]);
          } catch (e) {
               console.log("error ", e);
          }
     };

     //funcion para enviar mensaje

     const enviarMensaje = (e) => {
          //prevenimos que se envien mensajes vacios
          e.preventDefault();

          //asignamos como id la fecha
          const id_mensaje = new Date().getTime();
          console.log(
               `topics/${listaNombres}/mensajes/${new Date().getTime()}`
          );
          const docuRef = doc(
               firestore,
               `topics/How to change/mensajes/${new Date().getTime()}`
          );

          setDoc(docuRef, {
               foto: "comun",
               usuario: user.nombre,
               mensaje: inputMensaje,
               id: id_mensaje,
          });

          //seteamos el input en blanco al enviar el mensaje
          setinputMensaje("");

          //obtenemos el mensaje recien enviado
          getListaMensajes();
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
          getName();
          getListaMensajes();
          //  getStudents();
     }, []);

     useEffect(() => {
          chatDiv.current.scrollTop = chatDiv.current.scrollHeight - chatDiv.current.clientHeight
     }, [listaMensaje])
     

     return (
          <>
               <div className={`app bg-white relative w-full lg:w-[30%] max-h-[600px] overflow-hidden ${secondBar || showBar && size < 1550? "lg:w-[30px]": ""}`}>
                    <div className="min-h-full w-full overflow-y-scroll pb-[87px]" ref={chatDiv}>
                         <div className={`chatHeader absolute top-0 bg-white w-full h-[80px] ${secondBar || showBar && size < 1550? "hidden": ""}`}>
                              <div className="chatHeader__left">
                                   <h3>
                                        <span className="chatHeader__hash font-semibold">
                                             {listaNombres}
                                        </span>
                                   </h3>
                              </div>

                              <div className="chatHeader__right">
                                   <Link href={`/JitsiMeet/${newid}`}>
                                        {" "}
                                        <span className="chatHeader__video">
                                             Join a room.
                                             <VideocamIcon fontSize="large" />
                                        </span>{" "}
                                   </Link>
                              </div>
                         </div>

                         <div className={`chat__messages ${secondBar || showBar && size < 1550? "hidden": ""}`}>
                              {listaMensaje
                                   ? listaMensaje.map((mensaje) => {
                                          return (
                                               <Mensaje
                                                    key={mensaje.id}
                                                    mensajeFirebase={mensaje}
                                                    user_name={user.nombre}
                                               />
                                          );
                                     })
                                   : null}

                              {/* <div style={{ marginBottom: "75px" }}></div> */}
                         </div>
                    </div>
                    <div className="chat__input absolute bottom-0 w-full !m-0">
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
                              <AttachFileIcon fontSize="large" />
                              <SendIcon
                                   onClick={enviarMensaje}
                                   className="sideicon__top"
                                   fontSize="large"
                              />
                         </div>
                    </div>
                    <SideBarTopic students={students} profesor={teacher} />
               </div>
          </>
     );
};

export default StudentsPage;
