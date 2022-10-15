export const buildObject = ({countryId, itemId, nombre, apellido, email}) => {
     return {
          countryId: countryId,
          planId: parseInt(itemId),
          register: false,
          pasarela: countryId === 1 || countryId === 2? "mercadopago": "ebanx",
          payer: {
               Name: nombre,
               Surname: apellido,
               Email: email,
          },
     };
};
