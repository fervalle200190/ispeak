export const DataCell = ({ params, status, classN, handleAsistance }) => {
     const user = status.find((a) => {
          return a.id === params.row.id;
     });
     const objAccesed = user[classN];
     return (
          <span
               onClick={() => handleAsistance(user.id, classN)}
               className={`${
                    objAccesed !== "no info"
                         ? objAccesed
                              ? "text-[#008000]"
                              : "text-[#c61a09]"
                         : ""
               } cursor-pointer underline-offset-1`}
          >
               {objAccesed !== "no info"
                    ? objAccesed
                         ? "presente"
                         : "ausente"
                    : "----"}
          </span>
     );
};
