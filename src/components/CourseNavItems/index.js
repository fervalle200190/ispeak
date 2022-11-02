import { Link } from "wouter";

import CourseIcons from "components/CourseIcons";

export default function CourseNavItems({ courseId, moduleId, materials = [], showBar, secondBar, url }) {
     return (
          <ol>
               {materials.map(({ id, nombre, completada }, index) => {
                    return completada ? (
                         <li key={id} className={`flex items-center p-2 text-gray-500 ${secondBar? "": "pl-0 pr-0 justify-center"}`}>
                              <Link
                                   className="flex items-center gap-3"
                                   href={`/${url}/${courseId}/module/${moduleId}/material/${id}`}
                              >
                                   <div className={`bg-accent flex ${secondBar? "min-w-[2rem] h-8": "min-w-[1.5rem] h-[1.5rem]"} items-center justify-center rounded-full`}>
                                        <CourseIcons name="check" />
                                   </div>
                                   <h4 className={`font-semibold ${secondBar? "": "hidden"}`}>{nombre}</h4>
                              </Link>
                              {/* <span>{cls.video.duration}</span> */}
                         </li>
                    ) : (
                         <li key={id} className={`flex items-center p-2 ${secondBar? "": "pl-0 pr-0 justify-center"}`}>
                              <Link
                                   className="flex items-center gap-3"
                                   href={`/${url}/${courseId}/module/${moduleId}/material/${id}`}
                              >
                                   <div className={`bg-accent flex ${secondBar? "min-w-[2rem] h-8": "min-w-[1.5rem] h-[1.5rem]"} items-center justify-center rounded-full opacity-50`}>
                                        <CourseIcons name="play" />
                                   </div>
                                   <h4 className={`font-semibold ${secondBar? "": "hidden"}`}>{nombre}</h4>
                              </Link>
                              {/* <span>{cls.video.duration}</span> */}
                         </li>
                    );
               })}
          </ol>
     );
}
