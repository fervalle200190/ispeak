import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import getCountries from "services/getCountries";
import postRegisterUser from "services/postRegisterUser";
import { useForm } from "hooks/useForm";
import { checkEmail } from "services/checkEmail";
import { getPayment } from "services/getPayment";
import { ModalTest } from "components/ModalTest";
import { getPlans } from "services/getPlans";

const initialForm = {
     birthday: "",
     phone: "",
     country: "",
     city: "",
     occupation: "",
     password: "",
     location: "",
};

export default function ExternalRegisterPage({ params }) {
     const { formState, onInputChange } = useForm(initialForm);
     const [loading, setLoading] = useState(false)
     const [url, setUrl] = useState("")
     const [staticInfo, setStaticInfo] = useState({
          name: "",
          email: "",
          plan: "",
          country: ""
     });
     const [isModalOpen, setIsModalOpen] = useState(false);
     const [isModalErrorOpen, setIsModalErrorOpen] = useState(false);
     const [countries, setCountries] = useState([]);
     const [location, setLocation] = useLocation();

     const handleSubmit = async (event) => {
          event.preventDefault();
          if (formState.password === "") {
               return alert(`Por favor completa los campos`);
          }
          const userInfo = {
               code: params.paymentId,
               name: staticInfo.name,
               birthday: formState.birthday,
               phone: formState.phone,
               country: staticInfo.country.paisId,
               city: formState.city,
               occupation: formState.occupation,
               email: staticInfo.email,
               password: formState.password,
               plan: staticInfo.plan,
          };
          setLoading(true)
          const res = await postRegisterUser(userInfo);
          setLoading(false)
          if (res.id) {
               alert(`Registro exitoso`);
               setLocation(`/`);
          }
          // getAllUsers().then((response) => console.log(response));
     };
     const getPaymentInfo = async () => {
          const payment = await getPayment(params.paymentId);
          const plans = await getPlans();
          if (payment === "El id del pago no esta asociado a ningun pago") {
               setIsModalErrorOpen(true);
               return;
          }
          if (!payment.testInfo) {
               setIsModalOpen(true);
               setUrl(`https://test.ispeak.team/${payment.paymentInfo.code}`)
               return;
          }
          const paymentInfo = payment.paymentInfo;
          setStaticInfo({
               ...staticInfo,
               name: `${paymentInfo.nombre} ${paymentInfo.apellido}`,
               email: paymentInfo.email,
               plan: paymentInfo.itemId,
               country: plans.find(
                    (plan) => plan.moneda === paymentInfo.currencyId
               ),
          });
     };
     useEffect(() => {
          getCountries().then((response) => setCountries(response));
          getPaymentInfo();
     }, []);

     return (
          <>
               <div className="flex min-h-screen w-screen items-center justify-center bg-gray-100 pt-10 pb-10">
                    <div className="flex min-w-[20rem] flex-col items-center justify-center rounded-xl border-gray-200 bg-white p-5 px-10 shadow-sm">
                         <h1 className=" font-Barlow text-primary m-1 text-5xl font-medium">
                              i<span className="text-accent">.</span>speak
                         </h1>
                         <h2 className="m-1 text-2xl">Registro de Alumno</h2>
                         <span>
                              Completa tus datos y crea tu usuario y contraseña
                              para acceder al portal.
                         </span>
                         <form
                              className="mt-2 flex w-full flex-col gap-1"
                              onSubmit={handleSubmit}
                         >
                              <label className="font-medium">
                                   Nombre y Apellido
                              </label>
                              <input
                                   className="min-h-[2rem] rounded-sm border border-gray-200 px-2"
                                   type="text"
                                   name="name"
                                   value={staticInfo.name}
                                   disabled
                              />
                              <label className="font-medium">Pais</label>
                              <input
                                   className={`min-h-[2rem] rounded-sm border px-2`}
                                   type="text"
                                   name="country"
                                   value={staticInfo.country.pais? staticInfo.country.pais.nombre: "..."}
                                   disabled
                              />
                              <label className="font-medium">Email</label>
                              <input
                                   className={`min-h-[2rem] rounded-sm border px-2`}
                                   type="email"
                                   name="email"
                                   value={staticInfo.email}
                                   disabled
                              />
                              <label className="font-medium">Contraseña</label>
                              <input
                                   className="min-h-[2rem] rounded-sm border border-gray-200 px-2"
                                   type="password"
                                   name="password"
                                   value={formState.password}
                                   onChange={onInputChange}
                                   required
                              />
                              <div className="flex w-full justify-center">
                                   <button disabled={loading} className="bg-accent font-Barlow text-primary mt-5 flex h-11 w-40 items-center justify-center rounded-3xl p-2">
                                        registrar
                                   </button>
                              </div>
                         </form>
                    </div>
               </div>
               <ModalTest
                    url={url}
                    isModalOpen={isModalOpen}
                    message={`Parece que no has hecho el test`}
               />
               <ModalTest
                    url={`https://www.ispeakteam.com/`}
                    isModalOpen={isModalErrorOpen}
                    message={`No existe información de pago`}
               />
          </>
     );
}
