import { useEffect } from "react";
import { useState } from "react";
import { SizeContext } from "./SizeContext";

export const SizeProvider = ({ children }) => {
     const [size, setSize] = useState("");
     const [showBar, setShowBar] = useState(true);
     const [secondBar, setSecondBar] = useState(true);

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
     }, [])
     

     return (
          <SizeContext.Provider
               value={{
                    size,
                    handleShowBar,
                    showBar,
                    secondBar,
                    handleSecondBar,
               }}
          >
               {children}
          </SizeContext.Provider>
     );
};
