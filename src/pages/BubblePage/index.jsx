import { BubbleModules } from "components/BubbleModules";
import { CoursesContext } from "context/coursesContext";
import { firestore } from "../../firebase/credentials";
import { collection, getDocs, query } from "firebase/firestore";
import { useContext, useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import { Box, Button } from "@mui/material";

export const BubblePage = ({ params, url }) => {
     const { courses } = useContext(CoursesContext) || [];
     const [module, setModule] = useState([]);
     const course = useMemo(() => {
          const courseSelected = courses.filter(
               (course) => course.id === parseInt(params.courseId)
          )[0];
          return {
               ...courseSelected,
               modulos: courseSelected?.modulos?.filter((mod) => mod.nombre.includes(`Content`)),
          };
     }, [courses]);
     const modulesToUse = useMemo(() => {
          if (module.length <= 0) return [];
          if (!course.modulos) return [];
          const newModules = course.modulos.filter((mod) => module.bubbleIds.includes(mod.id));
          console.log(newModules)
          return newModules;
     }, [module, course]);

     const getData = async () => {
          const docRef = collection(firestore, "modulos", `${params.courseId}`, "modulos");
          const data = await getDocs(query(docRef));
          const modulos = [];
          data.forEach((item) => {
               modulos.push(item.data());
          });
          setModule(modulos.find((mod) => mod.id === parseInt(params.moduleId)));
     };

     useEffect(() => {
          getData();
     }, []);

     return (
          <section className="show-peace-page p-5 md:p-10">
               <Box display="flex" alignItems={"center"} gap={2}>
                    <Link to={`/${url}/${params.courseId}`}>
                         <ArrowBackIosNewRoundedIcon
                              fontSize="10px"
                              sx={{ cursor: "pointer", color: "#1e3a8a" }}
                         />
                    </Link>
                    <h1 className="font-Barlow text-primary mr-5 text-2xl font-semibold">
                         {module.moduleName}
                    </h1>
               </Box>
               <div className="flex flex-wrap gap-10">
                    {modulesToUse.map((mod) => (
                         <BubbleModules
                              key={mod.id}
                              {...mod}
                              url={url}
                              course={course}
                              module={module}
                         />
                    ))}
               </div>
          </section>
     );
};
