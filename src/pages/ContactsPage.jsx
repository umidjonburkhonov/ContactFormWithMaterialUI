import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
    fetchContacts,
    deleteContact
} from "../features/contacts/contactsSlice.js";
import { ContactCard } from "../components/ContactCard.jsx";
import { Loader } from "../components/Loader.jsx";
import { EmptyState } from "../components/EmptyState.jsx";
import { ErrorState } from "../components/ErrorState.jsx";

export function ContactsPage() {
    const dispatch = useDispatch();
    const { list, loading, error, search } = useSelector(
        (state) => state.contacts
    );
    const [deletingId, setDeletingId] = useState(null);

    useEffect(() => {
        dispatch(fetchContacts());
    }, [dispatch]);

    const filtered = list.filter((c) =>
        c.name.toLowerCase().includes(search.toLowerCase())
    );

    const handleDelete = async (id) => {
        try {
            setDeletingId(id);
            await dispatch(deleteContact(id)).unwrap();
            toast.success("Контакт удален");
            setDeletingId(null);
        } catch {
            toast.error("Ошибка удаления");
            setDeletingId(null);
        }
    };

    return (
        <Container maxWidth="md" sx={{ mt: 3, mb: 4 }}>
            <Stack direction="row" justifyContent="flex-end" sx={{ mb: 2 }}>
                <Button component={Link} to="/add" variant="contained">
                    Добавить контакт
                </Button>
            </Stack>

            {loading && <Loader />}

            {!loading && error && (
                <ErrorState
                    message={error}
                    onRetry={() => {
                        dispatch(fetchContacts());
                    }}
                />
            )}

            {!loading && !error && filtered.length === 0 && (
                <EmptyState text="Список пуст" />
            )}

            {!loading &&
                !error &&
                filtered.length > 0 &&
                filtered.map((c) => (
                    <Stack
                        key={c.id}
                        sx={{
                            mb: 2,
                            display: "flex",
                            justifyContent: "center"
                        }}
                    >
                        <ContactCard
                            contact={c}
                            onDelete={handleDelete}
                            deleting={deletingId === c.id}
                        />
                    </Stack>
                ))}
        </Container>
    );
}
