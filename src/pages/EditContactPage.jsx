import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
    fetchContactById,
    editContact,
    clearCurrent
} from "../features/contacts/contactsSlice.js";
import { ContactForm } from "../components/ContactForm.jsx";
import { Loader } from "../components/Loader.jsx";
import { ErrorState } from "../components/ErrorState.jsx";

export function EditContactPage() {
    const { id } = useParams();          // id = "1" (string)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { current, currentLoading, currentError } = useSelector(
        (state) => state.contacts
    );
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (!id) return;                  
        dispatch(fetchContactById(id));  
        return () => {
            dispatch(clearCurrent());
        };
    }, [dispatch, id]);

    

    const handleSubmit = async (values) => {
        try {
            setSubmitting(true);
            await dispatch(
                editContact({
                    id,           // string bo‘lsa ham bo‘ladi
                    ...values
                })
            ).unwrap();
            toast.success("Контакт обновлен");
            navigate("/");
        } catch (e) {
            toast.error("Ошибка обновления контакта");
        } finally {
            setSubmitting(false);
        }
    };

    if (currentLoading) {
        return (
            <Container maxWidth="sm" sx={{ mt: 3 }}>
                <Loader />
            </Container>
        );
    }

    if (currentError) {
        return (
            <Container maxWidth="sm" sx={{ mt: 3 }}>
                <ErrorState
                    message={currentError}
                    onRetry={() => dispatch(fetchContactById(id))}
                />
            </Container>
        );
    }

    if (!current) {
        return null;
    }

    return (
        <Container maxWidth="sm" sx={{ mt: 3 }}>
            <Typography variant="h5" sx={{ mb: 2 }}>
                Редактировать контакт
            </Typography>
            <ContactForm
                initialValues={current}
                onSubmit={handleSubmit}
                submitting={submitting}
            />
        </Container>
    );
}
