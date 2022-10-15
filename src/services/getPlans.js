export const getPlans = async () => {
     const res = await fetch(
          `http://66.94.118.205:8080/api/Planes/1234/1007`
     );

     const plans = await res.json();
     return plans;
};
