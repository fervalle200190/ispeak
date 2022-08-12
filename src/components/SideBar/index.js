import { useContext } from "react";
import { SideBarContext } from "context/sideBarContext";
import { Link } from "wouter";
import Logo from "../../assets/english-4-tech-propuestas-de-logo-03.png";
import MiniLogo from "../../assets/Recurso-1.svg";

import SideNav from "../SideNav";
import SideNavIcon from "components/SideNavIcons";
import { SizeContext } from "context/SizeContext";

export default function SideBar() {
     const { isOpen, setIsOpen } = useContext(SideBarContext);
     const { handleShowBar, showBar } = useContext(SizeContext);

     return (
          <>
               <aside
                    className={`fixed top-0 left-0 z-30 hidden h-screen transition-[width] ${
                         showBar ? "w-60" : "w-10"
                    } from-primary to-primary-darker flex-col bg-gradient-to-b md:flex`}
               >
                    <header className={`mb-4 p-2 pt-10 ${showBar? "": "flex flex-col items-center"} icon-container`}>
                         <ion-icon name="menu" onClick={handleShowBar}></ion-icon>
                         <Link href="/" className=" text-5xl font-light text-white">
                              <img className="main-logo" src={showBar ? Logo : MiniLogo} alt="English 4 tech" />
                         </Link>
                    </header>
                    <SideNav />
               </aside>

               <aside
                    className={`from-primary to-primary-darker fixed top-0 left-0 z-30 flex h-screen w-60 flex-col bg-gradient-to-b ${
                         isOpen ? "translate-x-0" : "-translate-x-full"
                    } duration-300 ease-in-out`}
               >
                    <header className="mb-4 p-2 text-center">
                         <button onClick={() => setIsOpen(false)}>
                              <SideNavIcon name="close" />
                         </button>
                         <Link href="/" className=" text-5xl font-light text-white">
                              i<span className="text-accent">.</span>speak
                         </Link>
                    </header>
                    <SideNav />
               </aside>
          </>
     );
}
