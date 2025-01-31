import { Card, CardContent, Typography } from "@mui/material";

const Leftside: React.FC = () => {
    return (
        <>
            <Card 
            sx={{ 
                margin: "1rem", 
                height: "calc(100% - 1rem)",  // Ensures it fits inside the panel
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center"
            }}
            >
            <CardContent>
                <Typography variant="h5">Left Panel</Typography>
                <Typography variant="h5">Left Panel</Typography>
                <Typography variant="h5">Left Panel</Typography>
                <Typography variant="h5">Left Panel</Typography>
                <Typography variant="h5">Left Panel</Typography>
                <Typography variant="h5">Left Panel</Typography>
                <Typography variant="h5">Left Panel</Typography>
                <Typography variant="h5">Left Panel</Typography>
                <Typography variant="h5">Left Panel</Typography>
                <Typography variant="h5">Left Panel</Typography>
                <Typography variant="h5">Left Panel</Typography>
                <Typography variant="h5">Left Panel</Typography>
                <Typography variant="h5">Left Panel</Typography>
                <Typography variant="h5">Left Panel</Typography>
                <Typography variant="h5">Left Panel</Typography>
                <Typography variant="h5">Left Panel</Typography>
                <Typography variant="h5">Left Panel</Typography>

                <Typography variant="h5">Left Panel</Typography>
                <Typography variant="h5">Left Panel</Typography>
                <Typography variant="h5">Left Panel</Typography>
                <Typography variant="h5">Left Panel</Typography>
                <Typography variant="h5">Left Panel</Typography>
                <Typography variant="h5">Left Panel</Typography>
                <Typography variant="body2">
                This is a resizable panel with an MUI Card inside.
                </Typography>
            </CardContent>
            </Card>
        </>
    )
}
export default Leftside;