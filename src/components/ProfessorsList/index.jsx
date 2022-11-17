const { ProfessorMeet } = require("components/ProfessorMeet");

export const ProfessorsList = ({ professors, onClickButton }) => {
     return (
          <>
               {professors.map((prof) => (
                    <ProfessorMeet key={prof.id} {...prof} onClickButton={onClickButton} />
               ))}
          </>
     );
};
