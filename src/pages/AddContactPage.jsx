import React, { useState } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ContactForm } from "../components/ContactForm.jsx";
import { addContact } from "../features/contacts/contactsSlice.js";

export function AddContactPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (values) => {
        try {
            setSubmitting(true);
            await dispatch(addContact(values)).unwrap();
            toast.success("Контакт создан");
            navigate("/");
        } catch (e) {
            toast.error("Ошибка создания контакта");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 3 }}>
            <Typography variant="h5" sx={{ mb: 2 }}>
                Добавить контакт
            </Typography>
            <ContactForm onSubmit={handleSubmit} submitting={submitting} />
        </Container>
    );
}
