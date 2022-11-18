import { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "wouter";
import ReactPlayer from "react-player/vimeo";

import getCourseById from "services/getCourseById";
import getModuleById from "services/getModuleById";
import getMaterialById from "services/getMaterialById";
import getCommentsByMaterialId from "services/getCommentsByMaterialId";
import postComment from "services/postComment";

import CourseNav from "components/CourseNav";
import CourseIcons from "components/CourseIcons";

import "./styles.css";
import setMaterialComplete from "services/setMaterialComplete";
import { SizeContext } from "context/SizeContext";
import StudentsPage from "pages/MyTopic";
import BubbleChat from "../../assets/burbuja-chat.svg";
import { updateCourse } from "services/updateCourse";
import { MeetingModal } from "components/MeetingModal";
import { postMaterialCompleteAsync } from "services/postMaterialCompleteAsync";
import { collection, doc, getDoc, getDocs, query } from "firebase/firestore";
import { firestore } from "../../firebase/credentials";
import { USER_ID } from "services/settings";

function MaterialContentSection({ courseId, course, isActive = false }) {
     return isActive ? (
          <section className="flex w-full items-center justify-center lg:hidden">
               <CourseNav courseId={courseId} units={course.modulos} />
          </section>
     ) : (
          <></>
     );
}

function MaterialAboutSection({ isActive = true, moduleId }) {
     const [about, setAbout] = useState();
     useEffect(() => {
          getModuleById(moduleId).then((response) => setAbout(response));
     }, [moduleId]);

     return isActive && about ? (
          <div className="w-full px-10 py-5">
               <h4 className="font text-primary text-lg font-semibold">Content</h4>
               <p dangerouslySetInnerHTML={{__html: about.contenido}}></p>
               <h4 className="font text-primary mt-5 text-lg font-semibold">Goals</h4>
               <p>{about.objetivos}</p>
          </div>
     ) : (
          <></>
     );
}

function Replys({ reply }) {
     return (
          <div className="ml-5 mt-5 rounded-xl border border-gray-300 p-5 shadow-lg">
               <header className="border-accent flex justify-between border-b-2">
                    <div>
                         <img url={reply.imagen} alt="" />
                         <span className="text-primary font-semibold">{reply.alumno}</span>
                    </div>
                    <span>{reply.fecha}</span>
               </header>
               <p className="p-2">{reply.comentario}</p>
          </div>
     );
}

function Comment({ comment, userId, materialId, courseId }) {
     const [isActive, setIsActive] = useState(false);
     const [replyIsActive, setReplyActive] = useState(false);
     const [replys, setReplys] = useState(comment.respuestas);
     const [reply, setReply] = useState("");
     const user = JSON.parse(window.localStorage.getItem("loggedAppUser"));

     const handleChange = (event) => {
          setReply(event.target.value);
     };

     const handleSubmit = (event) => {
          event.preventDefault();
          if (comment) {
               const data = {
                    UsuarioId: userId,
                    MaterialId: materialId,
                    CursoId: courseId,
                    Comentario: reply,
                    ComentarioId: comment.id,
               };
               const update = [...replys];
               update.push({
                    id: 999999,
                    alumno: user.nombre,
                    fecha: "",
                    respuestas: [],
                    comentario: reply,
               });
               setReplys(update);
               setIsActive(true);
               postComment({ comment: data });
          }
     };

     return (
          <div
               key={comment.id}
               className="w-full max-w-3xl rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
          >
               <header className="border-accent flex justify-between border-b-4 p-2">
                    <div>
                         <img url={comment.imagen} alt="" />
                         <span className="text-primary font-semibold">{comment.alumno}</span>
                    </div>
                    <span>{comment.fecha}</span>
               </header>
               <p className="p-2">{comment.comentario}</p>
               <button
                    onClick={() => setReplyActive(!replyIsActive)}
                    className="text-primary pl-5 font-semibold"
               >
                    reply
               </button>
               <button
                    className="text-primary pl-5 font-semibold"
                    onClick={() => setIsActive(!isActive)}
               >
                    comments ({replys.length})
               </button>
               {isActive ? replys.map((reply) => <Replys key={reply.id} reply={reply} />) : <></>}
               {replyIsActive ? (
                    <form
                         onSubmit={handleSubmit}
                         className="mt-2 w-full max-w-3xl rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
                    >
                         <textarea
                              onChange={handleChange}
                              type="textarea"
                              value={reply}
                              className="h-20 w-full rounded-xl border border-gray-400 p-1"
                         />
                         <button className="bg-accent text-primary m-1 rounded-lg p-2">
                              Reply
                         </button>
                    </form>
               ) : (
                    <></>
               )}
          </div>
     );
}

function CommentsList({ comments = [], userId, materialId, courseId }) {
     return comments.map((comment) => {
          return (
               <Comment
                    key={comment.id}
                    comment={comment}
                    userId={userId}
                    materialId={materialId}
                    courseId={courseId}
               />
          );
     });
}

function MaterialCommentsSection({ courseId, materialId, isActive = false }) {
     const [comments, setComments] = useState([]);
     const [comment, setComment] = useState("");
     const user = JSON.parse(window.localStorage.getItem("loggedAppUser"));

     const handleChange = (event) => {
          setComment(event.target.value);
     };

     const handleSubmit = (event) => {
          event.preventDefault();
          if (comment) {
               const data = {
                    UsuarioId: user.id,
                    MaterialId: materialId,
                    CursoId: courseId,
                    Comentario: comment,
                    ComentarioId: 0,
               };
               const update = [...comments];
               update.push({
                    id: 999999,
                    alumno: user.nombre,
                    fecha: "",
                    respuestas: [],
                    comentario: comment,
               });
               setComments(update);
               postComment({ comment: data });
          }
     };

     useEffect(() => {
          if (isActive)
               getCommentsByMaterialId({ id: materialId }).then((comments) =>
                    setComments(comments)
               );
     }, [isActive, materialId]);

     return isActive ? (
          <div className="flex w-full flex-col items-center gap-5 bg-gray-100 p-5 md:p-10">
               <CommentsList
                    comments={comments}
                    courseId={courseId}
                    materialId={materialId}
                    userId={user.id}
               />
               <form
                    onSubmit={handleSubmit}
                    className="w-full max-w-3xl rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
               >
                    <label>Leave a comment</label>
                    <textarea
                         onChange={handleChange}
                         type="textarea"
                         value={comment}
                         className="h-20 w-full rounded-xl border border-gray-400 p-1"
                    />
                    <button className="bg-accent text-primary m-1 rounded-lg p-2">Comment</button>
               </form>
          </div>
     ) : (
          <></>
     );
}

export default function MaterialPage({ params, community = true, url }) {
     const user = JSON.parse(window.localStorage.getItem("loggedAppUser"));
     const { secondBar, showBar, setShowBar, setSecondBar, handleSecondBar } =
          useContext(SizeContext);
     const { size } = useContext(SizeContext);
     const { courseId, moduleId, materialId, bubbleId } = params;
     const [course, setCourse] = useState({});
     const [isModalOpen, setIsModalOpen] = useState(false);
     const [professorsModal, setProfessorsModal] = useState({})
     const [completedPercentage, setCompletedPercentage] = useState("");
     const [material, setMaterial] = useState({});
     const [isActive, setIsActive] = useState({
          about: true,
          comments: false,
          content: false,
     });
     const [location, setLocation] = useLocation();

     const openModal = () => {
          setIsModalOpen(true);
     };
     const closeModal = () => {
          setIsModalOpen(false);
     };

     const checkPercentage = async () => {
          const docRef = query(collection(firestore, 'professors'))
          const docs = await getDocs(docRef)
          const professorsData = []
          docs.forEach(doc => {
               professorsData.push(doc.data())
          });
          const professorsByCourse = professorsData.filter((prof)=> prof.courseIds?.includes(parseInt(courseId)))
          const professorsList = professorsByCourse.sort((a,b)=> a.percentage < b.percentage? 1: -1).find(e => e.percentage <= completedPercentage)
          const checkRef = doc(firestore, 'meetings', `${USER_ID}`)
          const check = await getDoc(checkRef)
          const meetingsDone = check.data()
          if(meetingsDone?.meetingsToDo[professorsList.meetingId].isBooked) {
               return
          }
          if(professorsList.professors.length <= 0) return
          setProfessorsModal({meetingId: professorsList.meetingId, professors: professorsList.professors})
          openModal()
     };

     useEffect(() => {
          if (completedPercentage === "") return;
          checkPercentage();
     }, [completedPercentage]);

     const updateCompleteVideo = async () => {
          const newData = {
               ...course,
               modulos: course.modulos.map((modules) => {
                    modules.clases.map((videoClass) => {
                         if (videoClass.id === parseInt(materialId)) {
                              videoClass.completada = true;
                         }
                         return videoClass;
                    });
                    return modules;
               }),
          };
          setCourse(newData);
          const { ok } = await postMaterialCompleteAsync({
               materialId,
               classNum: material.claseNumero,
          });
          if (!ok) return;
          getCourseById({ id: courseId }).then((course) => {
               setCompletedPercentage(course.porcentajeCompletado);
          });
     };

     useEffect(() => {
          getCourseById({ id: courseId }).then((course) => {
               setCompletedPercentage(course.porcentajeCompletado);
               if (!community) {
                    setCourse(course);
                    return;
               }
               setCourse({
                    ...course,
                    modulos: course.modulos.filter((modu) => modu.id.toString() === moduleId),
               });
          });
          getMaterialById({ id: materialId }).then((material) => setMaterial(material));
          setIsActive({ about: true, comments: false });
     }, [materialId, courseId]);

     const handleBubble = () => {
          setShowBar(false);
          setSecondBar(false);
     };

     const coursesPacedURL = `/${url}/${courseId}/`
     const normalURL = `/${url}/bubble/${courseId}/${bubbleId}`

     async function handleNextMaterial() {
          const moduleI = parseInt(moduleId);
          const materialI = parseInt(materialId);
          const currentModule = course.modulos.find(({ id }) => id === moduleI);
          const currentMaterial = currentModule.clases.find(({ id }) => id === materialI);
          const lastModule = course.modulos[course.modulos.length - 1];
          const lastClass = lastModule.clases[lastModule.clases.length - 1];
          if (materialI === lastClass.id) {
               const { ok } = await postMaterialCompleteAsync({
                    materialId,
                    classNum: material.claseNumero,
               });
               const bubbleURL = `/${url}/bubble/${courseId}/${bubbleId}`
               const normalURL = `/${url}/${courseId}`
               setLocation(url === 'courses'? bubbleURL: normalURL);
               return;
          }
          const currentModuleIndex = course.modulos.findIndex((module) => module.id === moduleI);
          const currentMaterialIndex = currentModule.clases.findIndex(
               (material) => material.id === materialI
          );

          if (currentMaterial.completada) {
               if (currentMaterialIndex === currentModule.clases.length - 1) {
                    const nextModule = course.modulos[currentModuleIndex + 1];
                    setLocation(
                         `/${url}/${courseId}/module/${nextModule.id}/material/${nextModule.clases[0].id}/${community ? bubbleId: ''}`
                    );
               } else {
                    const nextMaterial = currentModule.clases[currentMaterialIndex + 1];
                    setLocation(
                         `/${url}/${courseId}/module/${moduleId}/material/${nextMaterial.id}/${community ? bubbleId: ''}`
                    );
               }
          } else {
               if (currentMaterialIndex === currentModule.clases.length - 1) {
                    const nextModule = course.modulos[currentModuleIndex + 1];
                    setMaterialComplete({
                         materialId,
                         classNum: material.claseNumero,
                    });
                    setLocation(
                         `/${url}/${courseId}/module/${nextModule.id}/material/${nextModule.clases[0].id}/${community ? bubbleId: ''}`
                    );
               } else {
                    const nextMaterial = currentModule.clases[currentMaterialIndex + 1];
                    setMaterialComplete({
                         materialId,
                         classNum: material.claseNumero,
                    });
                    setLocation(
                         `/${url}/${courseId}/module/${moduleId}/material/${nextMaterial.id}/${community ? bubbleId: ''}`
                    );
               }
          }
     }

     return (
          <>
               <MeetingModal isModalOpen={isModalOpen} closeModal={closeModal} professorsModal={professorsModal} />
               <section
                    className={`bg-material flex max-h-[70vh] justify-center overflow-hidden text-white lg:max-h-[80vh] ${
                         secondBar ? "" : "lg:pl-0"
                    } lg:p-3`}
               >
                    <div
                         className={`relative hidden max-h-[70vh] rounded-xl bg-white text-[#051738] ${
                              secondBar ? "w-1/3 pl-2" : "w-16"
                         } flex-col transition-all lg:flex`}
                    >
                         <div
                              className={`icon-box-container absolute z-50 h-10 w-10 ${
                                   secondBar ? "" : "rotate-arrow"
                              } hidden items-center justify-start lg:flex`}
                              onClick={handleSecondBar}
                         >
                              <ion-icon
                                   className={`${secondBar ? "" : "rotate-arrow"}`}
                                   name="chevron-forward-sharp"
                              ></ion-icon>
                         </div>
                         <div className="overflow-hidden">
                              <header className="flex max-h-[20vh] flex-col gap-5 pt-2 pl-5">
                                   <Link
                                        href={`${url === 'courses-paced'? coursesPacedURL: normalURL}`}
                                        className="a-icon flex items-center gap-2"
                                   >
                                        <CourseIcons name="back" /> {secondBar && "My classes"}
                                   </Link>
                                   <h2
                                        className={`text-lg font-medium ${
                                             secondBar ? "" : "hidden"
                                        }`}
                                   >
                                        {course.nombre}
                                   </h2>
                              </header>
                              <CourseNav
                                   courseId={courseId}
                                   bubbleId={bubbleId}
                                   community={community}
                                   units={course.modulos}
                                   url={url}
                              />
                         </div>
                    </div>
                    <div
                         className={` courses-container w-ful flex ${
                              secondBar || showBar
                                   ? "justify-center"
                                   : !community
                                   ? "justify-center"
                                   : "justify-between"
                         } ${secondBar ? "thicker-container" : ""}`}
                    >
                         <div className="lg:-max-h-none flex max-h-[70vh] w-full max-w-[50rem] flex-col items-center lg:w-[65%] lg:max-w-none lg:pl-5">
                              <ReactPlayer
                                   url={material.linkVideo}
                                   height="100%"
                                   width="100%"
                                   controls
                                   className="aspect-video"
                                   onEnded={updateCompleteVideo}
                              />
                              <div className="flex w-full items-center justify-between gap-2 p-5">
                                   <h1 className="font-Barlow text-2xl font-semibold text-white" dangerouslySetInnerHTML={{__html: material.nombre}} >
                                   </h1>
                                   <button
                                        className="bg-accent text-primary w-40 rounded-3xl p-2"
                                        onClick={() => handleNextMaterial()}
                                   >
                                        next class
                                   </button>
                              </div>
                         </div>
                         {community && (
                              <div
                                   className={`bubble-container ${
                                        !secondBar && !showBar ? "hide-bubble" : ""
                                   }`}
                                   onClick={handleBubble}
                              >
                                   <img src={BubbleChat} alt="chat" />
                              </div>
                         )}
                         {community
                              ? size > 1024 && <StudentsPage materialId={params.materialId} />
                              : null}
                    </div>
               </section>
               <section className=" bg-gray-100">
                    {community
                         ? size <= 1024 && <StudentsPage materialId={params.materialId} />
                         : null}
                    <header className="h-20 w-full border-b border-gray-200 bg-white px-10 shadow-sm">
                         <ul className="flex h-full items-center gap-5">
                              <li
                                   className=" border-accent font-Barlow text-primary text-lg font-semibold hover:border-b-4"
                                   onClick={() =>
                                        setIsActive({
                                             about: true,
                                             comments: false,
                                             content: false,
                                        })
                                   }
                              >
                                   About
                              </li>
                              <li
                                   className=" border-accent font-Barlow text-primary text-lg font-semibold hover:border-b-4"
                                   onClick={() =>
                                        setIsActive({
                                             about: false,
                                             comments: true,
                                             content: false,
                                        })
                                   }
                              >
                                   Comments
                              </li>
                              <li
                                   className=" border-accent font-Barlow text-primary text-lg font-semibold hover:border-b-4 lg:hidden"
                                   onClick={() =>
                                        setIsActive({
                                             about: false,
                                             comments: false,
                                             content: true,
                                        })
                                   }
                              >
                                   Content
                              </li>
                         </ul>
                    </header>
                    <MaterialAboutSection isActive={isActive.about} moduleId={moduleId} />
                    <MaterialCommentsSection
                         courseId={courseId}
                         materialId={material.id}
                         isActive={isActive.comments}
                    />
                    <MaterialContentSection
                         courseId={courseId}
                         course={course}
                         isActive={isActive.content}
                    />
               </section>
          </>
     );
}
