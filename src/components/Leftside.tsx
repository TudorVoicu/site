import { Card, CardContent, Typography } from "@mui/material";
import PdfViewer from "./PDFViewer";

const Leftside: React.FC = () => {
    return (
        <>
            <Card 
            sx={{ 
                margin: "1rem", 
                height: '90vh',  // Ensures it fits inside the panel
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width:"100%"
            }}
            >
            <PdfViewer />
            </Card>
        </>
    )
}
export default Leftside;