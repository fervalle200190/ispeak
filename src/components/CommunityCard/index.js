import React from "react";
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import firebaseApp from '../../firebase/credentials';
import {
    getFirestore,
    doc,
    getDoc, deleteDoc, updateDoc 
  } from "firebase/firestore";

const firestore = getFirestore(firebaseApp);
  
function CommunityCard(topic) {
  
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
      
    };

    async function deleteTopic(topic_id, topic_name) {
    
        try{ 
    
            
            await deleteDoc(doc(firestore, "topics", topic_name));

            
            window.location.reload();
            
    
        }catch(e){
    
          console.log('error ', e);
    
        }    
          
      }     
      
      
      /*
      async function updateTopic(topic_id, topic_name) {
    
        try{ 
          console.log(topic_name);
          const docRef = doc(firestore, "topics", topic_name);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
          const nombreCanal = prompt("Modifica el nombre del Topic", docSnap.data().nombre);

          if (nombreCanal) {
    
            await updateDoc(docRef, {
              nombre: nombreCanal
            });

            window.location.reload();  
          }
          } else {
          // doc.data() will be undefined in this case
           console.log("No such document!");
          }
        }catch(e){
    
          console.log('error ', e);
    
        }    
          
      }
      */
      

          return(   

            <div>
            <IconButton
           aria-label="more"
           id="long-button"
           color="success"
           aria-controls={open ? 'long-menu' : undefined}
           aria-expanded={open ? 'true' : undefined}
           aria-haspopup="true"
           onClick={handleClick}
         >
           <MoreVertIcon />
         </IconButton>
         <Menu
           id={`actions-`}
           MenuListProps={{
             'aria-labelledby': 'long-button',
           }}
           anchorEl={anchorEl}
           open={open}
           onClose={handleClose}
           PaperProps={{
             style: {
               maxHeight: 50 * 4.5,
               width: '12ch',
             },
           }}
         >  
        
            <MenuItem onClick={()=> deleteTopic(topic.topic.id, topic.topic.nombre)}>
                Eliminar
            </MenuItem>           
          
         </Menu>
        </div>


          );

        
      
    

}

export default CommunityCard;
