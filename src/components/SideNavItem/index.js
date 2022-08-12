import { SizeContext } from "context/SizeContext";
import { useContext } from "react";
import { Link } from "wouter";

export default function SideNavItem({ title, icon, url = "/" }) {
     const { showBar } = useContext(SizeContext);

     return (
          <Link
               href={url}
               className={`text-md group border-accent hover:text-primary w-full py-5 ${
                    showBar ? "pl-10" : "no-m justify-center flex"
               } text-white hover:border-l-[3px] hover:bg-gray-100 hover:font-bold`}
          >
               {icon}
               {showBar && title}
          </Link>
     );
}
