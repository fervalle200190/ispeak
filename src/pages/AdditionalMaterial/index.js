import { useState, useEffect, useContext } from "react";

import getAdditionalMaterialByUser from "services/getAdditionalMaterialByUser";

import Accordion from "components/Accordion";
import { CoursesContext } from "context/coursesContext";
import { getAditionalMaterialByCourse } from "services/getAditionalMaterialByCourse";
import { getAllAditionalMaterial } from "services/getAllAditionalMaterial";

export default function AdditionalMaterialPage() {
     const [refuerzo, setRefuerzo] = useState([]);
     const { courses } = useContext(CoursesContext);

     const fetchAditionalMaterial = async () => {
          const ids = courses
               .filter((course) => course.PlanEstudio !== "Obligatorio")
               .map((course) => course.id);
          const res = await getAllAditionalMaterial();
          const aditionalMaterials = res.aditionalMaterial.filter((material) =>
               ids.includes(material.cursoId)
          );
          setRefuerzo(aditionalMaterials);
     };

     useEffect(() => {
          // getAdditionalMaterialByUser().then((response) => {
          //   setRefuerzo(response);
          // });
          if (courses.length <= 0) return;
          fetchAditionalMaterial();
     }, [courses]);

     return (
          <section className="flex flex-col gap-5 p-5 md:p-10">
               <h2 className="text-primary text-2xl font-semibold">Additional Material</h2>
               <Accordion items={refuerzo} />
          </section>
     );
}
