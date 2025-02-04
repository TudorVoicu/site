import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';

// Define the type for documents in docs.json
interface DocumentItem {
    title: string;
    src: string;
}

const basePath: string = import.meta.env.BASE_URL; // Ensures correct relative path

const PdfViewer: React.FC = () => {
    const [pdfUrl, setPdfUrl] = useState<string | null>(null);

    useEffect(() => {
        const fetchDocs = async (): Promise<void> => {
            try {
                const response = await fetch(`${basePath}docs.json`);
                if (!response.ok) throw new Error('Failed to fetch documents');

                const docs: DocumentItem[] = await response.json();
                const cvDoc = docs.find((doc) => doc.title === 'CV');

                if (cvDoc) {
                    setPdfUrl(`${basePath}${cvDoc.src}`); // Construct the correct relative path
                }
            } catch (error) {
                console.error('Error loading document:', error);
            }
        };

        fetchDocs();
    }, []);

    return (
        <>
        <Typography
            variant="h2"
            gutterBottom
            sx={{ width: '100%', textAlign: 'center', mt:'1rem' }} // Allow full width & center text
        >
            Tudor's CV
        </Typography>
        <Box
        sx={{
            flexGrow: 1,
            ml: '1rem',
            mr: '1rem',
            mb: '1rem',
            height: '80vh',
            display: 'flex',
            flexDirection: 'column',
            width: '100%', // Ensure full width
            alignItems: 'center', // Center content
        }}
    >

        {pdfUrl ? (
            <iframe
                src={pdfUrl}
                style={{
                    flexGrow: 1,
                    border: 'none',
                    width: '100%', // Ensure it expands properly
                    maxWidth: 'calc(80vh * 0.707)', // A4 Ratio (1.414:1 inverted)
                    height: '80vh', // Maintain height limit
                }}
                title="PDF Viewer"
            />
        ) : (
            <Typography>Loading CV...</Typography>
        )}
    </Box>
    </>
    );
};

export default PdfViewer;
