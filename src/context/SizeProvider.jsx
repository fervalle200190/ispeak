import { useEffect } from "react";
import { useState } from "react";
import { SizeContext } from "./SizeContext";

const rol = localStorage.getItem("loggedAppUser")
     ? JSON.parse(localStorage.getItem(`loggedAppUser`)).rol
     : false;

export const SizeProvider = ({ children }) => {
     const [size, setSize] = useState(window.innerWidth);
     const [showBar, setShowBar] = useState(false);
     const [secondBar, setSecondBar] = useState(false);

     const handleShowBar = () => {
          if (!showBar) {
               setShowBar(true);
          } else {
               setShowBar(false);
          }
     };
     const handleSecondBar = () => {
          if (!secondBar) {
               setSecondBar(true);
          } else {
               setSecondBar(false);
          }
     };
     useEffect(() => {
          window.addEventListener("resize", () => {
               setSize(window.innerWidth);
               if (window.innerWidth < 768) {
                    setShowBar(true);
                    setSecondBar(true);
               }
          });
     }, []);
     useEffect(() => {
          if (rol === "Profesor") return;
          if (showBar || secondBar) {
               setTimeout(() => {
                    setShowBar(false);
                    setSecondBar(false);
               }, 15000);
          }
     }, [showBar, secondBar]);

     return (
          <SizeContext.Provider
               value={{
                    size,
                    handleShowBar,
                    showBar,
                    secondBar,
                    handleSecondBar,
                    setShowBar,
                    setSecondBar,
               }}
          >
               {children}
          </SizeContext.Provider>
     );
};
