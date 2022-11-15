export const processPlans = ({
     plansRaw,
     planSelected,
     paymentId,
     descripcion,
     amount,
     correo,
     nombre,
     apellido,
}) => {
     const planChosen = plansRaw.find((plan) => plan.id === planSelected);
     return {
          pasarela: "",
          countryId: planChosen.paisId,
          countryISO: planChosen.pais.iso,
          transdate: "",
          payment_id: paymentId,
          hash_id: "",
          status: "",
          statusDetail: "",
          currencyId: planChosen.moneda,
          itemId: planChosen.id,
          item: planChosen.nombre,
          description: descripcion,
          amount,
          email: correo,
          nombre,
          apellido,
          code: "",
          activo: true,
     };
};
