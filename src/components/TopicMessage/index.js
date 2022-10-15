import React, { useRef, useEffect } from "react";
import HeaderIcons from "components/HeaderIcons";
import { Avatar } from "@material-ui/core";

const Mensaje = ({ mensajeFirebase, user_name }) => {
     const replaceURLs =(message)=> {
          if (!message) return;
          let urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;
          return message.replace(urlRegex, function (url) {
               let hyperlink = url;
               if (!hyperlink.match("^https?://")) {
                    hyperlink = "http://" + hyperlink;
               }
               return (
                    '<a href="' +
                    hyperlink +
                    '" target="_blank" rel="noopener noreferrer">' +
                    url +
                    "</a>"
               );
          });
     }
     const detectURLs = (message) => {
          let urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;
          if (urlRegex.test(message)) {
               return replaceURLs(message)
          } else {
               return message;
          }
          return urlRegex.test(message);
     };
     const getName = (user) => {
          let i = user.indexOf(" ");
          return user.slice(0, i);
     };
     const scrollRef = useRef();

     // useEffect(() => {
     //      detectURLs(mensajeFirebase.mensaje);
     // }, [mensajeFirebase.mensaje]);

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
                         {getName(mensajeFirebase.usuario)}
                         <span className="message__timestamp">
                              {new Date(mensajeFirebase.id).toLocaleString()}
                         </span>
                    </h4>
                    {mensajeFirebase.image !== "" && (
                         <img src={mensajeFirebase.image} />
                    )}
                    <p dangerouslySetInnerHTML={{__html: detectURLs(mensajeFirebase.mensaje)}} />
               </div>
          </div>
     );
};

export default Mensaje;
