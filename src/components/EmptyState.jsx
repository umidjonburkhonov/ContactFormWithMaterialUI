import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export function EmptyState({ text }) {
    return (
        <Box sx={{ textAlign: "center", my: 4 }}>
            <Typography variant="body1">{text}</Typography>
        </Box>
    );
}
