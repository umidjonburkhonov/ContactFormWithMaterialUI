import React, { useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useForm } from "react-hook-form";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ContactForm({ initialValues, onSubmit, submitting }) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isValid }
    } = useForm({
        mode: "onChange",
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            ...initialValues
        }
    });

    useEffect(() => {
        reset({
            name: initialValues?.name || "",
            email: initialValues?.email || "",
            phone: initialValues?.phone || ""
        });
    }, [initialValues, reset]);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
                <TextField
                    label="Имя"
                    {...register("name", { required: "Обязательное поле" })}
                    error={!!errors.name}
                    helperText={errors.name?.message}
                />
                <TextField
                    label="Email"
                    {...register("email", {
                        required: "Обязательное поле",
                        pattern: {
                            value: emailPattern,
                            message: "Неверный email"
                        }
                    })}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                />
                <TextField
                    label="Телефон"
                    {...register("phone", {
                        required: "Обязательное поле",
                        minLength: { value: 3, message: "Слишком коротко" }
                    })}
                    error={!!errors.phone}
                    helperText={errors.phone?.message}
                />
                <Button
                    type="submit"
                    variant="contained"
                    disabled={!isValid || submitting}
                >
                    {submitting ? "Сохранение..." : "Сохранить"}
                </Button>
            </Stack>
        </form>
    );
}
