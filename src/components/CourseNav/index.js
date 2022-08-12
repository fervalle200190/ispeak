import CourseNavItems from "components/CourseNavItems";
import { SizeContext } from "context/SizeContext";
import { useContext } from "react";

export default function CourseNav({ courseId, units = [] }) {
     const { showBar, secondBar, handleSecondBar } = useContext(SizeContext)
     return (
          <div className="relative">
               <div className={`absolute z-50 h-10 w-10 icon-box-container ${secondBar? "": "rotate-arrow"} items-center justify-start hidden lg:flex`} onClick={handleSecondBar}>
                    <ion-icon className={`${secondBar? "": "rotate-arrow"}`} name="chevron-forward-sharp"></ion-icon>
               </div>
               <div className={`scrollbar scrollbar-thin transition-all scrollbar-thumb-gray-300 pr-2 scrollbar-track-blue-900 scroll-cont relative max-h-[60vh] ${secondBar? "": "op-scroll"}`}>
                    <div className="ltr pl-5">
                         <nav className="flex flex-col gap-5">
                              {units.map(({ id, nombre, clases }, index) => (
                                   <div key={id} className="flex flex-col">
                                        <div className={`my-2 flex items-center gap-2 ${secondBar? "": "justify-center"}`}>
                                             <div className={`relative ${secondBar? "right-5": ""} flex h-8 w-8 items-center justify-center rounded-full lg:bg-gray-600 bg-[#000027] text-white`}>
                                                  <h4 className="font-semibold">L{index + 1}</h4>
                                             </div>
                                             <h2 className={secondBar? "": "hidden"}>{nombre}</h2>
                                        </div>
                                        <CourseNavItems courseId={courseId} materials={clases} moduleId={id} showBar={showBar} secondBar={secondBar} />
                                        { !secondBar && <div className="border-t w-8 border-gray-500 mt-5"></div> }
                                   </div>
                              ))}
                         </nav>
                    </div>
               </div>
          </div>
     );
}
