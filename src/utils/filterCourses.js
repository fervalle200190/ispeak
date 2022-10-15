export const filterByStatus = (courses, status) => {
     return courses.filter((course) => {
          if (status === "completed") {
               return course.porcentajeCompletado >= 100;
          }
          if (status === "in progress") {
               return (
                    course.porcentajeCompletado > 0 &&
                    course.porcentajeCompletado < 100
               );
          }
          if (status === "no started") {
               return course.porcentajeCompletado === 0;
          }
     });
};

export const filterByCategory = (courses, category) => {
     return courses.filter((course) => {
          return course.nombre.includes(category);
     });
};

export const filterByBoth = (courses, category, status) => {
     return courses.filter((course) => {
          if (
               status === "completed" &&
               course.porcentajeCompletado >= 100 &&
               course.nombre.includes(category)
          ) {
               return true;
          }
          if (
               status === "in progress" &&
               course.porcentajeCompletado > 0 &&
               course.porcentajeCompletado < 100 &&
               course.nombre.includes(category)
          ) {
               return true;
          }
          if (
               status === "no started" &&
               course.porcentajeCompletado === 0 &&
               course.nombre.includes(category)
          ) {
               return true;
          }
          return false;
     });
};

export const filterBySearch = (courses, search) => {
     return courses.filter((course) => {
          if (course.nombre.toLowerCase().includes(search.toLowerCase())) {
               return true;
          }
          return false;
     });
};
