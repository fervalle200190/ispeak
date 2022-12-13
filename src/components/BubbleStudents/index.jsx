export const BubbleStudents = ({ name, icon, users, bgColor, textColor }) => {
     return (
          <>
               <div className="mini-bubble-container">
                    <div style={{ backgroundColor: bgColor }} className={"inner-bubble-circle"}>
                         <h4 className="circle-title" style={{ color: textColor }}>
                              {users}
                         </h4>
                         <div className="mini-bubble-icon">
                              <img src={icon} alt={name} />
                         </div>
                    </div>
                    <h6 className="mini-bubble-title">{name}</h6>
               </div>
          </>
     );
};
