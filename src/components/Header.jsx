import React from "react";
import { useDispatch, useSelector } from "react-redux";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import { setSearch } from "../features/contacts/contactsSlice.js";

export function Header() {
    const dispatch = useDispatch();
    const search = useSelector((state) => state.contacts.search);

    return (
        <AppBar position="sticky" color="default" elevation={1}>
            <Container maxWidth="md">
                <Toolbar disableGutters sx={{ py: 1 }}>
                    <TextField
                        fullWidth
                        size="small"
                        placeholder="Поиск по имени"
                        value={search}
                        onChange={(e) => dispatch(setSearch(e.target.value))}
                    />
                </Toolbar>
            </Container>
        </AppBar>
    );
}
