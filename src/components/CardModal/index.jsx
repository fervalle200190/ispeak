import { Grid, Typography } from "@mui/material";

export const CardModal = ({ name, photo, link, onCardClick }) => {
     const onClick = () => {
          onCardClick(link);
     };
     return (
          <Grid
               item
               xs={12}
               onClick={onClick}
               display="flex"
               alignItems={"center"}
               className={"show-peace-page"}
               sx={{
                    my: 1,
                    p: 1,
                    boxShadow: "0 0 13px #ddd",
                    borderRadius: 2,
                    cursor: "pointer",
                    ":hover": { transform: "scale(1.008)", boxShadow: "0 0 16px #bbb" },
                    transition: "all 0.2s ease-in-out",
               }}
          >
               <div className="prof-card-container w-[70px] overflow-hidden rounded-full">
                    <img src={photo} alt={name} className="w-full" />
               </div>
               <Typography variant="h6" color={"#1e3a8a"} fontWeight={500} ml={2}>
                    {name}
               </Typography>
          </Grid>
     );
};
