import { BubbleModules } from "components/BubbleModules";
import { CoursesContext } from "context/coursesContext";
import { firestore } from "../../firebase/credentials";
import { collection, getDocs, query } from "firebase/firestore";
import { useContext, useEffect, useMemo, useState } from "react";
import { BubbleCommunityModules } from "components/BubbleCommunityModules";

export const BubblecommunityPage = ({ params, url }) => {
     const { courses } = useContext(CoursesContext) || [];
     const [module, setModule] = useState([]);
     const course = useMemo(() => {
          return courses.find((course) => course.id === parseInt(params.courseId));
     }, [courses]);

     const modulesToUse = useMemo(() => {
          if (module.length <= 0) return [];
          if (!course?.getmodulos) return [];
          const newModules = course?.getmodulos?.filter((mod) => module.bubbleIds.includes(mod.id));
          console.log(newModules, 'holaaaa')
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
               <h1 className="font-Barlow text-primary mr-5 text-2xl font-semibold">
                    {module.moduleName}
               </h1>
               <div className="flex flex-wrap gap-10">
                    {modulesToUse.map((mod) => (
                         <BubbleCommunityModules
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
