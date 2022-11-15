import { Link } from "wouter";

export default function CourseCard({
     id,
     nombre,
     cantidadAlumnos,
     duracion,
     profesores,
     porcentajeCompletado,
     url,
     planEstudio,
}) {
     if (porcentajeCompletado > 100) {
          porcentajeCompletado = 100;
     }

     return (
          <Link
               href={`/${url}/${id}`}
               className={`flex w-full flex-col rounded-xl border border-gray-200 bg-white shadow-sm transition delay-[50ms] ease-in-out hover:scale-[1.01] hover:shadow-md md:w-64`}
          >
               <div className="show-card-fadeIn py-5 px-2">
                    <div className="bg-primary/30 h-5 w-full rounded-xl">
                         <div
                              className="bg-primary flex h-full min-w-fit items-center rounded-xl px-2 text-right text-gray-50"
                              style={{ width: porcentajeCompletado + "%" }}
                         >
                              <span className="w-full">{porcentajeCompletado}%</span>
                         </div>
                    </div>
               </div>
               <div className="px-3 pb-2">
                    <small className="text-xs text-gray-400">{cantidadAlumnos} students</small>
                    <h3 className="font-Barlow text-primary line-clamp-2 mb-1 font-bold">
                         {nombre}
                    </h3>
                    <small className="text-xs text-gray-300">Professor</small>
                    <div className="text-primary flex justify-between text-xs">
                         <span>{profesores.length}</span>
                         {/* <span>{duracion}</span> */}
                    </div>
               </div>
          </Link>
     );
}
