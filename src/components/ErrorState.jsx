import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export function ErrorState({ message, onRetry }) {
    return (
        <Box sx={{ textAlign: "center", my: 4 }}>
            <Typography variant="body1" color="error" sx={{ mb: 2 }}>
                {message}
            </Typography>
            {onRetry && (
                <Button variant="outlined" onClick={onRetry}>
                    Повторить
                </Button>
            )}
        </Box>
    );
}
