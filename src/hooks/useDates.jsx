export const useDates = () => {
     const getMinDate = () => {
          return new Date(new Date().setDate(new Date().getDate() + 4));
     };
     const getMaxDate = (max = 21) => {
          return new Date(new Date().setDate(new Date().getDate() + max));
     };

     const getSundayOfTheWeek =(date)=> {
          const today = new Date(date);
          const first = today.getDate() - today.getDay() + 1;
          const last = first + 7;
        
          const sunday = new Date(today.setDate(last));

          const checkMax = getMaxDate()
        
          if(today > checkMax ) {
               return getMaxDate()
          }
          return sunday;
        }

     return {
          getMinDate,
          getMaxDate,
          getSundayOfTheWeek
     };
};
