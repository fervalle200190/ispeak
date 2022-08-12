import React, { useRef, useEffect } from "react";
import HeaderIcons from "components/HeaderIcons";
import { Avatar } from "@material-ui/core";

const Mensaje = ({ mensajeFirebase, user_name }) => {
     // console.log(user_name);
     const scrollRef = useRef();
     return (
          <div
               className={`message ${
                    mensajeFirebase.usuario === user_name ? "other" : " "
               }`}
               ref={scrollRef}
          >
               <HeaderIcons name="profile__chat" />
               <div
                    className={`message__${
                         mensajeFirebase.usuario === user_name
                              ? "other"
                              : "info"
                    }`}
               >
                    <h4>
                         {mensajeFirebase.usuario}
                         <span className="message__timestamp">
                              {/* {new Date(mensajeFirebase.id).toLocaleString} */}
                         </span>
                    </h4>

                    <p>{mensajeFirebase.mensaje}</p>
               </div>
          </div>
     );
};

export default Mensaje;
