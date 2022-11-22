import { ModalIcon } from "components/ModalIcon";
import "../../styles/MemberModal.css";

export const ModalPremium = ({ isModalOpen }) => {
     return (
          <div className={`member-modal-container ${!isModalOpen ? "!hidden" : ""}`}>
               <div className="member-modal">
                    <div className="gray-head">Access denied</div>
                    <ModalIcon />
                    <div className="inner-modal-container">
                         <h2 className="main-modal-title">upgrade</h2>
                         <p className="subtitle-modal">your membership!</p>
                         <p className="modal-description">
                              This is only available with the standard membership. Upgrade your
                              membership and learn with a live instructor.
                         </p>
                         <a href="https://ispeak.team/#planes" className="no-underline" target={'_blank'}>
                              <button className="btn-modal">upgrade</button>
                         </a>
                    </div>
               </div>
          </div>
     );
};
