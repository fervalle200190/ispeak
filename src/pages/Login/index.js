import { ModalTest } from "components/ModalTest";
import { useForm } from "hooks/useForm";
import { useState } from "react";
import postLogin from "services/postLogin";
import { postMercadoPago } from "services/postMercadoPago";
import { buildObject } from "utils";
import { Link } from "wouter";
import "./styles.css";

const initialForm = {
     email: "",
     password: "",
};

export default function LoginPage() {
     const [isLoading, setIsLoading] = useState(false);
     const [isModalOpen, setIsModalOpen] = useState(false);
     const {
          formState: { email, password },
          onInputChange,
          onResetForm
     } = useForm(initialForm);
     const [url, setUrl] = useState("");
     const [isError, setIsError] = useState(false);

     const handleLogin = async (event) => {
          event.preventDefault();
          setIsLoading(true);
          const data = await postLogin({ email, password });
          if (data.statusDetail) {
               setIsLoading(false);
               setIsModalOpen(true);
               const dataToSend = buildObject(data)
               const res = await postMercadoPago(dataToSend)
               if(res.redirect_url) {
                    setUrl(res.redirect_url)
                    return
               }
               setUrl(res.url)
               return;
          }
          if (data === false) {
               onResetForm()
               setIsError(true);
               setIsLoading(false);
               return;
          }
          setIsLoading(false);
          window.location.reload(false);
     };

     return (
          <div className="flex h-screen w-screen items-center justify-center">
               <form
                    onSubmit={handleLogin}
                    className="bg-primary flex h-96 w-4/12 min-w-[24rem] max-w-md flex-col items-center justify-between gap-5 rounded-3xl p-10 shadow-md"
               >
                    <h1 className=" font-Barlow text-6xl text-white">
                         i<span className="text-accent">.</span>speak
                    </h1>
                    <div className="flex flex-col gap-1">
                         <label className="font-Barlow text-white">Email</label>
                         <input
                              className="rounded-sm p-1"
                              type="text"
                              name="email"
                              placeholder="example@mail.com"
                              value={email}
                              onChange={onInputChange}
                         />
                         <label className="font-Barlow text-white">
                              Password
                         </label>
                         <input
                              className="rounded-sm p-1"
                              type="password"
                              name="password"
                              placeholder="password"
                              value={password}
                              onChange={onInputChange}
                         />
                         <Link href="/password">
                              <span className="cursor-pointer text-white">
                                   ¿olvidaste tu contraseña?
                              </span>
                         </Link>
                    </div>
                    {!isError ? (
                         <></>
                    ) : (
                         <span className=" text-red-400">
                              Error de email o contrasena
                         </span>
                    )}
                    {!isLoading ? (
                         <button className="bg-accent font-Barlow text-primary flex h-11 w-40 items-center justify-center rounded-3xl p-2">
                              Login
                         </button>
                    ) : (
                         <div className="lds-ring">
                              <div></div>
                              <div></div>
                              <div></div>
                              <div></div>
                         </div>
                    )}
               </form>
               <ModalTest
                    url={url}
                    isModalOpen={isModalOpen}
                    message={`Tu suscripción ha caducado`}
               />
          </div>
     );
}
