import { Link } from "wouter";
import BubbleIcon from "../../assets/burbuja-chat.svg";

export const BubbleCommunityModules = ({ id, nombre, materialEstudios, url, course, module }) => {
     return (
          <Link to={`/${url}/${course.id}/module/${id}/material/${materialEstudios[0].id}/${module.id}`}>
               <div className="mt-5 mb-5 cursor-pointer w-[200px] relative hover:scale-105 transition-all show-peace-page">
                    <div className="flex">
                         <h4 className="font-Barlow font-semibold text-white text-sm absolute bubble-text text-center pr-5 pl-5">{nombre}</h4>
                         <img src={BubbleIcon} className="bubble-img" />
                    </div>
               </div>
          </Link>
     );
};
