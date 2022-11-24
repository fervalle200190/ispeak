import React from "react";
import { Link } from "wouter";

export const CourseCardCommunity = ({ id, nombre, url, planEstudio }) => {
     return (
          <Link
               href={`/${planEstudio === "Obligatorio" ? "courses-community-no" : url}/${id}`}
               className="flex w-full flex-col rounded-xl border border-gray-200 bg-white shadow-sm transition delay-[50ms] ease-in-out hover:scale-[1.01] hover:shadow-md md:w-64"
          >
               <div className="show-card-fadeIn py-5 px-2"></div>
               <div className="px-3 pb-2">
                    <h3 className="font-Barlow text-primary line-clamp-2 mb-1 font-bold">
                         {nombre}
                    </h3>
                    <div className="text-primary flex justify-between text-xs"></div>
               </div>
          </Link>
     );
};
