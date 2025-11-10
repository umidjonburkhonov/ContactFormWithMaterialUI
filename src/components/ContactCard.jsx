import React from "react";
import { Link } from "react-router-dom";
import {
    Card,
    CardContent,
    Typography,
    IconButton,
    Box
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export function ContactCard({ contact, onDelete, deleting }) {
    return (
        <Card
            variant="outlined"
            sx={{
                width: "100%",
                maxWidth: 600,
                mx: "auto",
                p: 2,
                display: "flex",
                flexDirection: { xs: "row", sm: "row" },
                alignItems: { xs: "flex-start", sm: "center" },
                justifyContent: "space-between",
                borderRadius: 3,
                boxShadow: 3,
                transition: "all 0.25s ease",
                "&:hover": {
                    boxShadow: 5,
                    transform: "scale(1.01)"
                }
            }}
        >
            <CardContent
                sx={{
                    flex: 1,
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    gap: 0.5,
                    p: 0
                }}
            >
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {contact.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {contact.phone}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {contact.email}
                </Typography>
            </CardContent>

            <Box
                sx={{
                    display: "flex",
                    gap: 1,
                    mt: { xs: 1, sm: 0 },
                    alignSelf: { xs: "center", sm: "center" }
                }}
            >
                <IconButton
                    component={Link}
                    to={`/edit/${contact.id}`}
                    aria-label="edit"
                    color="primary"
                >
                    <EditIcon />
                </IconButton>
                <IconButton
                    aria-label="delete"
                    color="error"
                    onClick={() => onDelete(contact.id)}
                    disabled={deleting}
                >
                    <DeleteIcon />
                </IconButton>
            </Box>
        </Card>
    );
}
