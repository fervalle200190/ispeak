export const useDates = () => {
     const getMinDate = () => {
          return new Date(new Date().setDate(new Date().getDate() + 4));
     };
     const getMaxDate = () => {
          return new Date(new Date().setDate(new Date().getDate() + 21));
     };

     return {
          getMinDate,
          getMaxDate,
     };
};
