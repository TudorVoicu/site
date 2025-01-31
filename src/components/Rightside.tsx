import { Box, Card, Typography } from "@mui/material";
import MusicPlayer from "./MusicPlayer";

const Rightside: React.FC = () => {
  return (
    <>
        <Card 
        sx={{ 
            margin: "1rem", 
            //height: "calc(100% - 1rem)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
        }}
        >
        <Typography variant="h5" sx={{ margin: "1rem" }}>
            🎶 Music Player
        </Typography>
        {/* <Box sx={{margin:'1rem', display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}> */}
            <MusicPlayer />
        {/* </Box> */}
      </Card>
    </>
  );
};

export default Rightside;