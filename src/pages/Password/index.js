import { SnackBarComponent } from "components/SnackBarComponent";
import { useState } from "react";
import { resetPassword } from "services/resetPassword";

export const PasswordPage = () => {
     const [isError, setIsError] = useState(false);
     const [isLoading, setIsLoading] = useState(false);
     const [email, setEmail] = useState("");
     const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

     const handleEmail = (e) => {
          setEmail(e.target.value);
     };

     const handleClose = () => {
          setIsSnackbarOpen(false);
     };

     const handleLogin = async (e) => {
          e.preventDefault();
          if (email === "") {
               return;
          }
          setIsLoading(true);
          try {
               const res = await resetPassword(email);
               if (res === "el correo no esta registrado") {
                    throw res;
               }
               setIsError(false)
               setIsSnackbarOpen(true)
               setIsLoading(false);
          } catch (error) {
               setIsError(true);
               setIsLoading(false);
          }
     };

     return (
          <div className="flex h-screen w-screen items-center justify-center">
               <form
                    onSubmit={handleLogin}
                    className="bg-primary h-50 flex w-4/12 min-w-[24rem] max-w-md flex-col items-center justify-between gap-5 rounded-3xl p-10 shadow-md"
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
                              onChange={handleEmail}
                         />
                    </div>
                    {!isError ? (
                         <></>
                    ) : (
                         <span className=" text-red-400">Error de email</span>
                    )}
                    {!isLoading ? (
                         <button className="bg-accent font-Barlow text-primary flex h-11 w-40 items-center justify-center rounded-3xl p-2">
                              Resetear contraseña
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
               <SnackBarComponent
                    isSnackbarOpen={isSnackbarOpen}
                    handleClose={handleClose}
                    message={"Correo enviado con éxito"}
               />
          </div>
     );
};
